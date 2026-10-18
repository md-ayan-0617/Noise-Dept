import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStudioStore } from '../store/useStudioStore';
import { NoiseImage } from './NoiseImage';

interface MenuItem {
  number: string;
  label: string;
  path: string;
  previewUrl: string;
  previewTag: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    number: '01',
    label: 'WORK',
    path: '/work',
    previewUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop',
    previewTag: 'ARCHIVE // 18 RELEASES',
  },
  {
    number: '02',
    label: 'SERVICES',
    path: '/services',
    previewUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop',
    previewTag: 'TOOLBOX // 6 CAPABILITIES',
  },
  {
    number: '03',
    label: 'PROCESS',
    path: '/process',
    previewUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop',
    previewTag: 'MESS → SYSTEM → PRODUCT',
  },
  {
    number: '04',
    label: 'ABOUT',
    path: '/about',
    previewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    previewTag: 'STUDIO PROFILE // DIRECT FLASH',
  },
  {
    number: '05',
    label: 'LAB',
    path: '/lab',
    previewUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    previewTag: 'EXPERIMENTS // NO RULES',
  },
  {
    number: '06',
    label: 'NOTES',
    path: '/notes',
    previewUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop',
    previewTag: 'PUBLIC DISPATCHES',
  },
  {
    number: '07',
    label: 'CONTACT',
    path: '/contact',
    previewUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop',
    previewTag: 'DIRECT FREQUENCY',
  },
  {
    number: '08',
    label: 'START',
    path: '/start',
    previewUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    previewTag: 'BRIEF GENERATOR',
  },
];

export const Menu: React.FC = () => {
  const { menuOpen, setMenuOpen, setCursor } = useStudioStore();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<MenuItem>(MENU_ITEMS[0]);
  const [currentTime, setCurrentTime] = useState('');

  // Close menu on route change
  useEffect(() => {
    if (menuOpen) setMenuOpen(false);
  }, [location.pathname]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, setMenuOpen]);

  // Live London / UTC Clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!menuOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Studio Navigation Menu"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        maxWidth: '100vw',
        height: '100vh',
        backgroundColor: '#E9E7E0',
        color: '#111111',
        zIndex: 99998,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'menuReveal 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Background visible publishing grid lines */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage:
            'linear-gradient(to right, rgba(17, 17, 17, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(17, 17, 17, 0.05) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />

      {/* Top Bar / Header in Menu */}
      <div
        style={{
          padding: 'clamp(14px, 2vw, 20px) clamp(16px, 2.5vw, 28px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(17, 17, 17, 0.12)',
          zIndex: 10,
        }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em' }}>
          NOISE DEPT. // PASTEBOARD DIRECTORY
        </div>

        <button
          onClick={() => setMenuOpen(false)}
          style={{
            background: '#111111',
            color: '#E9E7E0',
            border: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 700,
            padding: '8px 16px',
            cursor: 'pointer',
            letterSpacing: '0.08em',
          }}
          onMouseEnter={() => setCursor('default', 'CLOSE')}
          onMouseLeave={() => setCursor('default')}
          aria-label="Close Navigation Menu"
        >
          [ ESC / CLOSE ✕ ]
        </button>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(320px, 0.8fr)',
          overflow: 'hidden',
          zIndex: 10,
        }}
        className="menu-grid"
      >
        {/* Left Side: Large Nav Links */}
        <div
          className="menu-links-container"
          style={{
            padding: 'clamp(16px, 2vw, 20px) clamp(20px, 3.5vw, 40px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflowY: 'auto',
            gap: '6px',
          }}
        >
          {MENU_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            const isHovered = activeItem.path === item.path;

            return (
              <Link
                key={item.number}
                to={item.path}
                onMouseEnter={() => {
                  setActiveItem(item);
                  setCursor('open');
                }}
                onMouseLeave={() => setCursor('default')}
                style={{
                  textDecoration: 'none',
                  color: isHovered ? '#EC3D31' : '#111111',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 'clamp(12px, 2vw, 20px)',
                  transition: 'color 0.15s ease',
                  padding: '4px 0',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: '#666',
                    letterSpacing: '0.08em',
                  }}
                >
                  {item.number}
                </span>

                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(26px, 4.8vw, 72px)',
                    lineHeight: 1,
                    textTransform: 'uppercase',
                    fontVariationSettings: isHovered ? '"wdth" 220, "wght" 900' : '"wdth" 60, "wght" 700',
                    transition: 'font-variation-settings 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {item.label}
                </span>

                {isActive && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      backgroundColor: '#111',
                      color: '#E9E7E0',
                      padding: '2px 6px',
                    }}
                  >
                    CURRENT
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Side: Live Status Panel & Hover Visual Preview */}
        <div
          className="menu-right-panel"
          style={{
            borderLeft: '1px solid rgba(17, 17, 17, 0.15)',
            backgroundColor: 'rgba(233, 231, 224, 0.7)',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          {/* Active Link Preview Frame */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: '#777',
                letterSpacing: '0.12em',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>PREVIEW CHANNEL</span>
              <span style={{ color: '#EC3D31' }}>{activeItem.previewTag}</span>
            </div>

            <div
              style={{
                width: '100%',
                height: '220px',
                border: '1px solid #111111',
                backgroundColor: '#111',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <NoiseImage
                src={activeItem.previewUrl}
                alt={activeItem.label}
                fallbackTitle={activeItem.label}
                fallbackSubtitle={activeItem.previewTag}
                accentColor="#EC3D31"
                grayscaleByDefault={false}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>

          {/* Live Studio Metadata Panel */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              borderTop: '1px solid rgba(17, 17, 17, 0.15)',
              paddingTop: '18px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
            }}
          >
            <div>
              <div style={{ color: '#888', letterSpacing: '0.1em' }}>CURRENT STATUS</div>
              <div style={{ fontWeight: 700, color: '#111', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', background: '#EC3D31', display: 'inline-block' }} />
                AVAILABLE / WORLDWIDE DEPLOYMENT
              </div>
            </div>

            <div>
              <div style={{ color: '#888', letterSpacing: '0.1em' }}>LOCATION</div>
              <div style={{ fontWeight: 700, color: '#111' }}>BERLIN / LONDON / REMOTE</div>
            </div>

            <div>
              <div style={{ color: '#888', letterSpacing: '0.1em' }}>LOCAL TIME</div>
              <div style={{ fontWeight: 700, color: '#111', fontSize: '13px' }}>{currentTime || '20:41:09'} GMT+1</div>
            </div>

            <div>
              <div style={{ color: '#888', letterSpacing: '0.1em' }}>LAST ENGINE SYNC</div>
              <div style={{ fontWeight: 700, color: '#111' }}>07 OCT 2026 // BUILD 4.9.1</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes menuReveal {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          .menu-grid {
            grid-template-columns: 1fr !important;
          }
          .menu-right-panel {
            display: none !important;
          }
          .menu-links-container {
            padding: 16px 20px !important;
          }
        }
      `}</style>
    </div>
  );
};
