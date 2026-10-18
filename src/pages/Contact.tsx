import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudioStore } from '../store/useStudioStore';

export const Contact: React.FC = () => {
  const { setCursor } = useStudioStore();
  const [copied, setCopied] = useState(false);
  const email = 'hello@noisedept.studio';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div style={{ backgroundColor: '#0B0B0B', color: '#E8E6DF', minHeight: '100vh', paddingTop: '110px' }}>
      <section style={{ maxWidth: '1600px', margin: '0 auto', padding: 'clamp(36px, 5vw, 60px) var(--pad-section-x) clamp(60px, 12vw, 140px) var(--pad-section-x)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#EC3D31', letterSpacing: '0.15em', marginBottom: '16px' }}>
          // DIRECT DISPATCH
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--type-hero)',
            fontWeight: 900,
            lineHeight: 0.85,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            margin: '0 0 clamp(32px, 5vw, 64px) 0',
          }}
        >
          DON'T <br />
          OVERTHINK <br />
          IT.
        </h1>

        {/* Big Interactive Email Row */}
        <div
          style={{
            borderTop: '1px solid rgba(232, 230, 223, 0.15)',
            borderBottom: '1px solid rgba(232, 230, 223, 0.15)',
            padding: 'clamp(28px, 4vw, 48px) 0',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div style={{ maxWidth: '100%' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#777', letterSpacing: '0.1em', marginBottom: '8px' }}>
              PRIMARY ELECTRONIC MAIL
            </div>
            <a
              href={`mailto:${email}`}
              style={{
                textDecoration: 'none',
                color: '#E8E6DF',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 5.2vw, 84px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                transition: 'color 0.2s ease',
                wordBreak: 'break-all',
                display: 'inline-block',
                maxWidth: '100%',
              }}
              onMouseEnter={(e) => {
                setCursor('out');
                e.currentTarget.style.color = '#C7FF32';
              }}
              onMouseLeave={(e) => {
                setCursor('default');
                e.currentTarget.style.color = '#E8E6DF';
              }}
            >
              {email}
            </a>
          </div>

          <button
            onClick={handleCopyEmail}
            className="btn-raw-solid"
            style={{
              backgroundColor: copied ? '#C7FF32' : '#E8E6DF',
              color: '#0B0B0B',
              borderColor: copied ? '#C7FF32' : '#E8E6DF',
            }}
          >
            {copied ? '✓ COPIED TO CLIPBOARD' : '[ COPY EMAIL ADDRESS ]'}
          </button>
        </div>

        {/* Contact Info & Coordinates */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: 'clamp(24px, 3.5vw, 40px)',
            marginTop: 'clamp(36px, 5vw, 64px)',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
          }}
        >
          <div>
            <div style={{ color: '#777', marginBottom: '12px', letterSpacing: '0.1em' }}>// PROJECT INQUIRIES</div>
            <p style={{ color: '#ccc', lineHeight: 1.6 }}>
              Prefer a structured questionnaire with scope and budget options?
            </p>
            <div style={{ marginTop: '16px' }}>
              <Link to="/start" style={{ color: '#C7FF32', textDecoration: 'none', fontWeight: 700 }}>
                OPEN BRIEF GENERATOR →
              </Link>
            </div>
          </div>

          <div>
            <div style={{ color: '#777', marginBottom: '12px', letterSpacing: '0.1em' }}>// LOCATION & AVAILABILITY</div>
            <p style={{ color: '#ccc', lineHeight: 1.6 }}>
              HQ: London / Berlin / Worldwide Remote. <br />
              Booking Q4 2026 & Q1 2027 design sprints.
            </p>
          </div>

          <div>
            <div style={{ color: '#777', marginBottom: '12px', letterSpacing: '0.1em' }}>// NETWORK CHANNELS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#E8E6DF', textDecoration: 'none' }}>Instagram // @noisedept ↗</a>
              <a href="https://are.na" target="_blank" rel="noopener noreferrer" style={{ color: '#E8E6DF', textDecoration: 'none' }}>Are.na // noise-dept-channel ↗</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: '#E8E6DF', textDecoration: 'none' }}>GitHub // noise-dept-code ↗</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
