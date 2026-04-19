import type { RefObject } from 'react';
import { useI18n } from '../hooks/useI18n';
import { useIntersection } from '../hooks/useIntersection';

export function Testimonials() {
  const { t } = useI18n();
  const ref = useIntersection();

  return (
    <section className="py-24 bg-brand-light" ref={ref as RefObject<HTMLElement>}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-slate-500 text-lg">{t.testimonials.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.testimonials.items.map((item, i) => (
            <div
              key={i}
              className={`animate-on-scroll stagger-${i + 1} bg-white rounded-2xl p-7 shadow-sm border border-slate-100 flex flex-col`}
            >
              {/* Pain story */}
              <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6 italic">
                {item.text}
              </p>

              {/* Resolution */}
              <div className="pt-4 border-t border-slate-100">
                <p className="text-slate-400 text-xs mb-1">{item.author}</p>
                <p className="font-bold text-brand-dark text-sm">{item.company}</p>
                <span className="inline-block mt-2 text-xs text-slate-400 bg-slate-50 rounded-full px-3 py-1">
                  {item.industry}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
