import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_LABELS: Record<string, { number: string; title: string }> = {
  '/': { number: '01', title: 'HOME' },
  '/work': { number: '02', title: 'WORK ARCHIVE' },
  '/services': { number: '03', title: 'SERVICES' },
  '/process': { number: '04', title: 'PROCESS' },
  '/about': { number: '05', title: 'ABOUT STUDIO' },
  '/lab': { number: '06', title: 'LAB EXPERIMENTS' },
  '/notes': { number: '07', title: 'NOTES / DESK' },
  '/start': { number: '08', title: 'START PROJECT' },
  '/contact': { number: '09', title: 'CONTACT' },
  '/archive': { number: '10', title: 'VISUAL ARCHIVE' },
};

export const PageTransition: React.FC = () => {
  const location = useLocation();
  const [transitioning, setTransitioning] = useState(false);
  const [flashWhite, setFlashWhite] = useState(false);
  const [pageInfo, setPageInfo] = useState({ number: '01', title: 'HOME' });

  useEffect(() => {
    // Determine label for current route
    let current = ROUTE_LABELS[location.pathname];
    if (!current) {
      if (location.pathname.startsWith('/work/')) {
        current = { number: 'CASE', title: location.pathname.split('/')[2].toUpperCase() };
      } else if (location.pathname.startsWith('/notes/')) {
        current = { number: 'READ', title: 'ARTICLE' };
      } else {
        current = { number: '404', title: 'UNKNOWN' };
      }
    }
    setPageInfo(current);

    // Trigger photocopy scan transition
    setTransitioning(true);
    setFlashWhite(false);

    // Brief paper-white flash at 480ms
    const flashTimer = setTimeout(() => {
      setFlashWhite(true);
    }, 450);

    const endFlashTimer = setTimeout(() => {
      setFlashWhite(false);
    }, 530);

    // End transition
    const endTransitionTimer = setTimeout(() => {
      setTransitioning(false);
    }, 680);

    return () => {
      clearTimeout(flashTimer);
      clearTimeout(endFlashTimer);
      clearTimeout(endTransitionTimer);
    };
  }, [location.pathname]);

  if (!transitioning) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999990,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: flashWhite ? '#E9E7E0' : 'rgba(11, 11, 11, 0.94)',
        transition: 'background-color 0.08s ease',
      }}
    >
      {/* Traveling Photocopy Scanline */}
      <div
        className="scanline-bar"
        style={{
          animation: 'scanlineTravelAcross 0.65s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        }}
      />

      {/* High-Contrast Page Label Banner */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: flashWhite ? '#111111' : '#E8E6DF',
          opacity: flashWhite ? 0.3 : 1,
          transition: 'opacity 0.08s ease',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: '#EC3D31',
            letterSpacing: '0.2em',
            marginBottom: '8px',
          }}
        >
          {pageInfo.number} // NODE TRANSIT
        </div>

        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 8vw, 96px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          {pageInfo.title}
        </div>
      </div>

      <style>{`
        @keyframes scanlineTravelAcross {
          0% { top: -4px; opacity: 1; }
          100% { top: 100vh; opacity: 0.9; }
        }
      `}</style>
    </div>
  );
};
