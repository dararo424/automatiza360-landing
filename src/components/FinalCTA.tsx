import type { RefObject } from 'react';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { useIntersection } from '../hooks/useIntersection';

const APP_URL = (import.meta.env['VITE_APP_URL'] as string | undefined) ?? 'http://localhost:5173';

export function FinalCTA() {
  const { t } = useI18n();
  const ref = useIntersection();

  return (
    <section id="contact" className="py-24 bg-brand-light" ref={ref as RefObject<HTMLElement>}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative bg-brand-dark rounded-3xl p-12 overflow-hidden"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-0 right-0 w-72 h-72 bg-brand-green rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, delay: 3 }}
            className="absolute bottom-0 left-0 w-72 h-72 bg-brand-accent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
          />

          <div className="relative">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-green/15 rounded-2xl mb-6">
              <Rocket className="w-8 h-8 text-brand-green" strokeWidth={1.75} />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              {t.finalCta.title}
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
              {t.finalCta.subtitle}
            </p>
            <a
              href={`${APP_URL}/onboarding`}
              className="inline-flex items-center gap-2 bg-brand-green hover:brightness-110 text-brand-dark font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-brand-green/30 mb-4"
            >
              {t.finalCta.cta}
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </a>
            <p className="text-slate-500 text-sm">{t.finalCta.note}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
