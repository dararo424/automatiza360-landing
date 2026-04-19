import { type RefObject, useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import { useIntersection } from '../hooks/useIntersection';

const API_URL = ((import.meta.env['VITE_API_URL'] as string | undefined) ?? 'http://localhost:3000').replace(/\/$/, '');
const APP_URL = ((import.meta.env['VITE_APP_URL'] as string | undefined) ?? 'http://localhost:5173').replace(/\/$/, '');

interface AnalysisResult {
  industry: string;
  industryLabel: string;
  industryEmoji: string;
  recommendedPlan: 'STARTER' | 'PRO' | 'BUSINESS';
  planReason: string;
  planWhyPoints: string[];
  automations: string[];
  headline: string;
  description: string;
}

type Step = 'input' | 'result' | 'signup' | 'loading-onboard';

const PLAN_STYLES: Record<string, { badge: string; border: string; bg: string }> = {
  STARTER: {
    badge: 'text-sky-400 bg-sky-400/10 border-sky-400/30',
    border: 'border-sky-400/20',
    bg: 'from-white/5 to-sky-900/10',
  },
  PRO: {
    badge: 'text-brand-green bg-brand-green/10 border-brand-green/30',
    border: 'border-brand-green/20',
    bg: 'from-white/5 to-brand-green/5',
  },
  BUSINESS: {
    badge: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
    border: 'border-purple-400/20',
    bg: 'from-white/5 to-purple-900/10',
  },
};

export function BusinessAnalyzer() {
  const { t } = useI18n();
  const ref = useIntersection();

  const [description, setDescription] = useState('');
  const [step, setStep] = useState<Step>('input');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  // Signup form state
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [password, setPassword] = useState('');
  const [signupError, setSignupError] = useState('');

  const planStyles = result ? (PLAN_STYLES[result.recommendedPlan] ?? PLAN_STYLES['PRO']) : PLAN_STYLES['PRO'];

  async function handleAnalyze() {
    if (description.trim().length < 10) return;
    setStep('loading-onboard');
    setError('');

    try {
      const res = await fetch(`${API_URL}/public/analyze-business`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: description.trim() }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json() as AnalysisResult;
      setResult(data);
      setStep('result');
    } catch {
      setError(t.businessAnalyzer.errorMsg);
      setStep('input');
    }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!result) return;
    setSignupError('');
    setStep('loading-onboard');

    try {
      const res = await fetch(`${API_URL}/public/auto-onboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          ownerName,
          businessName: result.industryLabel,
          ownerPhone: ownerPhone.startsWith('+') ? ownerPhone : `+57${ownerPhone}`,
          industry: result.industry,
          plan: result.recommendedPlan,
          description: description.trim(),
        }),
      });

      const data = await res.json() as { token?: string; message?: string };

      if (!res.ok || !data.token) {
        throw new Error((data as unknown as { message?: string }).message ?? 'Error al crear cuenta');
      }

      window.location.href = `${APP_URL}/auto-login?token=${encodeURIComponent(data.token)}`;
    } catch (err) {
      setSignupError(err instanceof Error ? err.message : t.businessAnalyzer.signupError);
      setStep('signup');
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

        {/* ── Step: input ─────────────────────────────────────────── */}
        {(step === 'input' || step === 'loading-onboard') && !result && (
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
              disabled={step === 'loading-onboard'}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green/50 transition-colors disabled:opacity-50"
            />
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-slate-500">{description.length}/1000</span>
              <button
                onClick={handleAnalyze}
                disabled={step === 'loading-onboard' || description.trim().length < 10}
                className="inline-flex items-center gap-2 bg-brand-green hover:bg-green-400 disabled:opacity-40 disabled:cursor-not-allowed text-brand-dark font-bold px-6 py-3 rounded-xl text-sm transition-all hover:scale-105"
              >
                {step === 'loading-onboard' ? (
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
            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          </div>
        )}

        {/* ── Step: result ─────────────────────────────────────────── */}
        {step === 'result' && result && (
          <div className={`animate-on-scroll is-visible bg-gradient-to-br ${planStyles.bg} border ${planStyles.border} rounded-2xl p-8`}>

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
              <div className={`border rounded-xl px-4 py-2 text-center ${planStyles.badge}`}>
                <p className="text-xs uppercase tracking-widest mb-0.5 opacity-70">
                  {t.businessAnalyzer.recommendedPlan}
                </p>
                <p className="font-display font-bold text-lg">{result.recommendedPlan}</p>
              </div>
            </div>

            {/* Headline + description */}
            <h3 className="font-display text-xl font-bold text-white mb-2">{result.headline}</h3>
            <p className="text-slate-300 text-sm mb-6">{result.description}</p>

            {/* Why this plan */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-3 font-semibold">
                {t.businessAnalyzer.whyTitle}
              </p>
              <p className="text-slate-300 text-sm mb-3 font-medium">{result.planReason}</p>
              <ul className="space-y-2">
                {result.planWhyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Automations */}
            <div className="mb-8">
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">
                {t.businessAnalyzer.automationsTitle}
              </p>
              <ul className="grid sm:grid-cols-2 gap-2">
                {result.automations.map((a) => (
                  <li key={a} className="flex items-center gap-2.5 text-sm text-slate-200">
                    <span className="text-brand-green">→</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <button
              onClick={() => setStep('signup')}
              className="w-full text-center bg-brand-green hover:bg-green-400 text-brand-dark font-bold py-4 rounded-xl text-base transition-all hover:scale-105 shadow-lg shadow-green-500/20"
            >
              {t.businessAnalyzer.startCta} →
            </button>
            <p className="text-center text-slate-500 text-xs mt-3">{t.businessAnalyzer.startNote}</p>
            <button
              onClick={() => { setResult(null); setStep('input'); }}
              className="block mx-auto mt-3 text-slate-500 hover:text-slate-300 text-xs underline"
            >
              {t.businessAnalyzer.tryAgain}
            </button>
          </div>
        )}

        {/* ── Step: signup ─────────────────────────────────────────── */}
        {(step === 'signup' || (step === 'loading-onboard' && result)) && result && (
          <div className="animate-on-scroll is-visible space-y-4">
            {/* Mini recap */}
            <div className={`flex items-center gap-3 bg-white/5 border ${planStyles.border} rounded-xl px-4 py-3`}>
              <span className="text-2xl">{result.industryEmoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">{result.industryLabel}</p>
                <p className="text-slate-400 text-xs">Plan {result.recommendedPlan} · 14 días gratis</p>
              </div>
              <button
                onClick={() => setStep('result')}
                className="text-slate-500 hover:text-slate-300 text-xs shrink-0"
              >
                ← {t.businessAnalyzer.back}
              </button>
            </div>

            {/* Signup form */}
            <form
              onSubmit={handleSignup}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4"
            >
              <h3 className="font-display font-bold text-white text-xl mb-2">
                {t.businessAnalyzer.signupTitle}
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">{t.businessAnalyzer.fieldName}</label>
                  <input
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    required
                    minLength={2}
                    placeholder="Juan Pérez"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">{t.businessAnalyzer.fieldPhone}</label>
                  <input
                    type="tel"
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    required
                    placeholder="+573001234567"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1.5">{t.businessAnalyzer.fieldEmail}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="juan@veterinaria.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1.5">{t.businessAnalyzer.fieldPassword}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                />
              </div>

              {signupError && (
                <p className="text-sm text-red-400">{signupError}</p>
              )}

              <button
                type="submit"
                disabled={step === 'loading-onboard'}
                className="w-full bg-brand-green hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed text-brand-dark font-bold py-4 rounded-xl text-base transition-all hover:scale-105"
              >
                {step === 'loading-onboard' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {t.businessAnalyzer.creatingAccount}
                  </span>
                ) : t.businessAnalyzer.signupCta}
              </button>

              <p className="text-center text-slate-500 text-xs">{t.businessAnalyzer.startNote}</p>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
