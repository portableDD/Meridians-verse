import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find or create a user by their Stellar wallet address.
   * Called on first login / wallet connect.
   */
  async findOrCreate(walletAddress: string) {
    const existing = await this.prisma.user.findUnique({
      where: { walletAddress },
    });

    if (existing) {
      return existing;
    }

    this.logger.log(`Creating new user for wallet ${walletAddress}`);
    return this.prisma.user.create({
      data: { walletAddress },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        notificationSettings: true,
        reputationHistory: {
          orderBy: { timestamp: 'desc' },
          take: 10,
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user;
  }

  async findByWallet(walletAddress: string) {
    const user = await this.prisma.user.findUnique({
      where: { walletAddress },
      include: { notificationSettings: true },
    });

    if (!user) {
      throw new NotFoundException(
        `User with wallet ${walletAddress} not found`,
      );
    }

    return user;
  }

  async updateProfile(id: string, dto: UpdateProfileDto) {
    // Ensure user exists
    await this.findById(id);

    // Guard against duplicate email
    if (dto.email) {
      const emailTaken = await this.prisma.user.findFirst({
        where: { email: dto.email, NOT: { id } },
      });
      if (emailTaken) {
        throw new ConflictException('Email is already in use');
      }
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...(dto.email !== undefined && { email: dto.email }),
        ...(dto.profileData !== undefined && { profileData: dto.profileData }),
      },
    });
  }

  async getContributions(id: string) {
    await this.findById(id);

    return this.prisma.contribution.findMany({
      where: { investorId: id },
      include: { project: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getProjects(id: string) {
    await this.findById(id);

    return this.prisma.project.findMany({
      where: { creatorId: id },
      orderBy: { createdAt: 'desc' },
    });
  }
}
