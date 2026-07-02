import type { RefObject } from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { useIntersection } from '../hooks/useIntersection';

export function BeforeAfter() {
  const { t } = useI18n();
  const ref = useIntersection();

  return (
    <section className="py-24 bg-paper" ref={ref as RefObject<HTMLElement>}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-4 tracking-tight">
            {t.beforeAfter.title}
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="border-2 border-ink shadow-brut-lg bg-white overflow-hidden"
        >
          <div className="grid grid-cols-2">
            <div className="bg-coral border-b-2 border-r-2 border-ink px-4 sm:px-6 py-4 flex items-center gap-2">
              <X className="w-4 h-4 text-white" strokeWidth={3.5} />
              <span className="font-display font-extrabold text-white text-xs sm:text-sm uppercase tracking-wide">{t.beforeAfter.before}</span>
            </div>
            <div className="bg-brand-green border-b-2 border-ink px-4 sm:px-6 py-4 flex items-center gap-2">
              <Check className="w-4 h-4 text-ink" strokeWidth={3.5} />
              <span className="font-display font-extrabold text-ink text-xs sm:text-sm uppercase tracking-wide">{t.beforeAfter.after}</span>
            </div>
          </div>

          {t.beforeAfter.items.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`grid grid-cols-2 ${i < t.beforeAfter.items.length - 1 ? 'border-b-2 border-ink/15' : ''}`}
            >
              <div className="px-4 sm:px-6 py-4 flex items-start gap-3 border-r-2 border-ink bg-white">
                <X className="w-3.5 h-3.5 text-coral mt-1 flex-shrink-0" strokeWidth={3.5} />
                <p className="text-ink/60 text-xs sm:text-sm leading-relaxed">{row.before}</p>
              </div>
              <div className="px-4 sm:px-6 py-4 flex items-start gap-3 bg-brand-green/15">
                <Check className="w-3.5 h-3.5 text-ink mt-1 flex-shrink-0" strokeWidth={3.5} />
                <p className="text-ink text-xs sm:text-sm leading-relaxed font-semibold">{row.after}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
