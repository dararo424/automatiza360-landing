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
  Quote,
} from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { useIntersection } from '../hooks/useIntersection';

type Tab = 'restaurant' | 'tech' | 'clinic' | 'other';
const TABS: Tab[] = ['restaurant', 'tech', 'clinic', 'other'];
const TAB_ICONS = [UtensilsCrossed, Scissors, Stethoscope, Laptop];
const GRID_ICONS = [UtensilsCrossed, Scissors, Stethoscope, Laptop, Croissant, Wrench, PawPrint, Pill];

export function Industries() {
  const { t } = useI18n();
  const [active, setActive] = useState<Tab>('restaurant');
  const ref = useIntersection();

  const content = t.industries[active];
  const ActiveIcon = TAB_ICONS[TABS.indexOf(active)];

  return (
    <section id="industries" className="py-24 bg-brand-light" ref={ref as RefObject<HTMLElement>}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-4 tracking-tight">
            {t.industries.title}
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">{t.industries.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-14 animate-on-scroll stagger-1">
          {t.industries.grid.map((item, i) => {
            const GridIcon = GRID_ICONS[i] || UtensilsCrossed;
            return (
              <motion.div
                key={item.label}
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all"
              >
                <div className="w-10 h-10 mx-auto mb-2 bg-brand-green/10 rounded-lg flex items-center justify-center">
                  <GridIcon className="w-5 h-5 text-brand-dark" strokeWidth={1.75} />
                </div>
                <p className="text-sm font-medium text-slate-700">{item.label}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10 animate-on-scroll stagger-2">
          {TABS.map((tab, i) => {
            const TabIcon = TAB_ICONS[i];
            return (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  active === tab
                    ? 'bg-brand-dark text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <TabIcon className="w-4 h-4" strokeWidth={2} />
                <span>{t.industries.tabs[i]}</span>
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-display font-bold text-2xl text-brand-dark mb-6 tracking-tight">{content.title}</h3>
              <ul className="space-y-3 mb-8">
                {content.features.map((feat: string) => (
                  <li key={feat} className="flex items-start gap-3 text-slate-600">
                    <span className="w-5 h-5 bg-brand-green/15 text-brand-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>
              <blockquote className="bg-white border-l-4 border-brand-green rounded-r-xl p-5 shadow-sm relative">
                <Quote className="absolute top-4 right-4 w-5 h-5 text-brand-green/20" />
                <p className="text-slate-700 italic mb-2">{content.quote}</p>
                <cite className="text-sm text-slate-500 not-italic font-medium">{content.author}</cite>
              </blockquote>
            </motion.div>
          </AnimatePresence>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-brand-dark rounded-2xl p-8 text-center shadow-xl"
              >
                <div className="w-24 h-24 mx-auto mb-4 bg-brand-green/15 rounded-2xl flex items-center justify-center">
                  <ActiveIcon className="w-12 h-12 text-brand-green" strokeWidth={1.5} />
                </div>
                <div className="text-white font-display font-bold text-xl mb-4 tracking-tight">{content.title}</div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {content.features.slice(0, 3).map((feat: string) => (
                    <span key={feat} className="bg-white/10 text-slate-300 text-xs px-3 py-1.5 rounded-full">
                      {feat.split(' ').slice(0, 4).join(' ')}...
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute -inset-3 bg-brand-green/10 rounded-3xl blur-xl -z-10" />
          </div>
        </div>

        <div className="animate-on-scroll stagger-4">
          <h3 className="font-display font-bold text-2xl text-brand-dark text-center mb-8 tracking-tight">
            {t.industries.forWhomTitle}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-green-200 p-6 shadow-sm">
              <p className="text-green-700 font-bold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                <Check className="w-4 h-4" strokeWidth={3} /> Es para ti si tienes...
              </p>
              <ul className="space-y-3">
                {t.industries.forWhomYes.map((item: string) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700 text-sm">
                    <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <p className="text-slate-500 font-bold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                <X className="w-4 h-4" strokeWidth={3} /> Probablemente no es para ti si...
              </p>
              <ul className="space-y-3">
                {t.industries.forWhomNo.map((item: string) => (
                  <li key={item} className="flex items-center gap-3 text-slate-500 text-sm">
                    <span className="w-5 h-5 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <X className="w-3 h-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-400 mt-4 border-t border-slate-100 pt-3">
                Si no estás seguro, usa el analizador gratuito arriba y te decimos en 30 segundos.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
