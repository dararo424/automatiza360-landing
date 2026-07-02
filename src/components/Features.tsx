import type { RefObject } from 'react';
import { motion } from 'framer-motion';
import { Bot, ShoppingBag, CalendarCheck, Receipt, LineChart, Smartphone } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { useIntersection } from '../hooks/useIntersection';

export function Features() {
  const { t } = useI18n();
  const ref = useIntersection();

  const features = [
    { Icon: Bot, title: t.features.f1Title, desc: t.features.f1Desc },
    { Icon: ShoppingBag, title: t.features.f2Title, desc: t.features.f2Desc },
    { Icon: CalendarCheck, title: t.features.f3Title, desc: t.features.f3Desc },
    { Icon: Receipt, title: t.features.f4Title, desc: t.features.f4Desc },
    { Icon: LineChart, title: t.features.f5Title, desc: t.features.f5Desc },
    { Icon: Smartphone, title: t.features.f6Title, desc: t.features.f6Desc },
  ];

  return (
    <section id="features" className="py-24 bg-ink" ref={ref as RefObject<HTMLElement>}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <p className="label-mono text-brand-green mb-4">// 24/7</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-paper mb-4 tracking-tight">
            {t.features.title}
          </h2>
          <p className="text-paper/60 text-lg max-w-xl mx-auto font-medium">{t.features.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group bg-paper border-2 border-ink shadow-brut-green p-7 transition-transform duration-150 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-brand-green border-2 border-ink flex items-center justify-center mb-5">
                <f.Icon className="w-6 h-6 text-ink" strokeWidth={2} />
              </div>
              <h3 className="font-display font-extrabold text-ink text-lg mb-2 tracking-tight">{f.title}</h3>
              <p className="text-ink/60 text-sm leading-relaxed font-medium">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
