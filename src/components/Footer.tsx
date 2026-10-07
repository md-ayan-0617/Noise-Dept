import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useStudioStore } from '../store/useStudioStore';

export const Footer: React.FC = () => {
  const { setCursor } = useStudioStore();
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll linked font width on huge footer wordmark
  useEffect(() => {
    const handleScroll = () => {
      if (!wordmarkRef.current) return;
      const rect = wordmarkRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
      const targetWdth = Math.floor(40 + progress * 240);
      wordmarkRef.current.style.fontVariationSettings = `"wdth" ${targetWdth}, "wght" 900`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#0B0B0B',
        color: '#E8E6DF',
        borderTop: '1px solid rgba(232, 230, 223, 0.15)',
        position: 'relative',
        zIndex: 50,
        overflow: 'hidden',
      }}
    >
      {/* Marquee Banner */}
      <div
        style={{
          borderBottom: '1px solid rgba(232, 230, 223, 0.12)',
          padding: '12px 0',
          overflow: 'hidden',
          backgroundColor: '#111',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: '#C7FF32',
          letterSpacing: '0.15em',
        }}
      >
        <div className="marquee-inner">
          <span style={{ paddingRight: '40px' }}>AVAILABLE FOR SELECT PROJECTS // Q4 2026 // NO TEMPLATES // CODE IS A DESIGN MATERIAL // WE MAKE DIGITAL THINGS THAT REFUSE TO BLEND IN //</span>
          <span style={{ paddingRight: '40px' }}>AVAILABLE FOR SELECT PROJECTS // Q4 2026 // NO TEMPLATES // CODE IS A DESIGN MATERIAL // WE MAKE DIGITAL THINGS THAT REFUSE TO BLEND IN //</span>
        </div>
      </div>

      {/* Main Footer Container */}
      <div style={{ padding: '60px 32px 32px 32px', maxWidth: '1600px', margin: '0 auto' }}>
        {/* Top Call to Action */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '32px',
            marginBottom: '64px',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#777', letterSpacing: '0.1em', marginBottom: '8px' }}>
              HAVE A PROJECT?
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 5vw, 64px)',
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              GOOD. LET’S BUILD IT.
            </div>
          </div>

          <Link
            to="/start"
            className="btn-raw-solid"
            style={{
              padding: '16px 36px',
              fontSize: '13px',
              alignSelf: 'center',
            }}
            onMouseEnter={() => setCursor('start')}
            onMouseLeave={() => setCursor('default')}
          >
            START A PROJECT ↗
          </Link>
        </div>

        {/* 5-Column Metadata Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '32px',
            borderTop: '1px solid rgba(232, 230, 223, 0.12)',
            paddingTop: '40px',
            marginBottom: '60px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
          }}
        >
          {/* Navigation */}
          <div>
            <div style={{ color: '#777', marginBottom: '12px', letterSpacing: '0.08em' }}>// NAV</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/work" style={{ color: '#E8E6DF', textDecoration: 'none' }}>Work</Link>
              <Link to="/services" style={{ color: '#E8E6DF', textDecoration: 'none' }}>Services</Link>
              <Link to="/process" style={{ color: '#E8E6DF', textDecoration: 'none' }}>Process</Link>
              <Link to="/about" style={{ color: '#E8E6DF', textDecoration: 'none' }}>About</Link>
              <Link to="/lab" style={{ color: '#E8E6DF', textDecoration: 'none' }}>Lab Experiments</Link>
              <Link to="/notes" style={{ color: '#E8E6DF', textDecoration: 'none' }}>Notes</Link>
              <Link to="/archive" style={{ color: '#E8E6DF', textDecoration: 'none' }}>Visual Archive</Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <div style={{ color: '#777', marginBottom: '12px', letterSpacing: '0.08em' }}>// TRANSMISSIONS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#E8E6DF', textDecoration: 'none' }}>Instagram ↗</a>
              <a href="https://are.na" target="_blank" rel="noopener noreferrer" style={{ color: '#E8E6DF', textDecoration: 'none' }}>Are.na ↗</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: '#E8E6DF', textDecoration: 'none' }}>GitHub ↗</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#E8E6DF', textDecoration: 'none' }}>LinkedIn ↗</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{ color: '#777', marginBottom: '12px', letterSpacing: '0.08em' }}>// DIRECT</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/contact" style={{ color: '#E8E6DF', textDecoration: 'none' }}>hello@noisedept.studio</Link>
              <span style={{ color: '#888' }}>PGP: 4A89 90DF 12C0</span>
              <span style={{ color: '#888' }}>SIGNAL: ON REQUEST</span>
            </div>
          </div>

          {/* Studio Telemetry */}
          <div>
            <div style={{ color: '#777', marginBottom: '12px', letterSpacing: '0.08em' }}>// TELEMETRY</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ color: '#C7FF32' }}>SYS: ONLINE</span>
              <span>TIME: {localTime || '20:41:09'} GMT+1</span>
              <span>GEO: 51.5074° N, 0.1278° W</span>
              <span>STACK: REACT 19 / GSAP / THREE.JS</span>
            </div>
          </div>
        </div>

        {/* Massive Scroll-Linked Wordmark: NOISE DEPT. */}
        <div
          ref={wordmarkRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 15vw, 240px)',
            fontWeight: 900,
            lineHeight: 0.85,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            margin: '40px 0 20px 0',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            color: '#E8E6DF',
            transition: 'font-variation-settings 0.15s ease-out',
          }}
        >
          NOISE DEPT.
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            borderTop: '1px solid rgba(232, 230, 223, 0.12)',
            paddingTop: '24px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#777',
          }}
        >
          <div>
            © NOISE DEPT. 2026. ALL RIGHTS RESERVED. NO COOKIES UNLESS WE ACTUALLY NEED THEM.
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/start" style={{ color: '#777', textDecoration: 'none' }}>BRIEF</Link>
            <Link to="/about" style={{ color: '#777', textDecoration: 'none' }}>ACCESSIBILITY</Link>
            <button
              onClick={scrollToTop}
              style={{
                background: 'none',
                border: 'none',
                color: '#C7FF32',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              [ BACK TO TOP ↑ ]
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
