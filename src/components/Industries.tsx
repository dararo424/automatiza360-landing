import { useState } from 'react';
import type { RefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UtensilsCrossed,
  Scissors,
  Stethoscope,
  Laptop,
  Croissant,
  Wrench,
  PawPrint,
  Pill,
  Check,
  X,
} from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { useIntersection } from '../hooks/useIntersection';

type Tab = 'restaurant' | 'tech' | 'clinic' | 'other';
const TABS: Tab[] = ['restaurant', 'tech', 'clinic', 'other'];
const TAB_ICONS = [UtensilsCrossed, Scissors, Stethoscope, Laptop];
const GRID_ICONS = [UtensilsCrossed, Scissors, Stethoscope, Laptop, Croissant, Wrench, PawPrint, Pill];
const GRID_ACCENTS = ['bg-brand-green', 'bg-sun', 'bg-coral', 'bg-paper-deep', 'bg-sun', 'bg-brand-green', 'bg-paper-deep', 'bg-coral'];

export function Industries() {
  const { t } = useI18n();
  const [active, setActive] = useState<Tab>('restaurant');
  const ref = useIntersection();

  const content = t.industries[active];
  const ActiveIcon = TAB_ICONS[TABS.indexOf(active)];

  return (
    <section id="industries" className="py-24 bg-paper-deep border-y-2 border-ink" ref={ref as RefObject<HTMLElement>}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12 animate-on-scroll">
          <p className="label-mono text-ink/50 mb-4">// {t.nav.industries}</p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-4 tracking-tight">
            {t.industries.title}
          </h2>
          <p className="text-ink/60 text-lg max-w-2xl mx-auto font-medium">{t.industries.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14 animate-on-scroll stagger-1">
          {t.industries.grid.map((item, i) => {
            const GridIcon = GRID_ICONS[i] || UtensilsCrossed;
            return (
              <div
                key={item.label}
                className="bg-white border-2 border-ink shadow-brut-sm p-4 text-center transition-transform duration-150 hover:-translate-y-1 hover:shadow-brut"
              >
                <div className={`w-10 h-10 mx-auto mb-2 border-2 border-ink flex items-center justify-center ${GRID_ACCENTS[i]}`}>
                  <GridIcon className="w-5 h-5 text-ink" strokeWidth={2} />
                </div>
                <p className="text-sm font-bold text-ink">{item.label}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10 animate-on-scroll stagger-2">
          {TABS.map((tab, i) => {
            const TabIcon = TAB_ICONS[i];
            return (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`flex items-center gap-2 px-5 py-2.5 border-2 border-ink text-sm font-bold transition-all ${
                  active === tab
                    ? 'bg-ink text-paper shadow-brut-sm'
                    : 'bg-white text-ink hover:bg-sun'
                }`}
              >
                <TabIcon className="w-4 h-4" strokeWidth={2.25} />
                <span>{t.industries.tabs[i]}</span>
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-display font-extrabold text-2xl text-ink mb-6 tracking-tight">{content.title}</h3>
              <ul className="space-y-3 mb-8">
                {content.features.map((feat: string) => (
                  <li key={feat} className="flex items-start gap-3 text-ink/75 font-medium text-sm sm:text-base">
                    <span className="w-5 h-5 bg-brand-green border-2 border-ink flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-ink" strokeWidth={3.5} />
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>
              <blockquote className="bg-white border-2 border-ink shadow-brut p-5 relative">
                <span className="absolute -top-4 left-4 bg-sun border-2 border-ink w-8 h-8 flex items-center justify-center font-display font-extrabold text-lg">"</span>
                <p className="text-ink italic mb-2 mt-2 font-medium">{content.quote}</p>
                <cite className="font-mono text-xs text-ink/60 not-italic font-bold">{content.author}</cite>
              </blockquote>
            </motion.div>
          </AnimatePresence>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className="bg-ink border-2 border-ink shadow-brut-sun p-8 text-center rotate-1"
              >
                <div className="w-24 h-24 mx-auto mb-4 bg-brand-green border-2 border-paper flex items-center justify-center">
                  <ActiveIcon className="w-12 h-12 text-ink" strokeWidth={1.75} />
                </div>
                <div className="text-paper font-display font-extrabold text-xl mb-4 tracking-tight">{content.title}</div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {content.features.slice(0, 3).map((feat: string) => (
                    <span key={feat} className="bg-paper text-ink font-mono text-xs font-bold px-3 py-1.5 border border-paper">
                      {feat.split(' ').slice(0, 4).join(' ')}...
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="animate-on-scroll stagger-4">
          <h3 className="font-display font-extrabold text-2xl text-ink text-center mb-8 tracking-tight">
            {t.industries.forWhomTitle}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-ink shadow-brut p-6">
              <p className="font-display font-extrabold text-ink text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-brand-green border-2 border-ink flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-ink" strokeWidth={3.5} />
                </span>
                Es para ti si tienes...
              </p>
              <ul className="space-y-3">
                {t.industries.forWhomYes.map((item: string) => (
                  <li key={item} className="flex items-center gap-3 text-ink text-sm font-medium">
                    <span className="w-5 h-5 bg-brand-green/30 border border-ink flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-ink" strokeWidth={3.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-paper border-2 border-dashed border-ink/50 p-6">
              <p className="font-display font-extrabold text-ink/60 text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-white border-2 border-ink/50 flex items-center justify-center">
                  <X className="w-3.5 h-3.5 text-ink/60" strokeWidth={3.5} />
                </span>
                Probablemente no es para ti si...
              </p>
              <ul className="space-y-3">
                {t.industries.forWhomNo.map((item: string) => (
                  <li key={item} className="flex items-center gap-3 text-ink/60 text-sm font-medium">
                    <span className="w-5 h-5 bg-white border border-ink/40 flex items-center justify-center flex-shrink-0">
                      <X className="w-3 h-3 text-ink/50" strokeWidth={3.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="font-mono text-xs text-ink/50 mt-4 border-t-2 border-ink/10 pt-3">
                Si no estás seguro, usa el analizador gratuito arriba y te decimos en 30 segundos.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
