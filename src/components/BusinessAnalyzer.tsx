import { type RefObject, useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import { useIntersection } from '../hooks/useIntersection';

const API_URL = (import.meta.env['VITE_API_URL'] as string | undefined) ?? 'http://localhost:3000';
const APP_URL = (import.meta.env['VITE_APP_URL'] as string | undefined) ?? 'http://localhost:5173';

interface AnalysisResult {
  industry: string;
  industryLabel: string;
  industryEmoji: string;
  recommendedPlan: 'STARTER' | 'PRO' | 'BUSINESS';
  planReason: string;
  automations: string[];
  headline: string;
  description: string;
}

const PLAN_COLORS: Record<string, string> = {
  STARTER: 'text-sky-400 bg-sky-400/10 border-sky-400/30',
  PRO: 'text-brand-green bg-brand-green/10 border-brand-green/30',
  BUSINESS: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
};

const PLAN_LABELS: Record<string, string> = {
  STARTER: 'Starter',
  PRO: 'Pro',
  BUSINESS: 'Business',
};

export function BusinessAnalyzer() {
  const { t } = useI18n();
  const ref = useIntersection();
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  async function handleAnalyze() {
    if (description.trim().length < 10) return;
    setLoading(true);
    setResult(null);
    setError('');

    try {
      const res = await fetch(`${API_URL}/public/analyze-business`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: description.trim() }),
      });

      if (!res.ok) throw new Error('Error al analizar');
      const data = await res.json() as AnalysisResult;
      setResult(data);
    } catch {
      setError(t.businessAnalyzer.errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="analizar" className="py-24 bg-brand-dark" ref={ref as RefObject<HTMLElement>}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-on-scroll">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/30 text-brand-green text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
            {t.businessAnalyzer.badge}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            {t.businessAnalyzer.title}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t.businessAnalyzer.subtitle}
          </p>
        </div>

        {/* Input card */}
        <div className="animate-on-scroll bg-white/5 border border-white/10 rounded-2xl p-8">
          <label className="block text-sm font-medium text-slate-300 mb-3">
            {t.businessAnalyzer.label}
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.businessAnalyzer.placeholder}
            rows={4}
            maxLength={1000}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green/50 transition-colors"
          />
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-slate-500">{description.length}/1000</span>
            <button
              onClick={handleAnalyze}
              disabled={loading || description.trim().length < 10}
              className="inline-flex items-center gap-2 bg-brand-green hover:bg-green-400 disabled:opacity-40 disabled:cursor-not-allowed text-brand-dark font-bold px-6 py-3 rounded-xl text-sm transition-all hover:scale-105"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {t.businessAnalyzer.analyzing}
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.347.347a3.001 3.001 0 01-2.121.879H9.75a3.002 3.002 0 01-2.121-.879l-.347-.347z" />
                  </svg>
                  {t.businessAnalyzer.cta}
                </>
              )}
            </button>
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-400">{error}</p>
          )}
        </div>

        {/* Result card */}
        {result && (
          <div className="mt-8 animate-on-scroll is-visible bg-gradient-to-br from-white/5 to-brand-green/5 border border-brand-green/20 rounded-2xl p-8">
            {/* Industry + Plan header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{result.industryEmoji}</span>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mb-0.5">
                    {t.businessAnalyzer.detectedIndustry}
                  </p>
                  <p className="font-display font-bold text-white text-xl">{result.industryLabel}</p>
                </div>
              </div>
              <div className={`border rounded-xl px-4 py-2 text-center ${PLAN_COLORS[result.recommendedPlan] ?? ''}`}>
                <p className="text-xs uppercase tracking-widest mb-0.5 opacity-70">
                  {t.businessAnalyzer.recommendedPlan}
                </p>
                <p className="font-display font-bold text-lg">
                  {PLAN_LABELS[result.recommendedPlan]}
                </p>
                <p className="text-xs opacity-60 mt-0.5">{result.planReason}</p>
              </div>
            </div>

            {/* Headline */}
            <h3 className="font-display text-xl font-bold text-white mb-2">{result.headline}</h3>
            <p className="text-slate-300 text-sm mb-6">{result.description}</p>

            {/* Automations */}
            <div className="mb-8">
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">
                {t.businessAnalyzer.automationsTitle}
              </p>
              <ul className="space-y-2">
                {result.automations.map((a) => (
                  <li key={a} className="flex items-center gap-2.5 text-sm text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center text-xs flex-shrink-0">✓</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <a
              href={`${APP_URL}/onboarding?plan=${result.recommendedPlan.toLowerCase()}&industry=${result.industry}`}
              className="block text-center bg-brand-green hover:bg-green-400 text-brand-dark font-bold py-4 rounded-xl text-base transition-all hover:scale-105 shadow-lg shadow-green-500/20"
            >
              {t.businessAnalyzer.startCta} →
            </a>
            <p className="text-center text-slate-500 text-xs mt-3">{t.businessAnalyzer.startNote}</p>
          </div>
        )}
      </div>
    </section>
  );
}
