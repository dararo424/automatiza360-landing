import type { RefObject } from 'react';
import { useI18n } from '../hooks/useI18n';
import { useIntersection } from '../hooks/useIntersection';

const COMPETITORS = [
  { name: 'WATI (India)',             price: 'USD $49–349',  ai: false, multi: false, es: false, highlight: false },
  { name: 'ManyChat (EEUU)',          price: 'USD $15–300',  ai: false, multi: false, es: false, highlight: false },
  { name: 'Respond.io (Global)',      price: 'USD $79–279',  ai: true,  multi: true,  es: false, highlight: false },
  { name: 'Landbot (España)',         price: 'USD $40–400',  ai: false, multi: false, es: true,  highlight: false },
  { name: 'Chatbot Colombia (Local)', price: 'Cotización',   ai: false, multi: false, es: true,  highlight: false },
  { name: '✦ Automatiza360',         price: 'USD $19–129',  ai: true,  multi: true,  es: true,  highlight: true  },
];

function Mark({ yes }: { yes: boolean }) {
  if (yes) {
    return <span className="font-bold text-ink">✓</span>;
  }
  return <span className="text-ink/30 font-bold">✗</span>;
}

export function Competitors() {
  const { t } = useI18n();
  const ref = useIntersection();

  return (
    <section className="py-24 bg-ink" ref={ref as RefObject<HTMLElement>}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-on-scroll">
          <p className="label-mono text-brand-green mb-4">// VS</p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-paper mb-4 tracking-tight">
            {t.competitors.title}
          </h2>
          <p className="text-paper/60 text-lg max-w-2xl mx-auto font-medium">{t.competitors.subtitle}</p>
        </div>

        <div className="animate-on-scroll overflow-x-auto border-2 border-ink shadow-brut-green bg-paper">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-ink">
                {t.competitors.columns.map((col) => (
                  <th key={col} className="px-5 py-4 text-left text-paper font-mono text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPETITORS.map((row) => (
                <tr
                  key={row.name}
                  className={`border-b-2 border-ink/10 last:border-0 ${
                    row.highlight
                      ? 'bg-brand-green text-ink font-bold'
                      : 'text-ink/80 bg-paper'
                  }`}
                >
                  <td className={`px-5 py-4 whitespace-nowrap ${row.highlight ? 'font-display font-extrabold' : 'font-semibold'}`}>{row.name}</td>
                  <td className="px-5 py-4 font-mono text-xs whitespace-nowrap">{row.price}</td>
                  <td className="px-5 py-4 text-center"><Mark yes={row.ai} /></td>
                  <td className="px-5 py-4 text-center"><Mark yes={row.multi} /></td>
                  <td className="px-5 py-4 text-center"><Mark yes={row.es} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
