import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudioStore } from '../store/useStudioStore';
import { servicesData, fitCriteria } from '../data/services';
import { NoiseImage } from '../components/NoiseImage';

export const Services: React.FC = () => {
  const { setCursor } = useStudioStore();
  const [hoveredService, setHoveredService] = useState<number>(0);

  return (
    <div
      className="theme-light"
      style={{
        backgroundColor: '#E9E7E0',
        color: '#111111',
        minHeight: '100vh',
        paddingTop: '110px',
      }}
    >
      {/* Services Hero Header */}
      <section style={{ padding: 'clamp(30px, 5vw, 60px) var(--pad-section-x) 32px var(--pad-section-x)', maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#3155FF', letterSpacing: '0.15em', marginBottom: '16px' }}>
          // TOOLBOX & UTILITY
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px, 10vw, 175px)',
            fontWeight: 900,
            lineHeight: 0.88,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          THINGS <br />
          WE'RE <br />
          USEFUL FOR.
        </h1>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.8vw, 24px)', maxWidth: '720px', marginTop: '28px', lineHeight: 1.5, color: '#333' }}>
          We don't hand the design off to somebody else to figure out. We design directly in code and think through every interaction from discovery through deployment.
        </p>
      </section>

      {/* 6 Viewport Interactive Services Section */}
      <section
        style={{
          borderTop: '1px solid rgba(17, 17, 17, 0.15)',
          borderBottom: '1px solid rgba(17, 17, 17, 0.15)',
          maxWidth: '1600px',
          margin: '0 auto',
        }}
      >
        {servicesData.map((service, idx) => {
          const isSelected = hoveredService === idx;

          return (
            <div
              key={service.number}
              onClick={() => setHoveredService(idx)}
              onMouseEnter={() => {
                setHoveredService(idx);
                setCursor('open');
              }}
              onMouseLeave={() => setCursor('default')}
              style={{
                borderBottom: '1px solid rgba(17, 17, 17, 0.15)',
                padding: 'clamp(28px, 4vw, 48px) var(--pad-section-x)',
                backgroundColor: isSelected ? 'rgba(49, 85, 255, 0.05)' : 'transparent',
                transition: 'background-color 0.2s ease',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(50px, 80px) minmax(280px, 1.5fr) minmax(300px, 1.5fr)',
                  gap: '32px',
                  alignItems: 'flex-start',
                }}
                className="services-grid-row"
              >
                {/* Number */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: isSelected ? '#3155FF' : '#777',
                  }}
                >
                  {service.number}
                </div>

                {/* Title */}
                <div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(32px, 4.5vw, 68px)',
                      fontWeight: 900,
                      lineHeight: 0.95,
                      textTransform: 'uppercase',
                      color: isSelected ? '#3155FF' : '#111',
                      fontVariationSettings: isSelected ? '"wdth" 170, "wght" 900' : '"wdth" 80, "wght" 700',
                      transition: 'all 0.25s ease',
                      margin: 0,
                    }}
                  >
                    {service.title}
                  </h2>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: '#444', marginTop: '16px', lineHeight: 1.5 }}>
                    {service.summary}
                  </p>
                </div>

                {/* Deliverables & Stack */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#777', letterSpacing: '0.1em', marginBottom: '8px' }}>
                      // CAPABILITIES
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#222', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {service.deliverables.map((item, dIdx) => (
                        <li key={dIdx}>→ {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#777', letterSpacing: '0.1em', marginBottom: '8px' }}>
                      // TECHNOLOGIES
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {service.stack.map((item, sIdx) => (
                        <span key={sIdx} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', background: '#111', color: '#E9E7E0', padding: '3px 8px' }}>
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Small Hover Preview Visual */}
                    {isSelected && (
                      <div style={{ marginTop: '16px', height: '110px', border: '1px solid #111', overflow: 'hidden' }}>
                        <NoiseImage
                          src={service.previewImage}
                          alt={service.title}
                          fallbackTitle={service.title}
                          accentColor="#3155FF"
                          grayscaleByDefault={false}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* GOOD FIT / BAD FIT Matrix */}
      <section style={{ maxWidth: '1600px', margin: '0 auto', padding: 'var(--pad-section-y) var(--pad-section-x)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#3155FF', letterSpacing: '0.15em', marginBottom: '16px' }}>
          // QUALIFICATION CHECK
        </div>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5.5vw, 84px)', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 clamp(28px, 5vw, 48px) 0' }}>
          ARE WE A GOOD FIT?
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(24px, 4vw, 48px)' }}>
          {/* GOOD FIT */}
          <div style={{ border: '2px solid #111', padding: 'clamp(24px, 4vw, 40px)', backgroundColor: '#fff', boxShadow: '8px 8px 0px #3155FF' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, color: '#3155FF', letterSpacing: '0.1em', marginBottom: '20px' }}>
              ✓ GOOD FIT IF:
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.4vw, 18px)', color: '#222', lineHeight: 1.45 }}>
              {fitCriteria.goodFit.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
                  <span style={{ color: '#3155FF', fontWeight: 700 }}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* BAD FIT */}
          <div style={{ border: '2px solid #111', padding: 'clamp(24px, 4vw, 40px)', backgroundColor: '#fff', boxShadow: '8px 8px 0px #EC3D31' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, color: '#EC3D31', letterSpacing: '0.1em', marginBottom: '20px' }}>
              ✕ BAD FIT IF:
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.4vw, 18px)', color: '#222', lineHeight: 1.45 }}>
              {fitCriteria.badFit.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
                  <span style={{ color: '#EC3D31', fontWeight: 700 }}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        <div style={{ marginTop: 'clamp(40px, 6vw, 80px)', textAlign: 'center' }}>
          <Link to="/start" className="btn-raw-solid" style={{ backgroundColor: '#111', color: '#E9E7E0' }} onMouseEnter={() => setCursor('start')} onMouseLeave={() => setCursor('default')}>
            LET'S DISCUSS YOUR PROJECT ↗
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .services-grid-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};
