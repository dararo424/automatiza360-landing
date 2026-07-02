import { useState } from 'react';
import type { RefObject } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck } from 'lucide-react';
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
    <section id="pricing" className="py-24 bg-paper" ref={ref as RefObject<HTMLElement>}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-on-scroll">
          <p className="label-mono text-ink/50 mb-4">// {t.nav.pricing}</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink mb-4 tracking-tight">
            {t.pricing.title}
          </h2>
          <p className="text-ink/60 text-lg max-w-xl mx-auto mb-8 font-medium">{t.pricing.subtitle}</p>

          {/* Billing toggle */}
          <div className="inline-flex border-2 border-ink bg-white shadow-brut-sm">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2.5 text-sm font-bold transition-colors ${
                !annual ? 'bg-ink text-paper' : 'text-ink hover:bg-paper-deep'
              }`}
            >
              {t.pricing.monthly}
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2.5 text-sm font-bold transition-colors flex items-center gap-2 border-l-2 border-ink ${
                annual ? 'bg-ink text-paper' : 'text-ink hover:bg-paper-deep'
              }`}
            >
              {t.pricing.annual}
              <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 border ${
                annual ? 'bg-brand-green text-ink border-brand-green' : 'bg-sun text-ink border-ink'
              }`}>
                {t.pricing.annualDiscount}
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 mb-12 pt-6">
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
                className={`relative border-2 border-ink p-8 flex flex-col ${
                  isPopular
                    ? 'bg-brand-green shadow-brut-xl md:-rotate-1 md:scale-[1.03]'
                    : 'bg-white shadow-brut'
                }`}
              >
                {isPopular && (
                  <span className="absolute -top-4 right-6 sticker bg-sun rotate-3">
                    ★ {t.pricing.popular}
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="font-display font-extrabold text-2xl mb-1 tracking-tight text-ink">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-ink/60 font-medium">{plan.desc}</p>
                </div>

                <div className="mb-6 pb-6 border-b-2 border-ink/15">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-extrabold text-4xl lg:text-5xl text-ink">
                      ${displayPrice}
                    </span>
                    <span className="font-mono text-xs font-bold text-ink/60">
                      {t.pricing.currency}{t.pricing.period}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-ink/50 mt-1.5">
                    {displayUSD}/mes {annual && '· facturado anualmente'}
                  </p>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-ink font-medium">
                      <span className={`w-5 h-5 border-2 border-ink flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isPopular ? 'bg-white' : 'bg-brand-green/25'
                      }`}>
                        <Check className="w-3 h-3 text-ink" strokeWidth={3.5} />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`${APP_URL}/onboarding`}
                  className={`btn-brut py-3.5 text-sm ${
                    isPopular ? 'bg-ink text-paper' : 'bg-white text-ink hover:bg-sun'
                  }`}
                >
                  {t.pricing.cta}
                </a>
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-4 animate-on-scroll">
          {t.pricing.guarantees.map((g) => (
            <span key={g} className="inline-flex items-center gap-2 font-mono text-xs font-bold text-ink">
              <ShieldCheck className="w-4 h-4 text-ink" strokeWidth={2.25} />
              {g}
            </span>
          ))}
        </div>

        <p className="text-center text-ink/50 text-sm font-medium animate-on-scroll">
          {t.pricing.note}
        </p>
      </div>
    </section>
  );
}
