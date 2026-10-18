import React from 'react';
import { Link } from 'react-router-dom';
import { useStudioStore } from '../store/useStudioStore';
import { projectsData, archiveItems } from '../data/projects';

export const Archive: React.FC = () => {
  const { setCursor } = useStudioStore();

  const allArchive = [
    ...projectsData.map((p) => ({
      id: p.index,
      title: p.title,
      client: p.client,
      year: p.year,
      category: p.category,
      accent: p.accentColor,
      slug: p.slug,
    })),
    ...archiveItems.map((a) => ({
      id: a.id,
      title: a.title,
      client: a.client,
      year: a.year,
      category: a.category,
      accent: a.accent,
      slug: null,
    })),
  ];

  return (
    <div style={{ backgroundColor: '#0B0B0B', color: '#E8E6DF', minHeight: '100vh', paddingTop: '110px' }}>
      <section style={{ maxWidth: '1600px', margin: '0 auto', padding: 'clamp(36px, 5vw, 60px) var(--pad-section-x) clamp(60px, 12vw, 140px) var(--pad-section-x)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#3155FF', letterSpacing: '0.15em', marginBottom: '16px' }}>
          // FULL VISUAL ARCHIVE // 2022—2026
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--type-hero)',
            fontWeight: 900,
            lineHeight: 0.88,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            margin: '0 0 clamp(32px, 5vw, 64px) 0',
          }}
        >
          COMPLETE <br />
          INDEX.
        </h1>

        {/* High-Density Archive Matrix */}
        <div style={{ borderTop: '1px solid rgba(232, 230, 223, 0.15)' }}>
          {allArchive.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(46px, 70px) minmax(200px, 2fr) minmax(140px, 1.2fr) minmax(120px, 1fr) minmax(60px, 80px)',
                padding: 'clamp(16px, 2.5vw, 24px) 0',
                borderBottom: '1px solid rgba(232, 230, 223, 0.12)',
                alignItems: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                gap: 'clamp(10px, 1.5vw, 16px)',
              }}
              className="archive-table-row"
            >
              <span className="archive-id" style={{ color: item.accent, fontWeight: 700 }}>
                [{item.id}]
              </span>

              <div className="archive-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2.5vw, 36px)', fontWeight: 800 }}>
                {item.slug ? (
                  <Link
                    to={`/work/${item.slug}`}
                    style={{ color: '#E8E6DF', textDecoration: 'none' }}
                    onMouseEnter={() => setCursor('open')}
                    onMouseLeave={() => setCursor('default')}
                  >
                    {item.title} ↗
                  </Link>
                ) : (
                  <span>{item.title}</span>
                )}
              </div>

              <div className="archive-client" style={{ color: '#888' }}>{item.client}</div>
              <div className="archive-category" style={{ color: '#aaa' }}>{item.category}</div>
              <div className="archive-year" style={{ color: '#777', textAlign: 'right' }}>{item.year}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'clamp(36px, 5vw, 64px)', textAlign: 'center' }}>
          <Link to="/work" className="btn-raw" onMouseEnter={() => setCursor('open')} onMouseLeave={() => setCursor('default')}>
            ← BACK TO CURATED WORK
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .archive-table-row {
            grid-template-columns: 46px 1fr !important;
            gap: 6px 12px !important;
            padding: 16px 0 !important;
          }
          .archive-id {
            grid-column: 1 !important;
            grid-row: 1 !important;
          }
          .archive-title {
            grid-column: 2 !important;
            grid-row: 1 !important;
          }
          .archive-client {
            grid-column: 2 !important;
            grid-row: 2 !important;
          }
          .archive-category {
            grid-column: 2 !important;
            grid-row: 3 !important;
          }
          .archive-year {
            grid-column: 2 !important;
            grid-row: 4 !important;
            text-align: left !important;
          }
        }
      `}</style>
    </div>
  );
};
