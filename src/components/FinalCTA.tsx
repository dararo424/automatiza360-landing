import type { RefObject } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { useIntersection } from '../hooks/useIntersection';

const APP_URL = (import.meta.env['VITE_APP_URL'] as string | undefined) ?? 'http://localhost:5173';

export function FinalCTA() {
  const { t } = useI18n();
  const ref = useIntersection();

  return (
    <section id="contact" className="py-28 bg-brand-green border-t-2 border-ink relative overflow-hidden" ref={ref as RefObject<HTMLElement>}>
      <span aria-hidden className="hidden md:block absolute top-12 left-[10%] font-display font-extrabold text-6xl text-ink/15 select-none rotate-12">✱</span>
      <span aria-hidden className="hidden md:block absolute bottom-12 right-[8%] font-display font-extrabold text-5xl text-ink/15 select-none -rotate-12">✱</span>
      <span aria-hidden className="hidden lg:block absolute top-1/2 right-[22%] font-display font-extrabold text-3xl text-paper select-none rotate-6">★</span>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink mb-6 tracking-tight leading-[1.02]">
            {t.finalCta.title}
          </h2>
          <p className="text-ink/75 text-lg mb-10 max-w-xl mx-auto font-medium">
            {t.finalCta.subtitle}
          </p>
          <a
            href={`${APP_URL}/onboarding`}
            className="inline-flex items-center gap-3 bg-ink text-paper border-2 border-ink font-bold uppercase tracking-wide px-10 py-5 text-base shadow-brut-sun transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[10px_10px_0_0_#FFC940] active:translate-x-1 active:translate-y-1 active:shadow-none mb-5"
          >
            {t.finalCta.cta}
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </a>
          <p className="font-mono text-xs font-bold text-ink/60">{t.finalCta.note}</p>
        </motion.div>
      </div>
    </section>
  );
}
