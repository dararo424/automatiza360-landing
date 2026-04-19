import { useEffect, useState } from 'react';
import { I18nProvider } from './hooks/useI18n';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SocialProof } from './components/SocialProof';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { Industries } from './components/Industries';
import { Pricing } from './components/Pricing';
import { BusinessAnalyzer } from './components/BusinessAnalyzer';
import { Competitors } from './components/Competitors';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { BeforeAfter } from './components/BeforeAfter';
import { Footer } from './components/Footer';
import { TerminosPage } from './pages/TerminosPage';
import { PrivacidadPage } from './pages/PrivacidadPage';
import { CookieBanner } from './components/CookieBanner';

type Page = 'home' | 'terminos' | 'privacidad';

function getPageFromHash(): Page {
  const h = window.location.hash;
  if (h === '#/terminos') return 'terminos';
  if (h === '#/privacidad') return 'privacidad';
  return 'home';
}

export default function App() {
  const [page, setPage] = useState<Page>(getPageFromHash);

  useEffect(() => {
    const onHash = () => setPage(getPageFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  function navigate(p: Page) {
    window.location.hash = p === 'home' ? '' : `/${p}`;
    window.scrollTo(0, 0);
  }

  if (page === 'terminos') return <I18nProvider><TerminosPage onBack={() => navigate('home')} /><CookieBanner /></I18nProvider>;
  if (page === 'privacidad') return <I18nProvider><PrivacidadPage onBack={() => navigate('home')} /><CookieBanner /></I18nProvider>;

  return (
    <I18nProvider>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <HowItWorks />
        <BeforeAfter />
        <Features />
        <Industries />
        <BusinessAnalyzer />
        <Pricing />
        <Competitors />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer onNavigate={navigate} />
      <CookieBanner />
    </I18nProvider>
  );
}
