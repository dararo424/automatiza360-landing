import { useI18n } from '../hooks/useI18n';

export function SocialProof() {
  const { t } = useI18n();

  const stats = [
    { value: t.social.stat1Value, label: t.social.stat1Label },
    { value: t.social.stat2Value, label: t.social.stat2Label },
    { value: t.social.stat3Value, label: t.social.stat3Label },
    { value: t.social.stat4Value, label: t.social.stat4Label },
  ];

  return (
    <section className="bg-paper py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="label-mono text-center text-ink/60 mb-10">
          {t.social.title}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 border-2 border-ink bg-white shadow-brut">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`p-6 sm:p-8 text-center border-ink ${i % 2 === 0 ? 'border-r-2' : 'md:border-r-2'} ${i < 2 ? 'border-b-2 md:border-b-0' : ''} ${i === 3 ? 'md:border-r-0' : ''}`}
            >
              <p className="font-display font-extrabold text-4xl sm:text-5xl text-ink mb-2">{s.value}</p>
              <div className="w-10 h-1.5 bg-brand-green mx-auto mb-3" />
              <p className="text-ink/70 text-xs sm:text-sm leading-snug font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
