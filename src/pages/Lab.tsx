import React, { useState, useRef, useEffect } from 'react';
import { useStudioStore } from '../store/useStudioStore';
import { labData } from '../data/lab';

export const Lab: React.FC = () => {
  const { setCursor } = useStudioStore();
  const [activeExperiment, setActiveExperiment] = useState<string>('type-reactor');

  // Type Reactor State
  const [typeWidth, setTypeWidth] = useState(100);
  const [typeWeight, setTypeWeight] = useState(700);

  // Sound Grid State (16 steps)
  const [soundGrid, setSoundGrid] = useState<boolean[]>(new Array(16).fill(false));
  const audioCtxRef = useRef<AudioContext | null>(null);

  const toggleSoundCell = (index: number) => {
    const updated = [...soundGrid];
    updated[index] = !updated[index];
    setSoundGrid(updated);

    // Play quick synth bleep on click
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      const ctx = audioCtxRef.current;
      if (ctx) {
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = index % 2 === 0 ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(110 + index * 45, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch {
      // Audio context restricted or muted
    }
  };

  // Broken Clock State
  const [brokenTime, setBrokenTime] = useState({ h: '00', m: '00', s: '00', ms: '000', bin: '000000' });
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const ms = String(now.getMilliseconds()).padStart(3, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const h = String(now.getHours()).padStart(2, '0');
      const bin = Number(s).toString(2).padStart(6, '0');
      setBrokenTime({ h, m, s, ms, bin });
    }, 45);
    return () => clearInterval(timer);
  }, []);

  // Pixel Burial Canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (activeExperiment !== 'pixel-burial' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#EC3D31';
    ctx.font = 'bold 32px monospace';
    ctx.fillText('DISORDER // RASTER', 24, 70);
    ctx.fillStyle = '#fff';
    ctx.fillText('CLICK OR DRAG TO BURY PIXELS', 24, 130);
  }, [activeExperiment]);

  const degradeAt = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.getImageData(Math.max(0, x - 40), Math.max(0, y - 40), 80, 80);
    for (let i = 0; i < imgData.data.length; i += 4) {
      if (Math.random() > 0.4) {
        imgData.data[i] = Math.random() > 0.5 ? 236 : 199;
        imgData.data[i + 1] = Math.random() > 0.5 ? 61 : 255;
        imgData.data[i + 2] = Math.random() > 0.5 ? 49 : 50;
      }
    }
    ctx.putImageData(imgData, Math.max(0, x - 40), Math.max(0, y - 40));
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.buttons === 1) {
      const rect = e.currentTarget.getBoundingClientRect();
      degradeAt(Math.floor(e.clientX - rect.left), Math.floor(e.clientY - rect.top));
    }
  };

  const handleCanvasTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!e.touches[0]) return;
    const rect = e.currentTarget.getBoundingClientRect();
    degradeAt(Math.floor(e.touches[0].clientX - rect.left), Math.floor(e.touches[0].clientY - rect.top));
  };

  return (
    <div style={{ backgroundColor: '#0B0B0B', color: '#E8E6DF', minHeight: '100vh', paddingTop: '110px' }}>

      {/* =====================================================
          LAB HERO
          ===================================================== */}
      <section style={{ padding: '60px 32px 40px 32px', maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#C7FF32', letterSpacing: '0.15em', marginBottom: '16px' }}>
          // EXPERIMENTAL RESEARCH & PLAYGROUND
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 10vw, 160px)',
            fontWeight: 900,
            lineHeight: 0.88,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          THINGS <br />
          WE MADE <br />
          BECAUSE <br />
          WE COULD.
        </h1>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#888', maxWidth: '680px', marginTop: '24px' }}>
          NO CLIENT. NO BRIEF. NO RULES. Interactive playgrounds testing edge cases of variable fonts, audio nodes, canvas degradation, and physics.
        </p>
      </section>

      {/* =====================================================
          EXPERIMENTS SELECTOR TABS
          ===================================================== */}
      <section style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 32px 32px 32px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            borderBottom: '1px solid rgba(232, 230, 223, 0.15)',
            paddingBottom: '24px',
          }}
        >
          {labData.map((lab) => (
            <button
              key={lab.type}
              onClick={() => setActiveExperiment(lab.type)}
              style={{
                background: activeExperiment === lab.type ? '#C7FF32' : 'transparent',
                color: activeExperiment === lab.type ? '#0B0B0B' : '#E8E6DF',
                border: '1px solid rgba(232, 230, 223, 0.25)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 700,
                padding: '8px 16px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={() => setCursor('break')}
              onMouseLeave={() => setCursor('default')}
              aria-label={`Open experiment ${lab.title}`}
            >
              [{lab.number}] {lab.title}
            </button>
          ))}
        </div>
      </section>

      {/* =====================================================
          ACTIVE EXPERIMENT INTERACTIVE STAGE
          ===================================================== */}
      <section style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 32px 120px 32px' }}>
        <div
          style={{
            border: '2px solid rgba(232, 230, 223, 0.25)',
            backgroundColor: '#121212',
            padding: 'clamp(20px, 4vw, 48px)',
            minHeight: '480px',
            position: 'relative',
          }}
        >
          {/* EXPERIMENT 01: TYPE REACTOR */}
          {activeExperiment === 'type-reactor' && (
            <div
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const normX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                const normY = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
                setTypeWidth(Math.floor(30 + normX * 270));
                setTypeWeight(Math.floor(200 + normY * 700));
              }}
              onTouchMove={(e) => {
                if (!e.touches[0]) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const normX = Math.max(0, Math.min(1, (e.touches[0].clientX - rect.left) / rect.width));
                const normY = Math.max(0, Math.min(1, (e.touches[0].clientY - rect.top) / rect.height));
                setTypeWidth(Math.floor(30 + normX * 270));
                setTypeWeight(Math.floor(200 + normY * 700));
              }}
              style={{
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'crosshair',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#EC3D31', marginBottom: '16px', textAlign: 'center' }}>
                // MOVE MOUSE OR DRAG TOUCH ACROSS STAGE TO MORPH VARIABLE AXES
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(40px, 9vw, 135px)',
                  lineHeight: 0.9,
                  textAlign: 'center',
                  fontVariationSettings: `"wdth" ${typeWidth}, "wght" ${typeWeight}`,
                  color: '#E8E6DF',
                  userSelect: 'none',
                  transition: 'font-variation-settings 0.05s ease',
                }}
              >
                KINETIC <br />
                DISORDER
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#777', marginTop: '32px' }}>
                AXIS WDTH: <strong style={{ color: '#C7FF32' }}>{typeWidth}</strong> // AXIS WGHT: <strong style={{ color: '#C7FF32' }}>{typeWeight}</strong>
              </div>
            </div>
          )}

          {/* EXPERIMENT 02: PIXEL BURIAL */}
          {activeExperiment === 'pixel-burial' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#C7FF32', marginBottom: '16px' }}>
                // CLICK & DRAG OR TOUCH TO DEGRADE RASTER MEMORY
              </div>
              <canvas
                ref={canvasRef}
                width={800}
                height={380}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  degradeAt(Math.floor(e.clientX - rect.left), Math.floor(e.clientY - rect.top));
                }}
                onMouseMove={handleCanvasMouseMove}
                onTouchMove={handleCanvasTouchMove}
                onTouchStart={handleCanvasTouchMove}
                style={{
                  border: '1px solid #333',
                  maxWidth: '100%',
                  cursor: 'crosshair',
                  backgroundColor: '#000',
                  touchAction: 'none',
                }}
              />
            </div>
          )}

          {/* EXPERIMENT 03: WEBGL POSTER */}
          {activeExperiment === 'webgl-poster' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
              <div
                style={{
                  width: 'clamp(260px, 42vw, 460px)',
                  height: '400px',
                  backgroundColor: '#EC3D31',
                  color: '#0B0B0B',
                  padding: '32px',
                  boxShadow: '16px 16px 0px #C7FF32',
                  border: '2px solid #0B0B0B',
                  transform: 'rotate(-3deg) perspective(600px) rotateY(-5deg)',
                  transition: 'transform 0.2s ease',
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
                  const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
                  e.currentTarget.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
                }}
                onTouchMove={(e) => {
                  if (!e.touches[0]) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const rx = ((e.touches[0].clientY - rect.top) / rect.height - 0.5) * -20;
                  const ry = ((e.touches[0].clientX - rect.left) / rect.width - 0.5) * 20;
                  e.currentTarget.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotate(-3deg) perspective(600px) rotateY(-5deg)';
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700 }}>POSTER_03 // SPECIMEN</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4.5vw, 60px)', fontWeight: 900, lineHeight: 0.9, marginTop: '24px' }}>
                  RAW <br />
                  DIGITAL <br />
                  NOISE.
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', marginTop: '36px' }}>
                  PHYSICAL PERSPECTIVE TRACKING // 120HZ
                </div>
              </div>
            </div>
          )}

          {/* EXPERIMENT 04: SOUND GRID */}
          {activeExperiment === 'sound-grid' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#C7FF32', marginBottom: '24px' }}>
                // 16-STEP VISUAL DRUM & SYNTHESIZER MATRIX (CLICK TO ENGAGE CELLS)
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '12px',
                  maxWidth: '540px',
                  margin: '0 auto',
                }}
              >
                {soundGrid.map((active, i) => (
                  <button
                    key={i}
                    onClick={() => toggleSoundCell(i)}
                    style={{
                      height: '75px',
                      backgroundColor: active ? '#C7FF32' : '#1a1a1a',
                      color: active ? '#0B0B0B' : '#777',
                      border: '1px solid rgba(232, 230, 223, 0.2)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.12s ease',
                    }}
                    onMouseEnter={() => setCursor('play')}
                    onMouseLeave={() => setCursor('default')}
                    aria-label={`Step ${i + 1} synthesizer node`}
                  >
                    STEP_{String(i + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* EXPERIMENT 05: CURSOR MACHINE */}
          {activeExperiment === 'cursor-machine' && (
            <div style={{ textAlign: 'center', minHeight: '360px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#EC3D31', marginBottom: '16px' }}>
                // INERTIAL POINTER DYNAMICS TEST
              </div>

              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3.8vw, 52px)', fontWeight: 800 }}>
                HOVER OVER CUSTOM TARGETS
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
                <button
                  onMouseEnter={() => setCursor('break', 'OVERHEAT')}
                  onMouseLeave={() => setCursor('default')}
                  className="btn-raw"
                >
                  [ CRITICAL OVERHEAT ]
                </button>
                <button
                  onMouseEnter={() => setCursor('play', 'AUDIO PULSE')}
                  onMouseLeave={() => setCursor('default')}
                  className="btn-raw"
                >
                  [ AUDIO REACTIVE ]
                </button>
                <button
                  onMouseEnter={() => setCursor('drag', 'ORBIT SLIP')}
                  onMouseLeave={() => setCursor('default')}
                  className="btn-raw"
                >
                  [ INERTIAL SLIP ]
                </button>
              </div>
            </div>
          )}

          {/* EXPERIMENT 06: BROKEN CLOCK */}
          {activeExperiment === 'broken-clock' && (
            <div style={{ textAlign: 'center', minHeight: '360px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#777', marginBottom: '16px' }}>
                // NON-LINEAR INDUSTRIAL CHRONOMETER
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(32px, 5.5vw, 76px)',
                  fontWeight: 900,
                  color: '#C7FF32',
                  letterSpacing: '0.08em',
                }}
              >
                {brokenTime.h}:{brokenTime.m}:{brokenTime.s}.{brokenTime.ms}
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#EC3D31', marginTop: '16px' }}>
                BINARY REGISTER: [{brokenTime.bin}]
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
