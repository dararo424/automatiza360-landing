import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, Check, Star } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { WhatsAppMockup } from './WhatsAppMockup';

const APP_URL = (import.meta.env['VITE_APP_URL'] as string | undefined) ?? 'http://localhost:5173';

export function Hero() {
  const { t } = useI18n();

  const marqueeItems = [
    t.features.f1Title,
    t.features.f2Title,
    t.features.f3Title,
    t.features.f4Title,
    t.features.f6Title,
  ];

  return (
    <section className="bg-paper pt-16 relative overflow-hidden">
      {/* Scattered decorative marks — flat ink, no blur */}
      <span aria-hidden className="hidden lg:block absolute top-32 right-[46%] font-display font-extrabold text-4xl text-brand-green select-none rotate-12">✱</span>
      <span aria-hidden className="hidden lg:block absolute bottom-40 left-[3%] font-display font-extrabold text-3xl text-sun select-none -rotate-6">✱</span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-20 lg:pt-20 lg:pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="sticker bg-sun -rotate-2 mb-8">
              ★ {t.hero.eyebrow}
            </div>

            <h1 className="font-display font-extrabold text-[2.7rem] leading-[0.97] sm:text-6xl lg:text-6xl xl:text-7xl text-ink tracking-tight mb-6">
              {t.hero.title}
              <br />
              <span className="inline-block bg-brand-green border-2 border-ink px-3 py-1 mt-3 -rotate-1 shadow-brut">
                {t.hero.titleAccent}
              </span>
            </h1>

            <p className="text-lg text-ink/75 leading-relaxed mb-8 max-w-lg font-medium">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href={`${APP_URL}/onboarding`}
                className="btn-brut bg-brand-green text-ink px-6 py-4 text-sm"
              >
                {t.hero.cta}
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </a>
              <button
                onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-brut bg-white text-ink px-6 py-4 text-sm"
              >
                <PlayCircle className="w-5 h-5" strokeWidth={2} />
                {t.hero.demo}
              </button>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8">
              {[t.hero.badge1, t.hero.badge2, t.hero.badge3].map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-ink">
                  <span className="w-4 h-4 bg-brand-green border border-ink flex items-center justify-center">
                    <Check className="w-3 h-3 text-ink" strokeWidth={4} />
                  </span>
                  {badge}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-5 border-t-2 border-ink/10">
              <div className="flex -space-x-2">
                {['bg-brand-green', 'bg-sun', 'bg-coral', 'bg-ink'].map((c, i) => (
                  <div key={i} className={`w-9 h-9 rounded-full border-2 border-ink ${c}`} />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-ink fill-ink" />
                  ))}
                  <span className="text-ink text-sm font-extrabold ml-1 font-display">{t.hero.proofRating}</span>
                </div>
                <p className="text-ink/60 text-xs font-mono">{t.hero.proofCount}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="rotate-2">
              <WhatsAppMockup />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="relative border-y-2 border-ink bg-brand-green overflow-hidden py-3">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[0, 1].map((dup) => (
            <div key={dup} aria-hidden={dup === 1} className="flex items-center">
              {marqueeItems.map((item) => (
                <span key={`${dup}-${item}`} className="font-display font-extrabold uppercase text-ink text-sm sm:text-base tracking-wide flex items-center">
                  <span className="px-4">{item}</span>
                  <span className="text-paper">★</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
