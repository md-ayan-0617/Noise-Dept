import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStudioStore } from '../store/useStudioStore';

export const Header: React.FC = () => {
  const { toggleMenu, menuOpen, setCursor } = useStudioStore();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Fast downward scroll collapse
      if (currentScrollY > 180 && currentScrollY - lastScrollY.current > 14) {
        setIsCollapsed(true);
      } else if (lastScrollY.current - currentScrollY > 10) {
        setIsCollapsed(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Accessible Skip Link */}
      <a href="#main-content" className="skip-link">
        [ SKIP TO MAIN CONTENT ]
      </a>

      <header
        className="studio-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 9999,
          padding: isCollapsed ? '12px 24px' : '20px 32px',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'padding 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, border-color 0.25s ease',
          backgroundColor: isScrolled ? 'rgba(11, 11, 11, 0.92)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(232, 230, 223, 0.12)' : '1px solid transparent',
          color: '#E8E6DF',
        }}
      >
        {/* Left: Brand Identity */}
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}
          onMouseEnter={() => setCursor('default')}
          aria-label="Noise Dept. Homepage"
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: isCollapsed ? '16px' : '20px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              transition: 'font-size 0.2s ease',
            }}
          >
            {isCollapsed ? 'NOISE' : 'NOISE DEPT.'}
          </span>
          {!isCollapsed && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: '#777777',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              DESIGN + DEVELOPMENT
            </span>
          )}
        </Link>

        {/* Center: Live Availability Tag (Desktop Only) */}
        {!isCollapsed && (
          <div
            className="desktop-only"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#E8E6DF',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                backgroundColor: '#C7FF32',
                boxShadow: '0 0 8px #C7FF32',
              }}
            />
            <span>CURRENTLY AVAILABLE / Q4 2026</span>
          </div>
        )}

        {/* Right: Direct Navigation & Menu Toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isCollapsed ? '16px' : '24px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
          }}
        >
          {!isCollapsed && (
            <>
              <Link
                to="/work"
                className="desktop-only"
                style={{
                  textDecoration: 'none',
                  color: location.pathname.startsWith('/work') ? '#C7FF32' : 'inherit',
                  letterSpacing: '0.06em',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={() => setCursor('open')}
                onMouseLeave={() => setCursor('default')}
              >
                WORK
              </Link>

              <Link
                to="/about"
                className="desktop-only"
                style={{
                  textDecoration: 'none',
                  color: location.pathname === '/about' ? '#C7FF32' : 'inherit',
                  letterSpacing: '0.06em',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={() => setCursor('default')}
              >
                INFO
              </Link>

              <Link
                to="/start"
                className="desktop-only"
                style={{
                  textDecoration: 'none',
                  color: '#0B0B0B',
                  backgroundColor: '#C7FF32',
                  padding: '6px 12px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  transition: 'transform 0.15s ease, background-color 0.15s ease',
                }}
                onMouseEnter={() => setCursor('start')}
                onMouseLeave={() => setCursor('default')}
              >
                START PROJECT ↗
              </Link>
            </>
          )}

          {/* Menu Trigger Button */}
          <button
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={menuOpen}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'inherit',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              padding: '6px 10px',
              borderLeft: '1px solid rgba(232, 230, 223, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onMouseEnter={() => setCursor('default', 'MENU')}
            onMouseLeave={() => setCursor('default')}
          >
            {menuOpen ? '[ CLOSE ]' : '[ MENU + ]'}
          </button>
        </div>

        <style>{`
          @media (max-width: 820px) {
            .desktop-only {
              display: none !important;
            }
            .studio-header {
              padding: 14px 18px !important;
            }
          }
        `}</style>
      </header>
    </>
  );
};
