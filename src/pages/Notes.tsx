import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudioStore } from '../store/useStudioStore';
import { notesData } from '../data/notes';

export const Notes: React.FC = () => {
  const { setCursor, setPreviewImage } = useStudioStore();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const filteredNotes = notesData.filter((n) => {
    if (activeCategory === 'ALL') return true;
    return n.category === activeCategory;
  });

  return (
    <div style={{ backgroundColor: '#0B0B0B', color: '#E8E6DF', minHeight: '100vh', paddingTop: '110px' }}>
      {/* Notes Hero Header */}
      <section style={{ padding: 'clamp(36px, 5vw, 60px) var(--pad-section-x) clamp(24px, 4vw, 40px) var(--pad-section-x)', maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#C7FF32', letterSpacing: '0.15em', marginBottom: '16px' }}>
          // DISPATCHES & WORKING PAPERS
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--type-hero)',
            fontWeight: 900,
            lineHeight: 0.88,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          NOTES <br />
          FROM <br />
          THE DESK.
        </h1>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#888', maxWidth: '640px', marginTop: '24px' }}>
          Technical opinions on variable fonts, motion physics, design systems, and avoiding the sea of sanitized corporate web templates.
        </p>

        {/* Categories Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(10px, 2vw, 16px)',
            borderTop: '1px solid rgba(232, 230, 223, 0.15)',
            borderBottom: '1px solid rgba(232, 230, 223, 0.15)',
            padding: '16px 0',
            marginTop: 'clamp(32px, 4vw, 48px)',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
          }}
        >
          {['ALL', 'DESIGN', 'CODE', 'PROCESS', 'BUSINESS', 'OPINION'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: 'none',
                border: 'none',
                color: activeCategory === cat ? '#C7FF32' : '#777',
                textDecoration: activeCategory === cat ? 'underline' : 'none',
                textUnderlineOffset: '6px',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                cursor: 'pointer',
                fontWeight: activeCategory === cat ? 700 : 400,
                letterSpacing: '0.08em',
                padding: '4px 0',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Text-Driven Articles List */}
      <section style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 var(--pad-section-x) clamp(60px, 10vw, 120px) var(--pad-section-x)' }}>
        {filteredNotes.length === 0 ? (
          <div
            style={{
              padding: 'clamp(48px, 6vw, 80px) 24px',
              border: '1px dashed rgba(232, 230, 223, 0.25)',
              textAlign: 'center',
              backgroundColor: '#121212',
              marginTop: '40px',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#EC3D31', letterSpacing: '0.15em', marginBottom: '16px' }}>
              // 00 DISPATCHES FOR [{activeCategory}]
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 54px)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '24px' }}>
              NO ARTICLES PUBLISHED UNDER THIS FILTER YET
            </div>
            <button
              onClick={() => setActiveCategory('ALL')}
              className="btn-raw-solid"
              style={{ backgroundColor: '#C7FF32', color: '#0B0B0B', borderColor: '#C7FF32' }}
            >
              SHOW ALL NOTES
            </button>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <Link
              key={note.slug}
              to={`/notes/${note.slug}`}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                borderBottom: '1px solid rgba(232, 230, 223, 0.12)',
                padding: 'clamp(24px, 3.5vw, 40px) 0',
                transition: 'padding 0.2s ease',
              }}
              onMouseEnter={() => {
                setCursor('open');
                setPreviewImage(note.previewImage);
              }}
              onMouseLeave={() => {
                setCursor('default');
                setPreviewImage(null);
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(32px, 50px) 2fr minmax(110px, 150px) minmax(70px, 90px)',
                  alignItems: 'baseline',
                  gap: 'clamp(14px, 2vw, 24px)',
                }}
                className="notes-row"
              >
                <span className="notes-num" style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#777' }}>
                  {note.number}
                </span>

                <div className="notes-main">
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(22px, 3.5vw, 48px)',
                      fontWeight: 800,
                      lineHeight: 1.05,
                      textTransform: 'uppercase',
                      margin: 0,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {note.title}
                  </h2>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#888', marginTop: '10px', lineHeight: 1.45 }}>
                    {note.excerpt}
                  </p>
                </div>

                <div className="notes-cat" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#C7FF32' }}>
                  [{note.category}] <br />
                  <span style={{ color: '#666' }}>{note.date}</span>
                </div>

                <div className="notes-time" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#aaa', textAlign: 'right' }}>
                  {note.readTime}
                </div>
              </div>
            </Link>
          ))
        )}
      </section>

      <style>{`
        @media (max-width: 860px) {
          .notes-row {
            grid-template-columns: 32px 1fr !important;
            gap: 8px 12px !important;
          }
          .notes-num {
            grid-column: 1 !important;
            grid-row: 1 !important;
          }
          .notes-main {
            grid-column: 2 !important;
            grid-row: 1 !important;
          }
          .notes-cat {
            grid-column: 2 !important;
            grid-row: 2 !important;
          }
          .notes-time {
            grid-column: 2 !important;
            grid-row: 3 !important;
            text-align: left !important;
          }
        }
      `}</style>
    </div>
  );
};
