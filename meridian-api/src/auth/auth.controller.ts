import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from 'src/DTO/signin-dto';
import { RefreshTokenDto } from './dto/refresh-token-dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {}

    @Post('/sign-in')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Sign in with user credentials' })
    @ApiResponse({ status: 200, description: 'Successfully authenticated, returns access token and refresh token' })
    @ApiResponse({ status: 401, description: 'Unauthorized / Invalid credentials' })
    public async signIn(@Body() signInDto:SignInDto) {
        return this.authService.SignIn(signInDto)

    }

    @Get('/refresh-token')
    @ApiOperation({ summary: 'Refresh active JWT access tokens' })
    @ApiResponse({ status: 200, description: 'Successfully generated new tokens' })
    @ApiResponse({ status: 401, description: 'Unauthorized / Invalid refresh token' })
    public refreshToken(@Body() refreshTokenDto:RefreshTokenDto ) {
        return this.authService.RefreshToken(refreshTokenDto)

    }
}
