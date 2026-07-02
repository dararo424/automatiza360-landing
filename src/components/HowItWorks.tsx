import type { RefObject } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, SlidersHorizontal, MessageCircle } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { useIntersection } from '../hooks/useIntersection';

const ROTATIONS = ['md:-rotate-1', '', 'md:rotate-1'];

export function HowItWorks() {
  const { t } = useI18n();
  const ref = useIntersection();

  const steps = [
    { Icon: Sparkles, title: t.how.step1Title, desc: t.how.step1Desc },
    { Icon: SlidersHorizontal, title: t.how.step2Title, desc: t.how.step2Desc },
    { Icon: MessageCircle, title: t.how.step3Title, desc: t.how.step3Desc },
  ];

  return (
    <section id="how" className="py-24 bg-paper" ref={ref as RefObject<HTMLElement>}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <p className="label-mono text-ink/50 mb-4">// {t.nav.features}</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink mb-4 tracking-tight">
            {t.how.title}
          </h2>
          <p className="text-ink/60 text-lg max-w-xl mx-auto font-medium">{t.how.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative bg-white border-2 border-ink shadow-brut p-8 pt-12 ${ROTATIONS[i]}`}
            >
              <span className="absolute -top-5 -left-2 w-14 h-14 bg-sun border-2 border-ink shadow-brut-sm flex items-center justify-center font-display font-extrabold text-xl -rotate-6">
                {i + 1}
              </span>
              <div className="w-14 h-14 bg-brand-green border-2 border-ink flex items-center justify-center mb-5">
                <step.Icon className="w-7 h-7 text-ink" strokeWidth={2} />
              </div>
              <h3 className="font-display font-extrabold text-xl text-ink mb-3 tracking-tight">{step.title}</h3>
              <p className="text-ink/60 leading-relaxed text-sm font-medium">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
