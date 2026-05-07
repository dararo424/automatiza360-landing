import type { RefObject } from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { useIntersection } from '../hooks/useIntersection';

export function BeforeAfter() {
  const { t } = useI18n();
  const ref = useIntersection();

  return (
    <section className="py-24 bg-brand-mid" ref={ref as RefObject<HTMLElement>}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            {t.beforeAfter.title}
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/30"
        >
          <div className="grid grid-cols-2">
            <div className="bg-red-950/40 border-b border-white/10 px-6 py-4 flex items-center gap-2">
              <X className="w-4 h-4 text-red-400" strokeWidth={3} />
              <span className="font-semibold text-red-300 text-sm uppercase tracking-wide">{t.beforeAfter.before}</span>
            </div>
            <div className="bg-brand-green/10 border-b border-l border-white/10 px-6 py-4 flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-green" strokeWidth={3} />
              <span className="font-semibold text-brand-green text-sm uppercase tracking-wide">{t.beforeAfter.after}</span>
            </div>
          </div>

          {t.beforeAfter.items.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`grid grid-cols-2 ${i < t.beforeAfter.items.length - 1 ? 'border-b border-white/5' : ''}`}
            >
              <div className="px-6 py-4 flex items-start gap-3 bg-red-950/10">
                <X className="w-3.5 h-3.5 text-red-500 mt-1 flex-shrink-0" strokeWidth={3} />
                <p className="text-slate-400 text-sm leading-relaxed">{row.before}</p>
              </div>
              <div className="px-6 py-4 flex items-start gap-3 border-l border-white/5 bg-brand-green/5">
                <Check className="w-3.5 h-3.5 text-brand-green mt-1 flex-shrink-0" strokeWidth={3} />
                <p className="text-slate-200 text-sm leading-relaxed">{row.after}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
