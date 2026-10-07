import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { useStudioStore } from './store/useStudioStore';

// Global Shell Components (Eagerly Loaded for Instant Shell)
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Cursor } from './components/Cursor';
import { Preloader } from './components/Preloader';
import { PageTransition } from './components/PageTransition';
import { GridOverlay } from './components/GridOverlay';
import { AsciiEasterEgg } from './components/AsciiEasterEgg';
import { Footer } from './components/Footer';

// Code-Split Lazy Loaded Page Routes (Optimizes Initial JS Bundle from 970kB down to ~140kB)
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Work = lazy(() => import('./pages/Work').then(m => ({ default: m.Work })));
const CaseStudy = lazy(() => import('./pages/CaseStudy').then(m => ({ default: m.CaseStudy })));
const Services = lazy(() => import('./pages/Services').then(m => ({ default: m.Services })));
const Process = lazy(() => import('./pages/Process').then(m => ({ default: m.Process })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Lab = lazy(() => import('./pages/Lab').then(m => ({ default: m.Lab })));
const Notes = lazy(() => import('./pages/Notes').then(m => ({ default: m.Notes })));
const Article = lazy(() => import('./pages/Article').then(m => ({ default: m.Article })));
const Start = lazy(() => import('./pages/Start').then(m => ({ default: m.Start })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Archive = lazy(() => import('./pages/Archive').then(m => ({ default: m.Archive })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

// Minimalist Industrial Route Fallback
function RouteLoadingFallback() {
  return (
    <div
      style={{
        minHeight: '80vh',
        backgroundColor: '#0B0B0B',
        color: '#E8E6DF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        position: 'relative',
      }}
    >
      <div style={{ width: '220px', marginBottom: '16px' }}>
        <div className="route-loader-bar" />
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: '#C7FF32',
          letterSpacing: '0.15em',
        }}
      >
        // ALLOCATING ROUTE BUFFER...
      </div>
    </div>
  );
}

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const { menuOpen } = useStudioStore();
  const is404 = location.pathname === '/404';

  // Lenis smooth scroll calibration (responsive & quick lerp ~ 0.12)
  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
    });

    if (menuOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [menuOpen]);

  return (
    <>
      <ScrollToTop />

      {/* Global Grain Texture Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Fast Preloader (0.6s) */}
      <Preloader />

      {/* Custom Desktop Cursor */}
      <Cursor />

      {/* Photocopy Route Transition Flash */}
      <PageTransition />

      {/* 12-Column Grid [G] Overlay */}
      <GridOverlay />

      {/* 'NOISE' 5s ASCII Glitch Easter Egg */}
      <AsciiEasterEgg />

      {/* Global Interface Header */}
      <Header />

      {/* Fullscreen Pasteboard Menu */}
      <Menu />

      {/* Main Routed Content with Code-Splitting Suspense */}
      <main id="main-content">
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/services" element={<Services />} />
            <Route path="/process" element={<Process />} />
            <Route path="/about" element={<About />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:slug" element={<Article />} />
            <Route path="/start" element={<Start />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {/* Global Footer (Suppressed on 404) */}
      {!is404 && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
