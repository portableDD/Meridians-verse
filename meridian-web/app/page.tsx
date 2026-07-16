import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
// Hero and FocusSection are pure Server Components — zero JS for LCP.
import { Hero } from '@/components/sections/Hero';
import { FocusSection } from '@/components/sections/FocusSection';
// All below-the-fold sections are lazy-loaded on the client only.
// Their JS (recharts, framer-motion, etc.) is excluded from the initial
// payload and fetched only when the browser is idle / the section scrolls
// into view.  Each lazy export uses a sized SectionSkeleton to prevent CLS.
import {
  StreamSectionLazy,
  PoolSectionLazy,
  FeaturesLazy,
  CTALazy,
} from '@/components/sections/LazySections';

export default function Page() {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* ── Above the fold ── server-rendered for SEO and fast LCP ──────── */}
        <Hero />
        {/*
         * FocusSection renders its heading on the server (SSR) and defers
         * its interactive widgets (PetProgression, TimerSelector, etc.)
         * to client-side lazy chunks.
         */}
        <FocusSection />

        {/* ── Below the fold ── client-only bundles, deferred until idle ─── */}
        <StreamSectionLazy />
        <PoolSectionLazy />
        <FeaturesLazy />
        <CTALazy />
      </main>
      <Footer />
    </>
  );
}
