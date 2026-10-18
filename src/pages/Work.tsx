import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStudioStore } from '../store/useStudioStore';
import { projectsData, archiveItems } from '../data/projects';
import { NoiseImage } from '../components/NoiseImage';

type ViewMode = 'INDEX' | 'GRID' | 'CHAOS';
type CategoryFilter = 'ALL' | 'COMMERCE' | 'CULTURE' | 'MUSIC' | 'FASHION' | 'PRODUCT' | 'EXPERIMENT';

export const Work: React.FC = () => {
  const { setCursor, setPreviewImage } = useStudioStore();
  const [viewMode, setViewMode] = useState<ViewMode>('INDEX');
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('ALL');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && viewMode === 'CHAOS') {
        setViewMode('GRID');
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [viewMode]);

  // Filtered projects
  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'COMMERCE') return p.category.toLowerCase().includes('commerce');
    if (activeFilter === 'MUSIC') return p.category.toLowerCase().includes('music') || p.category.toLowerCase().includes('album');
    if (activeFilter === 'FASHION') return p.category.toLowerCase().includes('fashion');
    if (activeFilter === 'PRODUCT') return p.category.toLowerCase().includes('software');
    if (activeFilter === 'CULTURE') return p.category.toLowerCase().includes('culture') || p.category.toLowerCase().includes('magazine');
    if (activeFilter === 'EXPERIMENT') return p.category.toLowerCase().includes('campaign') || p.category.toLowerCase().includes('experimental');
    return true;
  });

  return (
    <div style={{ backgroundColor: '#0B0B0B', color: '#E8E6DF', minHeight: '100vh', paddingTop: 'var(--pad-hero-top)' }}>
      {/* Work Page Header */}
      <section style={{ padding: 'clamp(30px, 5vw, 60px) var(--pad-section-x) 24px var(--pad-section-x)', maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#EC3D31', letterSpacing: '0.15em', marginBottom: '8px' }}>
              // ARCHIVE INDEX
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(44px, 11vw, 160px)',
                fontWeight: 900,
                lineHeight: 0.85,
                margin: 0,
                letterSpacing: '-0.03em',
              }}
            >
              WORK <br />
              <span style={{ color: '#777' }}>/24—26</span>
            </h1>
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#888' }}>
            <span>PROJECT INDEX: 001—018</span> <br />
            <span>COMMERCE, CULTURE, PROTOTYPES</span>
          </div>
        </div>

        {/* View Mode & Filter Controls Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            borderTop: '1px solid rgba(232, 230, 223, 0.15)',
            borderBottom: '1px solid rgba(232, 230, 223, 0.15)',
            padding: '16px 0',
            marginTop: '36px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
          }}
        >
          {/* Categories Filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {(['ALL', 'COMMERCE', 'CULTURE', 'MUSIC', 'FASHION', 'PRODUCT', 'EXPERIMENT'] as CategoryFilter[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeFilter === cat ? '#C7FF32' : '#888',
                  textDecoration: activeFilter === cat ? 'underline' : 'none',
                  textUnderlineOffset: '6px',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  cursor: 'pointer',
                  fontWeight: activeFilter === cat ? 700 : 400,
                  letterSpacing: '0.08em',
                  padding: '4px 0',
                }}
                aria-label={`Filter by ${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Modes Selector (Chaos disabled on mobile per spec) */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ color: '#666' }}>VIEW:</span>
            {(['INDEX', 'GRID', ...(isMobile ? [] : ['CHAOS'])] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                style={{
                  background: viewMode === mode ? '#E8E6DF' : 'transparent',
                  color: viewMode === mode ? '#0B0B0B' : '#888',
                  border: '1px solid rgba(232, 230, 223, 0.3)',
                  padding: '6px 14px',
                  fontFamily: 'inherit',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={() => setCursor('default')}
                aria-label={`Switch to ${mode} view`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* EMPTY STATE */}
      {filteredProjects.length === 0 && (
        <section style={{ maxWidth: '1600px', margin: '0 auto', padding: 'var(--pad-section-y) var(--pad-section-x)', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#EC3D31', letterSpacing: '0.15em', marginBottom: '16px' }}>
            // 00 MATCHES FOR [{activeFilter}]
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 64px)', fontWeight: 800 }}>
            NO ARCHIVES ALLOCATED.
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#888', marginTop: '12px', maxWidth: '440px', margin: '12px auto 32px auto' }}>
            No release nodes currently match this classification filter in the current quarter.
          </p>
          <button
            onClick={() => setActiveFilter('ALL')}
            className="btn-raw-solid"
            style={{ backgroundColor: '#C7FF32', color: '#0B0B0B' }}
          >
            [ RESET TO ALL ARCHIVES ]
          </button>
        </section>
      )}

      {/* =====================================================
          MODE 1: INDEX MODE (Textual Rows)
          ===================================================== */}
      {viewMode === 'INDEX' && filteredProjects.length > 0 && (
        <section style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 var(--pad-section-x) clamp(60px, 10vw, 100px) var(--pad-section-x)' }}>
          {filteredProjects.map((project) => (
            <Link
              key={project.slug}
              to={`/work/${project.slug}`}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                borderBottom: '1px solid rgba(232, 230, 223, 0.12)',
                padding: 'clamp(24px, 4vw, 40px) 0',
                transition: 'background-color 0.2s ease, padding 0.2s ease',
              }}
              onMouseEnter={() => {
                setCursor('open');
                setPreviewImage(project.coverImage);
              }}
              onMouseLeave={() => {
                setCursor('default');
                setPreviewImage(null);
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(40px, 60px) 2fr 1fr minmax(60px, 100px)',
                  alignItems: 'center',
                  gap: '24px',
                }}
                className="index-row"
              >
                <span className="index-col-num" style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#777' }}>
                  {project.index}
                </span>

                <div className="index-col-main">
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(28px, 6vw, 86px)',
                      fontWeight: 800,
                      lineHeight: 1,
                      textTransform: 'uppercase',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {project.title}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#888', marginTop: '8px' }}>
                    {project.summary}
                  </div>
                </div>

                <div className="index-col-cat" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#aaa', textTransform: 'uppercase' }}>
                  {project.category} <br />
                  <span style={{ color: '#666' }}>{project.client}</span>
                </div>

                <div className="index-col-year" style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#C7FF32', textAlign: 'right', fontWeight: 700 }}>
                  {project.year} ↗
                </div>
              </div>
            </Link>
          ))}
        </section>
      )}

      {/* =====================================================
          MODE 2: EDITORIAL GRID MODE
          ===================================================== */}
      {viewMode === 'GRID' && filteredProjects.length > 0 && (
        <section
          style={{
            maxWidth: '1600px',
            margin: '0 auto',
            padding: '20px var(--pad-section-x) clamp(60px, 10vw, 120px) var(--pad-section-x)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(24px, 4vw, 40px)',
          }}
          className="grid-mode-container"
        >
          {filteredProjects.map((project, i) => (
            <Link
              key={project.slug}
              to={`/work/${project.slug}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
              onMouseEnter={() => setCursor('open')}
              onMouseLeave={() => setCursor('default')}
            >
              {/* Image Frame */}
              <div
                style={{
                  height: i % 2 === 0 ? '380px' : '480px',
                  border: '1px solid rgba(232, 230, 223, 0.2)',
                  backgroundColor: '#151515',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <NoiseImage
                  src={project.coverImage}
                  alt={project.title}
                  fallbackTitle={project.title}
                  fallbackSubtitle={project.category}
                  accentColor={project.accentColor}
                  grayscaleByDefault={true}
                  style={{ width: '100%', height: '100%' }}
                />

                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: '#0B0B0B',
                    color: project.accentColor,
                    padding: '3px 8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: 700,
                  }}
                >
                  {project.index} // {project.category}
                </div>
              </div>

              {/* Title & Metadata */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(26px, 3.2vw, 40px)',
                    fontWeight: 800,
                    margin: 0,
                    textTransform: 'uppercase',
                  }}
                >
                  {project.title}
                </h3>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#777' }}>
                  {project.year}
                </span>
              </div>

              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#888', margin: 0, lineHeight: 1.4 }}>
                {project.summary}
              </p>
            </Link>
          ))}
        </section>
      )}

      {/* =====================================================
          MODE 3: CHAOS MODE (Desktop Interactive Scattered Canvas)
          ===================================================== */}
      {viewMode === 'CHAOS' && !isMobile && filteredProjects.length > 0 && (
        <section
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '750px',
            borderTop: '1px solid rgba(232, 230, 223, 0.15)',
            borderBottom: '1px solid rgba(232, 230, 223, 0.15)',
            backgroundColor: '#111',
            overflow: 'hidden',
            padding: '40px',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '32px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#C7FF32',
              letterSpacing: '0.1em',
              zIndex: 20,
            }}
          >
            [ CHAOS MODE // DRAGGABLE ARTIFACT MAP // INTERACTIVE DISORDER ]
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '40px',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '60px',
            }}
          >
            {filteredProjects.map((p, idx) => {
              const offsets = [
                { rot: -4, x: -10, y: 15 },
                { rot: 6, x: 20, y: -20 },
                { rot: -3, x: -15, y: -10 },
                { rot: 5, x: 10, y: 30 },
                { rot: -6, x: 25, y: -15 },
                { rot: 3, x: -5, y: 10 },
              ];
              const off = offsets[idx % offsets.length];

              return (
                <Link
                  key={p.slug}
                  to={`/work/${p.slug}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    width: '320px',
                    backgroundColor: '#151515',
                    border: '1px solid rgba(232, 230, 223, 0.3)',
                    boxShadow: '12px 12px 0px rgba(0,0,0,0.8)',
                    transform: `rotate(${off.rot}deg) translate(${off.x}px, ${off.y}px)`,
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease, z-index 0.2s ease',
                    zIndex: 10 + idx,
                    padding: '12px',
                  }}
                  onMouseEnter={(e) => {
                    setCursor('open');
                    e.currentTarget.style.transform = `scale(1.08) rotate(0deg)`;
                    e.currentTarget.style.zIndex = '50';
                  }}
                  onMouseLeave={(e) => {
                    setCursor('default');
                    e.currentTarget.style.transform = `rotate(${off.rot}deg) translate(${off.x}px, ${off.y}px)`;
                    e.currentTarget.style.zIndex = `${10 + idx}`;
                  }}
                >
                  <div style={{ height: '220px', overflow: 'hidden', marginBottom: '10px' }}>
                    <NoiseImage
                      src={p.coverImage}
                      alt={p.title}
                      fallbackTitle={p.title}
                      accentColor={p.accentColor}
                      grayscaleByDefault={false}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>

                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: p.accentColor }}>
                    {p.index} // {p.category}
                  </div>

                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, marginTop: '4px' }}>
                    {p.title}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Visual Archive Preview Section */}
      <section style={{ maxWidth: '1600px', margin: '0 auto', padding: 'clamp(40px, 8vw, 80px) var(--pad-section-x)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid rgba(232, 230, 223, 0.15)', paddingBottom: '20px', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 800, margin: 0 }}>
            EARLIER ARTIFACTS
          </h2>
          <Link to="/archive" className="btn-raw" onMouseEnter={() => setCursor('open')} onMouseLeave={() => setCursor('default')}>
            VIEW FULL ARCHIVE ↗
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: '20px' }}>
          {archiveItems.map((arch) => (
            <div
              key={arch.id}
              style={{
                border: '1px solid rgba(232, 230, 223, 0.12)',
                padding: '20px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                backgroundColor: '#121212',
              }}
            >
              <div style={{ color: arch.accent, fontSize: '10px', marginBottom: '8px' }}>
                [{arch.id}] // {arch.year}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#E8E6DF' }}>
                {arch.title}
              </div>
              <div style={{ color: '#777', marginTop: '6px' }}>{arch.client}</div>
              <div style={{ color: '#aaa', marginTop: '2px' }}>{arch.category}</div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .index-row {
            grid-template-columns: 32px 1fr !important;
            gap: 6px 12px !important;
            align-items: flex-start !important;
          }
          .index-col-main {
            grid-column: 2 !important;
          }
          .index-col-cat {
            grid-column: 2 !important;
            margin-top: 4px;
            font-size: 11px !important;
          }
          .index-col-year {
            grid-column: 2 !important;
            text-align: left !important;
            margin-top: 2px;
          }
          .grid-mode-container {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  );
};
