import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudioStore } from '../store/useStudioStore';
import { processStepsData, processTimeline } from '../data/process';
import { NoiseImage } from '../components/NoiseImage';

export const Process: React.FC = () => {
  const { setCursor } = useStudioStore();
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  return (
    <div
      style={{
        backgroundColor: '#E9E7E0',
        color: '#111111',
        minHeight: '100vh',
        paddingTop: '110px',
      }}
      className="theme-light"
    >
      {/* Process Hero */}
      <section style={{ padding: 'clamp(36px, 5vw, 60px) var(--pad-section-x)', maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#EC3D31', letterSpacing: '0.15em', marginBottom: '16px' }}>
          // WORKING PROCESS
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--type-hero)',
            fontWeight: 900,
            lineHeight: 0.9,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          MESS → <br />
          SYSTEM → <br />
          PRODUCT.
        </h1>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(17px, 1.8vw, 24px)', maxWidth: '780px', marginTop: 'clamp(20px, 3vw, 36px)', lineHeight: 1.5, color: '#333' }}>
          Real creative work does not happen in a sterile vacuum. It begins with fragmented post-its, imperfect sketches, and raw debates before snapping into a disciplined technical architecture.
        </p>
      </section>

      {/* 8-Step Interactive Vertical Timeline */}
      <section style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 var(--pad-section-x) clamp(60px, 8vw, 100px) var(--pad-section-x)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 3vw, 32px)' }}>
          {processStepsData.map((step, idx) => {
            const isCurrent = activeStepIdx === idx;

            return (
              <div
                key={step.number}
                onClick={() => setActiveStepIdx(idx)}
                style={{
                  border: '2px solid #111',
                  backgroundColor: isCurrent ? '#fff' : 'rgba(255,255,255,0.4)',
                  padding: 'clamp(20px, 3.5vw, 36px)',
                  boxShadow: isCurrent ? 'clamp(6px, 1.2vw, 12px) clamp(6px, 1.2vw, 12px) 0px #EC3D31' : 'clamp(3px, 0.8vw, 6px) clamp(3px, 0.8vw, 6px) 0px #111',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setCursor('default')}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(48px, 90px) minmax(260px, 1fr) minmax(280px, 1.2fr)',
                    gap: 'clamp(16px, 2.5vw, 32px)',
                    alignItems: 'center',
                  }}
                  className="process-card-grid"
                >
                  {/* Sticky Step Number */}
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'clamp(28px, 4vw, 54px)',
                      fontWeight: 900,
                      color: isCurrent ? '#EC3D31' : '#777',
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Title & Human Presence Note */}
                  <div>
                    <h2
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(26px, 3.5vw, 64px)',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        margin: 0,
                        color: isCurrent ? '#111' : '#444',
                        fontVariationSettings: isCurrent ? '"wdth" 160, "wght" 900' : '"wdth" 70, "wght" 700',
                      }}
                    >
                      {step.title}
                    </h2>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#EC3D31', fontWeight: 700, marginTop: '8px' }}>
                      {step.tagline}
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#333', marginTop: '12px', lineHeight: 1.5 }}>
                      {step.description}
                    </p>

                    <div style={{ marginTop: '16px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#666', borderLeft: '2px solid #111', paddingLeft: '10px' }}>
                      <strong>DELIVERABLE:</strong> {step.output}
                    </div>
                  </div>

                  {/* Human Photograph with Noise & Crop */}
                  <div
                    style={{
                      height: 'clamp(200px, 32vw, 280px)',
                      border: '1px solid #111',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <NoiseImage
                      src={step.image}
                      alt={step.title}
                      fallbackTitle={step.title}
                      fallbackSubtitle={step.humanPresence}
                      accentColor="#EC3D31"
                      grayscaleByDefault={!isCurrent}
                      style={{ width: '100%', height: '100%' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '8px',
                        backgroundColor: '#111',
                        color: '#E9E7E0',
                        padding: '2px 8px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                      }}
                    >
                      {step.humanPresence}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Illustrative Schedule Timeline Table */}
      <section style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 var(--pad-section-x) clamp(60px, 10vw, 120px) var(--pad-section-x)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#EC3D31', letterSpacing: '0.15em', marginBottom: '16px' }}>
          // ILLUSTRATIVE ENGAGEMENT TIMELINE
        </div>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-section)', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 clamp(20px, 3vw, 32px) 0' }}>
          TYPICAL 9-WEEK CADENCE
        </h2>

        <div style={{ border: '2px solid #111', backgroundColor: '#fff' }}>
          {processTimeline.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(120px, 180px) minmax(160px, 240px) 1fr',
                padding: 'clamp(14px, 2vw, 20px) clamp(14px, 2.5vw, 24px)',
                borderBottom: idx === processTimeline.length - 1 ? 'none' : '1px solid rgba(17,17,17,0.12)',
                alignItems: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
              }}
              className="timeline-row"
            >
              <div style={{ fontWeight: 700, color: '#EC3D31' }}>{item.week}</div>
              <div style={{ fontWeight: 700, color: '#111' }}>{item.phase}</div>
              <div style={{ color: '#555' }}>{item.notes}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '24px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#666' }}>
          * TIMING VARIES BASED ON SCOPE COMPLEXITY AND HEADLESS CMS DEPENDENCIES.
        </div>

        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <Link
            to="/start"
            className="btn-raw-solid"
            style={{ backgroundColor: '#111', color: '#E9E7E0' }}
            onMouseEnter={() => setCursor('start')}
            onMouseLeave={() => setCursor('default')}
          >
            START YOUR 9-WEEK SPRINT ↗
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .process-card-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .timeline-row {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </div>
  );
};
