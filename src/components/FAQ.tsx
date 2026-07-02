import { useState } from 'react';
import type { RefObject } from 'react';
import { useI18n } from '../hooks/useI18n';
import { useIntersection } from '../hooks/useIntersection';

export function FAQ() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);
  const ref = useIntersection();

  return (
    <section id="faq" className="py-24 bg-paper" ref={ref as RefObject<HTMLElement>}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <p className="label-mono text-ink/50 mb-4">// FAQ</p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-4 tracking-tight">
            {t.faq.title}
          </h2>
          <p className="text-ink/60 text-lg font-medium">{t.faq.subtitle}</p>
        </div>

        <div className="space-y-4 animate-on-scroll stagger-1">
          {t.faq.items.map((item, i) => (
            <div
              key={i}
              className={`bg-white border-2 border-ink transition-shadow ${open === i ? 'shadow-brut' : 'shadow-brut-sm'}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left text-ink font-bold hover:bg-paper transition-colors"
              >
                <span className="text-sm sm:text-base">{item.q}</span>
                <span className={`w-8 h-8 border-2 border-ink flex items-center justify-center flex-shrink-0 ml-4 font-display font-extrabold text-lg transition-colors ${
                  open === i ? 'bg-brand-green' : 'bg-paper'
                }`}>
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm text-ink/70 leading-relaxed border-t-2 border-ink/10 pt-4 font-medium">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
