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
      <section style={{ maxWidth: '1600px', margin: '0 auto', padding: '60px 32px 140px 32px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#3155FF', letterSpacing: '0.15em', marginBottom: '16px' }}>
          // FULL VISUAL ARCHIVE // 2022—2026
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 11vw, 175px)',
            fontWeight: 900,
            lineHeight: 0.88,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            margin: '0 0 64px 0',
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
                gridTemplateColumns: 'minmax(50px, 80px) minmax(240px, 2fr) minmax(180px, 1.2fr) minmax(140px, 1fr) minmax(80px, 100px)',
                padding: '24px 0',
                borderBottom: '1px solid rgba(232, 230, 223, 0.12)',
                alignItems: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                gap: '16px',
              }}
              className="archive-table-row"
            >
              <span style={{ color: item.accent, fontWeight: 700 }}>
                [{item.id}]
              </span>

              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2.5vw, 36px)', fontWeight: 800 }}>
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

              <div style={{ color: '#888' }}>{item.client}</div>
              <div style={{ color: '#aaa' }}>{item.category}</div>
              <div style={{ color: '#777', textAlign: 'right' }}>{item.year}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '64px', textAlign: 'center' }}>
          <Link to="/work" className="btn-raw" onMouseEnter={() => setCursor('open')} onMouseLeave={() => setCursor('default')}>
            ← BACK TO CURATED WORK
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .archive-table-row {
            grid-template-columns: 40px 1fr 80px !important;
          }
        }
      `}</style>
    </div>
  );
};
