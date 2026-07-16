'use client';

import { motion } from 'framer-motion';
import { ArrowRight, DollarSign, Sparkles, Users } from 'lucide-react';
import { CardMetric, CardMetrics } from '@/components/ui/metric-card';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-15 animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto text-center z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-sm font-medium text-primary">The Future of Productivity</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight text-balance"
        >
          Where Real-World Effort Meets <span className="text-primary">On-Chain Value</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Earn by staying focused, stream payments in real-time, and participate in yield pools with zero loss.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200 flex items-center gap-2 group">
            Start Focus Session
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-3 rounded-full border border-primary text-primary font-semibold hover:bg-primary/5 transition-all duration-200">
            Explore Features
          </button>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-12 border-t border-border"
        >
          <CardMetrics>
            <CardMetric
              icon={<Users className="h-5 w-5" />}
              label="Active Users"
              value="10K+"
              tooltip="Active users across MERIDIAN focus, stream, and pool experiences."
            />
            <CardMetric
              icon={<DollarSign className="h-5 w-5" />}
              label="Streamed Monthly"
              value="$2.5M"
              delta="+14% month-over-month"
              deltaVariant="positive"
              tooltip="Total value streamed through MERIDIAN payment channels this month."
            />
            <CardMetric
              icon={<Sparkles className="h-5 w-5" />}
              label="Yield Distributed"
              value="$500K"
              tooltip="Yield rewards distributed from no-loss pools and community supercharge streams."
            />
          </CardMetrics>
        </motion.div>
      </div>
    </section>
  );
}
