import { useEffect } from 'react';
import Lenis from 'lenis';
import { LanguageProvider } from './context/LanguageContext';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  useEffect(() => {
    // Highly optimized smooth scroll with natural deceleration
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Smooth anchor navigation with sticky nav offset
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        if (href === '#' || href === '#top') {
          lenis.scrollTo(0, { duration: 1.1 });
        } else {
          const el = document.querySelector(href);
          if (el) {
            lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.1 });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis.destroy();
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-200 selection:text-slate-900 font-sans">
        <Nav />
        <main id="main-content">
          <Hero />
          <About />
          <Work />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
