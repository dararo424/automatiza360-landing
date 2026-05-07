import { useState } from 'react';
import type { RefObject } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, ShieldCheck } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { useIntersection } from '../hooks/useIntersection';

const APP_URL = (import.meta.env['VITE_APP_URL'] as string | undefined) ?? 'http://localhost:5173';
const POPULAR_INDEX = 1;

function applyDiscount(price: string): string {
  const num = parseInt(price.replace(/\./g, ''), 10);
  if (isNaN(num)) return price;
  const discounted = Math.round((num * 0.8) / 1000) * 1000;
  return discounted.toLocaleString('es-CO');
}

function applyDiscountUSD(usd: string): string {
  const match = usd.match(/\$(\d+)/);
  if (!match) return usd;
  const num = parseInt(match[1], 10);
  const discounted = Math.round(num * 0.8);
  return usd.replace(/\$\d+/, `$${discounted}`);
}

export function Pricing() {
  const { t } = useI18n();
  const [annual, setAnnual] = useState(false);
  const ref = useIntersection();

  return (
    <section id="pricing" className="py-24 bg-brand-dark relative overflow-hidden" ref={ref as RefObject<HTMLElement>}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(0,194,120,0.06),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            {t.pricing.title}
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">{t.pricing.subtitle}</p>

          <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-full p-1 relative">
            <button
              onClick={() => setAnnual(false)}
              className={`relative z-10 px-5 py-2 text-sm font-semibold rounded-full transition-colors ${
                !annual ? 'text-brand-dark' : 'text-slate-300 hover:text-white'
              }`}
            >
              {t.pricing.monthly}
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`relative z-10 px-5 py-2 text-sm font-semibold rounded-full transition-colors flex items-center gap-2 ${
                annual ? 'text-brand-dark' : 'text-slate-300 hover:text-white'
              }`}
            >
              {t.pricing.annual}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                annual ? 'bg-brand-dark/15 text-brand-dark' : 'bg-brand-green/20 text-brand-green'
              }`}>
                {t.pricing.annualDiscount}
              </span>
            </button>
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="absolute inset-y-1 bg-brand-green rounded-full"
              style={annual
                ? { left: '50%', right: '4px' }
                : { left: '4px', right: '50%' }
              }
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10 pt-4">
          {t.pricing.plans.map((plan, i) => {
            const isPopular = i === POPULAR_INDEX;
            const displayPrice = annual ? applyDiscount(plan.price) : plan.price;
            const displayUSD = annual ? applyDiscountUSD(plan.priceUSD) : plan.priceUSD;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  isPopular
                    ? 'bg-gradient-to-br from-brand-green to-emerald-500 text-brand-dark shadow-2xl shadow-brand-green/30 md:scale-105 md:-my-2'
                    : 'bg-white/[0.04] border border-white/10 text-white hover:border-white/20 transition-colors'
                }`}
              >
                {isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-dark text-brand-green text-xs font-bold px-4 py-1.5 rounded-full border border-brand-green/40 shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" strokeWidth={2.5} />
                    {t.pricing.popular}
                  </span>
                )}

                <div className="mb-6">
                  <h3 className={`font-display font-bold text-xl mb-1 tracking-tight ${isPopular ? 'text-brand-dark' : 'text-white'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${isPopular ? 'text-emerald-950/80' : 'text-slate-400'}`}>{plan.desc}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1.5">
                    <span className={`text-4xl font-display font-bold ${isPopular ? 'text-brand-dark' : 'text-white'}`}>
                      ${displayPrice}
                    </span>
                    <span className={`text-sm ${isPopular ? 'text-emerald-950/80' : 'text-slate-400'}`}>
                      {t.pricing.currency}{t.pricing.period}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 ${isPopular ? 'text-emerald-950/70' : 'text-slate-500'}`}>
                    {displayUSD}/mes {annual && '· facturado anualmente'}
                  </p>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className={`flex items-start gap-2.5 text-sm ${isPopular ? 'text-emerald-950' : 'text-slate-300'}`}>
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isPopular ? 'bg-brand-dark/15 text-brand-dark' : 'bg-brand-green/15 text-brand-green'
                      }`}>
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`${APP_URL}/onboarding`}
                  className={`block text-center font-bold py-3 rounded-xl transition-all hover:scale-[1.02] ${
                    isPopular
                      ? 'bg-brand-dark text-brand-green hover:bg-slate-900 shadow-md'
                      : 'bg-brand-green/10 border border-brand-green/30 text-brand-green hover:bg-brand-green/20'
                  }`}
                >
                  {t.pricing.cta}
                </a>
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-400 mb-4 animate-on-scroll">
          {t.pricing.guarantees.map((g) => (
            <span key={g} className="inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-green" strokeWidth={2} />
              {g}
            </span>
          ))}
        </div>

        <p className="text-center text-slate-500 text-sm animate-on-scroll">
          {t.pricing.note}
        </p>
      </div>
    </section>
  );
}
