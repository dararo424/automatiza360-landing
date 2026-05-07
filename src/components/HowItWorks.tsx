import type { RefObject } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, SlidersHorizontal, MessageCircle, ArrowRight } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { useIntersection } from '../hooks/useIntersection';

export function HowItWorks() {
  const { t } = useI18n();
  const ref = useIntersection();

  const steps = [
    { Icon: Sparkles, title: t.how.step1Title, desc: t.how.step1Desc },
    { Icon: SlidersHorizontal, title: t.how.step2Title, desc: t.how.step2Desc },
    { Icon: MessageCircle, title: t.how.step3Title, desc: t.how.step3Desc },
  ];

  return (
    <section id="how" className="py-24 bg-brand-light" ref={ref as RefObject<HTMLElement>}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-4 tracking-tight">
            {t.how.title}
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">{t.how.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-brand-green/30 via-brand-green/40 to-brand-green/30" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-brand-green/15 rounded-2xl rotate-6" />
                <div className="absolute inset-0 bg-brand-green/8 rounded-2xl -rotate-3" />
                <div className="relative bg-white rounded-2xl w-20 h-20 flex items-center justify-center shadow-xl shadow-brand-dark/5">
                  <step.Icon className="w-9 h-9 text-brand-dark" strokeWidth={1.75} />
                </div>
                <span className="absolute -top-2 -right-2 bg-brand-green text-brand-dark text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-md">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-brand-dark mb-3 tracking-tight">{step.title}</h3>
              <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">{step.desc}</p>

              {i < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-10 -right-4 w-6 h-6 text-brand-green/40" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
