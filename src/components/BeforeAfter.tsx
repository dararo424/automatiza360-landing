import type { RefObject } from 'react';
import { useI18n } from '../hooks/useI18n';
import { useIntersection } from '../hooks/useIntersection';

export function BeforeAfter() {
  const { t } = useI18n();
  const ref = useIntersection();

  return (
    <section className="py-24 bg-slate-950" ref={ref as RefObject<HTMLElement>}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            {t.beforeAfter.title}
          </h2>
        </div>

        <div className="animate-on-scroll overflow-hidden rounded-2xl border border-white/10">
          {/* Header */}
          <div className="grid grid-cols-2">
            <div className="bg-red-950/40 border-b border-white/10 px-6 py-4 flex items-center gap-2">
              <span className="text-red-400 text-lg">✗</span>
              <span className="font-semibold text-red-300 text-sm">{t.beforeAfter.before}</span>
            </div>
            <div className="bg-brand-green/10 border-b border-l border-white/10 px-6 py-4 flex items-center gap-2">
              <span className="text-brand-green text-lg">✓</span>
              <span className="font-semibold text-brand-green text-sm">{t.beforeAfter.after}</span>
            </div>
          </div>

          {/* Rows */}
          {t.beforeAfter.items.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-2 ${i < t.beforeAfter.items.length - 1 ? 'border-b border-white/5' : ''}`}
            >
              <div className="px-6 py-4 flex items-start gap-3 bg-red-950/10">
                <span className="text-red-500 mt-0.5 flex-shrink-0 text-xs">✗</span>
                <p className="text-slate-400 text-sm leading-relaxed">{row.before}</p>
              </div>
              <div className="px-6 py-4 flex items-start gap-3 border-l border-white/5 bg-brand-green/5">
                <span className="text-brand-green mt-0.5 flex-shrink-0 text-xs">✓</span>
                <p className="text-slate-200 text-sm leading-relaxed">{row.after}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
