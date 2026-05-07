import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

const APP_URL = (import.meta.env['VITE_APP_URL'] as string | undefined) ?? 'http://localhost:5173';

export function StickyCta() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY;
      const viewportH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      const nearBottom = scrolled + viewportH > docH - 600;
      setVisible(scrolled > viewportH * 0.6 && !nearBottom);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-3 bg-gradient-to-t from-brand-dark via-brand-dark/95 to-transparent backdrop-blur-sm pointer-events-none"
        >
          <a
            href={`${APP_URL}/onboarding`}
            className="pointer-events-auto flex items-center justify-center gap-2 bg-brand-green text-brand-dark font-bold py-3.5 rounded-xl shadow-lg shadow-brand-green/30 active:scale-95 transition-transform"
          >
            {t.hero.cta}
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </a>
          <p className="text-center text-slate-400 text-[11px] mt-2">
            {t.hero.badge1} · {t.hero.badge2}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
