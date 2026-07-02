import { useI18n } from '../hooks/useI18n';

interface Props { onNavigate: (page: 'terminos' | 'privacidad') => void }

export function Footer({ onNavigate }: Props) {
  const { t } = useI18n();

  return (
    <footer className="bg-ink border-t-2 border-ink py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="font-display font-extrabold text-xl text-paper mb-4 flex items-center gap-1">
              AUTOMATIZA
              <span className="bg-brand-green border-2 border-paper text-ink px-1 py-0.5 leading-none -rotate-3">360</span>
            </div>
            <p className="text-paper/60 text-sm leading-relaxed max-w-xs font-medium">
              {t.footer.tagline}
            </p>
            <div className="flex gap-3 mt-5">
              {['twitter', 'instagram', 'linkedin'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 border-2 border-paper/40 flex items-center justify-center text-paper/70 font-mono text-xs font-bold hover:bg-brand-green hover:text-ink hover:border-brand-green transition-colors"
                  aria-label={social}
                >
                  {social === 'twitter' ? 'X' : social === 'instagram' ? 'IG' : 'in'}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="label-mono text-brand-green mb-5">Legal</h4>
            <div className="space-y-2.5">
              <button
                onClick={() => onNavigate('terminos')}
                className="block text-paper/60 hover:text-paper text-sm font-medium transition-colors hover:underline underline-offset-4 decoration-brand-green decoration-2"
              >
                {t.footer.terms}
              </button>
              <button
                onClick={() => onNavigate('privacidad')}
                className="block text-paper/60 hover:text-paper text-sm font-medium transition-colors hover:underline underline-offset-4 decoration-brand-green decoration-2"
              >
                {t.footer.privacy}
              </button>
              <a
                href="mailto:hola@automatiza360.com"
                className="block text-paper/60 hover:text-paper text-sm font-medium transition-colors hover:underline underline-offset-4 decoration-brand-green decoration-2"
              >
                {t.footer.contact}
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="label-mono text-brand-green mb-5">Contacto</h4>
            <a
              href={`mailto:${t.footer.email}`}
              className="font-mono text-sm text-paper/70 hover:text-brand-green transition-colors"
            >
              {t.footer.email}
            </a>
          </div>
        </div>

        <div className="border-t-2 border-paper/15 pt-6 text-center">
          <p className="font-mono text-xs text-paper/40">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
