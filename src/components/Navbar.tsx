import { useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import type { Lang } from '../i18n/translations';

const APP_URL = (import.meta.env['VITE_APP_URL'] as string | undefined) ?? 'http://localhost:5173';

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }

  const links = [
    { label: t.nav.features, id: 'features' },
    { label: t.nav.industries, id: 'industries' },
    { label: t.nav.analyze, id: 'analizar' },
    { label: t.nav.pricing, id: 'pricing' },
    { label: t.nav.contact, id: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="font-display font-extrabold text-lg text-ink tracking-tight flex items-center gap-1">
            AUTOMATIZA
            <span className="bg-brand-green border-2 border-ink px-1 leading-none py-0.5 -rotate-3 shadow-brut-sm">360</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-sm font-semibold text-ink px-3 py-1.5 hover:bg-sun hover:border-ink border-2 border-transparent transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language toggle */}
            <div className="flex border-2 border-ink font-mono text-xs font-bold">
              {(['es', 'en'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 transition-colors ${
                    lang === l ? 'bg-ink text-paper' : 'bg-white text-ink hover:bg-paper-deep'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <a
              href={`${APP_URL}/login`}
              className="text-sm font-bold text-ink underline-offset-4 hover:underline decoration-2 decoration-brand-green px-2"
            >
              {t.nav.login}
            </a>
            <a
              href={`${APP_URL}/onboarding`}
              className="btn-brut bg-brand-green text-ink text-xs px-4 py-2"
            >
              {t.nav.start}
            </a>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <div className="flex border-2 border-ink font-mono text-xs font-bold">
              {(['es', 'en'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-0.5 ${lang === l ? 'bg-ink text-paper' : 'bg-white text-ink'}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="p-1.5 border-2 border-ink bg-white text-ink active:bg-sun"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-paper border-t-2 border-ink px-4 pb-4 pt-2">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="block w-full text-left py-3 text-ink font-semibold text-sm border-b-2 border-ink/10"
            >
              {l.label}
            </button>
          ))}
          <div className="flex gap-3 mt-4">
            <a
              href={`${APP_URL}/login`}
              className="flex-1 text-center text-sm font-bold text-ink border-2 border-ink bg-white py-2.5"
            >
              {t.nav.login}
            </a>
            <a
              href={`${APP_URL}/onboarding`}
              className="flex-1 text-center text-sm bg-brand-green border-2 border-ink text-ink font-bold py-2.5 shadow-brut-sm"
            >
              {t.nav.start}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
