import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useStudioStore } from '../store/useStudioStore';
import { projectsData } from '../data/projects';
import { NoiseImage } from '../components/NoiseImage';

export const CaseStudy: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { setCursor } = useStudioStore();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [audioSimulating, setAudioSimulating] = useState(false);

  const project = projectsData.find((p) => p.slug === slug);
  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const nextProject = projectsData.find((p) => p.slug === project.nextSlug) || projectsData[0];

  const handleTouchSlider = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!e.touches[0]) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(100, ((e.touches[0].clientX - rect.left) / rect.width) * 100));
    setSliderPosition(pos);
  };

  const handleKeyDownSlider = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div style={{ backgroundColor: '#0B0B0B', color: '#E8E6DF', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* =====================================================
          CASE HERO (Themed with Project Accent Color)
          ===================================================== */}
      <section
        style={{
          backgroundColor: project.accentColor,
          color: '#0B0B0B',
          padding: 'var(--pad-hero-top) var(--pad-section-x) 40px var(--pad-section-x)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          {/* Top metadata tags */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px 24px',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              marginBottom: '24px',
              borderBottom: '1px solid rgba(11, 11, 11, 0.25)',
              paddingBottom: '16px',
            }}
          >
            <span>{project.index} // CASE ARCHIVE</span>
            <span>{project.category.toUpperCase()}</span>
            <span>YEAR: {project.year}</span>
            <span>CLIENT: {project.client.toUpperCase()}</span>
          </div>

          {/* Huge Project Title */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(44px, 10vw, 175px)',
              fontWeight: 900,
              lineHeight: 0.85,
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
              margin: '20px 0 32px 0',
            }}
          >
            {project.title}
          </h1>

          {/* Services tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '36px' }}>
            {project.services.map((srv, idx) => (
              <span
                key={idx}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: '#0B0B0B',
                  color: project.accentColor,
                  padding: '6px 14px',
                }}
              >
                {srv}
              </span>
            ))}
          </div>

          {/* Hero Visual Capture */}
          <div
            className="case-hero-cover"
            style={{
              border: '3px solid #0B0B0B',
              backgroundColor: '#111',
              boxShadow: '16px 16px 0px #0B0B0B',
              overflow: 'hidden',
              position: 'relative',
              height: 'clamp(260px, 46vw, 620px)',
            }}
            onMouseEnter={() => setCursor('view')}
            onMouseLeave={() => setCursor('default')}
          >
            <NoiseImage
              src={project.coverImage}
              alt={project.title}
              fallbackTitle={project.title}
              fallbackSubtitle={project.category}
              accentColor={project.accentColor}
              grayscaleByDefault={false}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          CASE INTRO: THE PROBLEM & METRICS (Two-Column)
          ===================================================== */}
      <section style={{ maxWidth: '1600px', margin: '0 auto', padding: 'var(--pad-section-y) var(--pad-section-x)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(240px, 1fr) minmax(320px, 2fr)',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'flex-start',
            borderBottom: '1px solid rgba(232, 230, 223, 0.15)',
            paddingBottom: 'clamp(40px, 6vw, 80px)',
          }}
          className="case-intro-grid"
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: project.accentColor, letterSpacing: '0.15em', marginBottom: '8px' }}>
              // CONTEXT
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 800, margin: 0, textTransform: 'uppercase' }}>
              THE PROBLEM.
            </h2>
          </div>

          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.8vw, 24px)', lineHeight: 1.5, color: '#E8E6DF' }}>
              {project.challenge}
            </p>

            <div style={{ marginTop: '32px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: project.accentColor, letterSpacing: '0.15em', marginBottom: '8px' }}>
                // ARCHITECTURAL SOLUTION
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.4vw, 18px)', lineHeight: 1.6, color: '#999' }}>
                {project.solution}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Key Project Metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
            gap: '28px',
            paddingTop: 'clamp(32px, 5vw, 60px)',
          }}
        >
          {project.metrics.map((m, idx) => (
            <div
              key={idx}
              style={{
                borderLeft: `2px solid ${project.accentColor}`,
                paddingLeft: '16px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <div style={{ fontSize: '11px', color: '#777', letterSpacing: '0.1em' }}>{m.label}</div>
              <div style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 700, color: '#E8E6DF', marginTop: '6px' }}>
                {m.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          BEFORE / AFTER INTERACTIVE COMPARISON (Touch & Key Friendly)
          ===================================================== */}
      <section style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 32px 100px 32px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#777', letterSpacing: '0.15em', marginBottom: '16px' }}>
          // INTERACTIVE COMPARISON: DRAG OR TOUCH TO REVEAL TRANSFORMATION
        </div>

        <div
          tabIndex={0}
          role="slider"
          aria-valuenow={Math.round(sliderPosition)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Before and after interface comparison slider"
          onKeyDown={handleKeyDownSlider}
          onTouchMove={handleTouchSlider}
          onTouchStart={handleTouchSlider}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
            setSliderPosition(pos);
          }}
          onMouseEnter={() => setCursor('drag')}
          onMouseLeave={() => setCursor('default')}
          style={{
            position: 'relative',
            height: 'clamp(380px, 50vh, 560px)',
            border: '2px solid rgba(232, 230, 223, 0.2)',
            overflow: 'hidden',
            backgroundColor: '#111',
            userSelect: 'none',
            outline: 'none',
          }}
        >
          {/* AFTER: New noisy radical build (Full width background) */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <NoiseImage
              src={project.secondaryImages[0]}
              alt="New Architecture"
              fallbackTitle="NEW INTERFACE"
              fallbackSubtitle="NOISE DEPT RECONSTRUCTION"
              accentColor={project.accentColor}
              grayscaleByDefault={false}
              style={{ width: '100%', height: '100%' }}
            />
            <div style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: '#0B0B0B', color: '#C7FF32', padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700 }}>
              RECONSTRUCTED (AFTER)
            </div>
          </div>

          {/* BEFORE: Legacy sanitized template (Clipped overlay) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${sliderPosition}%`,
              height: '100%',
              overflow: 'hidden',
              borderRight: `2px solid ${project.accentColor}`,
            }}
          >
            <div style={{ width: '100%', height: '100%', minWidth: '800px', filter: 'grayscale(100%)' }}>
              <NoiseImage
                src={project.secondaryImages[1] || project.coverImage}
                alt="Legacy Template"
                fallbackTitle="LEGACY TEMPLATE"
                fallbackSubtitle="BEFORE TRANSFORMATION"
                accentColor="#777777"
                grayscaleByDefault={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: '#0B0B0B', color: '#fff', padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700 }}>
              LEGACY TEMPLATE (BEFORE)
            </div>
          </div>

          {/* Slider Handle */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: `${sliderPosition}%`,
              transform: 'translate(-50%, -50%)',
              width: '36px',
              height: '36px',
              backgroundColor: project.accentColor,
              color: '#0B0B0B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 900,
              pointerEvents: 'none',
              boxShadow: '0 0 16px rgba(0,0,0,0.8)',
            }}
          >
            ↔
          </div>
        </div>
      </section>

      {/* =====================================================
          CASE TYPOGRAPHY MOMENT
          ===================================================== */}
      <section
        style={{
          backgroundColor: '#111',
          padding: '120px 32px',
          borderTop: '1px solid rgba(232, 230, 223, 0.12)',
          borderBottom: '1px solid rgba(232, 230, 223, 0.12)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 7.5vw, 120px)',
              fontWeight: 900,
              lineHeight: 0.9,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
            }}
          >
            MAKE THE <br />
            <span style={{ color: project.accentColor }}>INTERFACE</span> <br />
            PART OF THE BRAND.
          </div>
        </div>
      </section>

      {/* =====================================================
          FULL-BLEED GALLERY & WIREFRAME CROPS
          ===================================================== */}
      <section style={{ maxWidth: '1600px', margin: '0 auto', padding: 'clamp(40px, 8vw, 100px) var(--pad-section-x)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '28px' }}>
          {project.secondaryImages.map((img, i) => (
            <div
              key={i}
              style={{
                height: i === 0 ? 'clamp(320px, 45vw, 520px)' : 'clamp(260px, 35vw, 400px)',
                border: '1px solid rgba(232, 230, 223, 0.2)',
                backgroundColor: '#151515',
                overflow: 'hidden',
                position: 'relative',
              }}
              onMouseEnter={() => setCursor('view')}
              onMouseLeave={() => setCursor('default')}
            >
              <NoiseImage
                src={img}
                alt={`${project.title} Artifact ${i + 1}`}
                fallbackTitle={`${project.title} // 0${i + 1}`}
                accentColor={project.accentColor}
                grayscaleByDefault={false}
                style={{ width: '100%', height: '100%' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  backgroundColor: '#0B0B0B',
                  color: '#E8E6DF',
                  padding: '3px 8px',
                }}
              >
                SPEC_VIEW // CAPTURE_0{i + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          CODE MOMENT & INTERACTION DEMO
          ===================================================== */}
      <section style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 var(--pad-section-x) clamp(50px, 8vw, 100px) var(--pad-section-x)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(320px, 0.8fr)', gap: '40px' }} className="case-code-grid">
          {/* Real front-end snippet */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: project.accentColor, letterSpacing: '0.15em', marginBottom: '12px' }}>
              // SOURCE CODE EXCERPT
            </div>
            <pre
              style={{
                backgroundColor: '#111',
                border: '1px solid rgba(232, 230, 223, 0.15)',
                padding: 'clamp(16px, 3vw, 24px)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: '#C7FF32',
                overflowX: 'auto',
                lineHeight: 1.5,
              }}
            >
              <code>{project.codeSnippet}</code>
            </pre>
          </div>

          {/* Interactive Simulation Trigger */}
          <div
            style={{
              border: `1px solid ${project.accentColor}`,
              backgroundColor: '#151515',
              padding: 'clamp(20px, 4vw, 32px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: project.accentColor, letterSpacing: '0.15em', marginBottom: '8px' }}>
                // HARDWARE EMULATION
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, margin: 0 }}>
                DISPATCH RUNTIME
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#888', marginTop: '12px', lineHeight: 1.5 }}>
                Simulate the real-time buffer calculation and frequency reactivity configured for this client's production deployment.
              </p>
            </div>

            <div style={{ marginTop: '24px' }}>
              <button
                onClick={() => setAudioSimulating(!audioSimulating)}
                className="btn-raw-solid"
                style={{
                  backgroundColor: audioSimulating ? project.accentColor : '#E8E6DF',
                  color: '#0B0B0B',
                  width: '100%',
                }}
                onMouseEnter={() => setCursor('play')}
                onMouseLeave={() => setCursor('default')}
              >
                {audioSimulating ? '[ RUNTIME SIMULATING: ACTIVE ]' : '[ SIMULATE BUFFER ENGINE ]'}
              </button>

              {audioSimulating && (
                <div style={{ marginTop: '16px', display: 'flex', gap: '4px', height: '24px', alignItems: 'flex-end' }}>
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        backgroundColor: project.accentColor,
                        height: `${20 + Math.random() * 80}%`,
                        transition: 'height 0.1s ease',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          NEXT PROJECT FOOTER
          ===================================================== */}
      <Link
        to={`/work/${nextProject.slug}`}
        style={{
          display: 'block',
          textDecoration: 'none',
          color: '#E8E6DF',
          backgroundColor: '#111',
          borderTop: '2px solid rgba(232, 230, 223, 0.15)',
          padding: 'clamp(60px, 10vw, 120px) var(--pad-section-x)',
          textAlign: 'center',
          transition: 'background-color 0.2s ease',
        }}
        onMouseEnter={() => setCursor('open')}
        onMouseLeave={() => setCursor('default')}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#777', letterSpacing: '0.15em', marginBottom: '16px' }}>
          NEXT CASE STUDY // {nextProject.index}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 8vw, 140px)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
          }}
        >
          {nextProject.title} ↗
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: nextProject.accentColor, marginTop: '16px' }}>
          {nextProject.category} // {nextProject.year}
        </div>
      </Link>

      <style>{`
        @media (max-width: 860px) {
          .case-hero-cover {
            box-shadow: 8px 8px 0px #0B0B0B !important;
          }
          .case-intro-grid,
          .case-code-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </div>
  );
};
