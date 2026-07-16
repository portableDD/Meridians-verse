/**
 * FocusSection — React Server Component shell.
 *
 * The section heading and layout skeleton are rendered on the server for
 * SEO and a fast first paint (no hydration cost).  The four interactive
 * sub-components (PetProgression, TimerSelector, StreakDisplay,
 * SuperchargeTiers) are heavy framer-motion clients; they are lazy-loaded
 * via LazySections so their JS is deferred until the component scrolls
 * into view.
 */
import {
  FocusInteractiveLazy,
  SuperchargeTiersLazy,
} from '@/components/sections/LazySections';

export function FocusSection() {
  return (
    <section id="focus" className="py-20 px-4 max-w-7xl mx-auto">
      {/* Heading — SSR, zero JS, inlined styles for fast paint */}
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Focus Pillar</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Nurture your productivity companion while earning rewards for staying focused.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left col — pet, timer, streaks — deferred until hydration */}
        <FocusInteractiveLazy />

        {/* Right col — supercharge tiers — deferred */}
        <SuperchargeTiersLazy />
      </div>
    </section>
  );
}
