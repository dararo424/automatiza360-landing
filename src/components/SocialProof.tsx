import { useI18n } from '../hooks/useI18n';

export function SocialProof() {
  const { t } = useI18n();

  const stats = [
    { value: t.social.stat1Value, label: t.social.stat1Label, color: 'text-brand-green' },
    { value: t.social.stat2Value, label: t.social.stat2Label, color: 'text-sky-400' },
    { value: t.social.stat3Value, label: t.social.stat3Label, color: 'text-purple-400' },
    { value: t.social.stat4Value, label: t.social.stat4Label, color: 'text-brand-green' },
  ];

  return (
    <section className="bg-brand-dark border-t border-b border-white/10 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-slate-400 text-sm uppercase tracking-widest mb-12">
          {t.social.title}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className={`font-display font-bold text-5xl mb-2 ${s.color}`}>{s.value}</p>
              <p className="text-slate-400 text-sm leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
