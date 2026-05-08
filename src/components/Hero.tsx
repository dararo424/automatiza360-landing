import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, Check, Star } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { WhatsAppMockup } from './WhatsAppMockup';

const APP_URL = (import.meta.env['VITE_APP_URL'] as string | undefined) ?? 'http://localhost:5173';

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="min-h-screen bg-brand-dark flex items-center pt-16 overflow-hidden relative">
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark to-brand-green/5" />

      <motion.div
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[640px] h-[640px] bg-brand-green/10 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -left-32 top-1/4 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/30 text-brand-green text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green" />
              </span>
              {t.hero.eyebrow}
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              {t.hero.title}
              <br />
              <span className="bg-gradient-to-r from-brand-green to-emerald-300 bg-clip-text text-transparent">
                {t.hero.titleAccent}
              </span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-lg">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href={`${APP_URL}/onboarding`}
                className="inline-flex items-center gap-2 bg-brand-green hover:brightness-110 text-brand-dark font-bold px-6 py-3.5 rounded-xl text-base transition-all shadow-lg shadow-brand-green/25"
              >
                {t.hero.cta}
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/10 font-semibold px-6 py-3.5 rounded-xl text-base transition-colors backdrop-blur-sm"
              >
                <PlayCircle className="w-5 h-5" strokeWidth={1.75} />
                {t.hero.demo}
              </motion.button>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8">
              {[t.hero.badge1, t.hero.badge2, t.hero.badge3].map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1.5 text-sm text-slate-400">
                  <Check className="w-4 h-4 text-brand-green" strokeWidth={3} />
                  {badge}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
              <div className="flex -space-x-2">
                {['from-brand-green to-emerald-400', 'from-emerald-400 to-teal-500', 'from-teal-500 to-emerald-600', 'from-emerald-300 to-brand-green'].map((g, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded-full bg-gradient-to-br ${g} ring-2 ring-brand-dark`}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-white text-sm font-semibold ml-1">{t.hero.proofRating}</span>
                </div>
                <p className="text-slate-400 text-xs">{t.hero.proofCount}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <WhatsAppMockup />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
