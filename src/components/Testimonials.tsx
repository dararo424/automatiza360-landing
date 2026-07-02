import type { RefObject } from 'react';
import { useI18n } from '../hooks/useI18n';
import { useIntersection } from '../hooks/useIntersection';

const ROTATIONS = ['md:-rotate-2', 'md:rotate-1', 'md:-rotate-1'];

export function Testimonials() {
  const { t } = useI18n();
  const ref = useIntersection();

  return (
    <section className="py-24 bg-sun border-y-2 border-ink overflow-hidden" ref={ref as RefObject<HTMLElement>}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-4 tracking-tight">
            {t.testimonials.title}
          </h2>
          <p className="text-ink/70 text-lg font-medium">{t.testimonials.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.testimonials.items.map((item, i) => (
            <div
              key={i}
              className={`animate-on-scroll stagger-${i + 1} bg-white border-2 border-ink shadow-brut-lg p-7 flex flex-col ${ROTATIONS[i]}`}
            >
              {/* Pain story */}
              <p className="text-ink/75 text-sm leading-relaxed flex-1 mb-6 italic font-medium">
                {item.text}
              </p>

              {/* Resolution */}
              <div className="pt-4 border-t-2 border-ink/10">
                <p className="font-mono text-xs text-ink/50 mb-1">{item.author}</p>
                <p className="font-display font-extrabold text-ink text-sm">{item.company}</p>
                <span className="sticker bg-paper mt-3 text-[10px] -rotate-1">
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
