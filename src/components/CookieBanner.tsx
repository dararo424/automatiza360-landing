import { useEffect, useState } from 'react';

const PIXEL_ID = (import.meta.env['VITE_META_PIXEL_ID'] as string | undefined) ?? '';

function loadMetaPixel(pixelId: string) {
  if (!pixelId || (window as any).fbq) return;
  const n: any = function (...args: any[]) { n.callMethod ? n.callMethod(...args) : n.queue.push(args); };
  (window as any).fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);
  n('init', pixelId);
  n('track', 'PageView');
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setVisible(true);
    } else if (consent === 'all' && PIXEL_ID) {
      loadMetaPixel(PIXEL_ID);
    }
  }, []);

  function acceptAll() {
    localStorage.setItem('cookie_consent', 'all');
    if (PIXEL_ID) loadMetaPixel(PIXEL_ID);
    setVisible(false);
  }

  function acceptEssential() {
    localStorage.setItem('cookie_consent', 'essential');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-brand-dark border border-white/15 rounded-2xl shadow-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-white text-sm font-semibold mb-1">🍪 Usamos cookies</p>
          <p className="text-slate-400 text-xs leading-relaxed">
            Utilizamos cookies propias y de terceros para mejorar tu experiencia y analizar el tráfico.
            Puedes aceptar todas o solo las esenciales. Consulta nuestra{' '}
            <a href="#/privacidad" className="text-brand-green underline underline-offset-2">
              Política de Privacidad
            </a>.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={acceptEssential}
            className="text-xs px-4 py-2 rounded-lg border border-white/20 text-slate-300 hover:bg-white/10 transition-colors"
          >
            Solo esenciales
          </button>
          <button
            onClick={acceptAll}
            className="text-xs px-4 py-2 rounded-lg bg-brand-green hover:brightness-110 text-brand-dark font-semibold transition-all"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}
