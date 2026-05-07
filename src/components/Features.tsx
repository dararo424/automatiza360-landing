import type { RefObject } from 'react';
import { motion } from 'framer-motion';
import { Bot, ShoppingBag, CalendarCheck, Receipt, LineChart, Smartphone } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { useIntersection } from '../hooks/useIntersection';

export function Features() {
  const { t } = useI18n();
  const ref = useIntersection();

  const features = [
    { Icon: Bot, title: t.features.f1Title, desc: t.features.f1Desc, accent: 'from-brand-green/20 to-brand-green/0' },
    { Icon: ShoppingBag, title: t.features.f2Title, desc: t.features.f2Desc, accent: 'from-sky-500/20 to-sky-500/0' },
    { Icon: CalendarCheck, title: t.features.f3Title, desc: t.features.f3Desc, accent: 'from-brand-accent/20 to-brand-accent/0' },
    { Icon: Receipt, title: t.features.f4Title, desc: t.features.f4Desc, accent: 'from-amber-500/20 to-amber-500/0' },
    { Icon: LineChart, title: t.features.f5Title, desc: t.features.f5Desc, accent: 'from-brand-green/20 to-brand-green/0' },
    { Icon: Smartphone, title: t.features.f6Title, desc: t.features.f6Desc, accent: 'from-pink-500/20 to-pink-500/0' },
  ];

  return (
    <section id="features" className="py-24 bg-brand-dark relative overflow-hidden" ref={ref as RefObject<HTMLElement>}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,194,120,0.08),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            {t.features.title}
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">{t.features.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="group relative bg-white/[0.03] border border-white/10 rounded-2xl p-7 hover:border-brand-green/40 hover:bg-white/[0.05] transition-all overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative">
                <div className="w-12 h-12 bg-brand-green/10 ring-1 ring-brand-green/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand-green/20 group-hover:ring-brand-green/40 transition-all">
                  <f.Icon className="w-6 h-6 text-brand-green" strokeWidth={2} />
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2 tracking-tight">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
