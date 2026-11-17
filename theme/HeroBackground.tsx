// @ts-nocheck
import { useEffect, useRef } from 'react';

/**
 * Animated red wireframe mountain behind the home hero.
 * Drawn on a canvas with a simple perspective projection; no external assets.
 * Pauses when the tab is hidden and renders a single still frame for users who prefer reduced motion.
 */
const ROWS = 46;
const COLS = 66;

function terrain(x: number, z: number, t: number) {
  const r2 = x * x + z * z * 1.25;
  const peak = Math.exp(-r2 * 3.1);
  const ridge = 0.55 + 0.45 * Math.sin(x * 5.2 + t * 0.35) * Math.cos(z * 4.1 - t * 0.28);
  const detail =
    0.075 * Math.sin(x * 14 + z * 11 + t * 0.8) + 0.045 * Math.sin(x * 23 - z * 17 - t * 0.6);
  const foothills = 0.09 * Math.sin(x * 3.1 + 1.3) * Math.cos(z * 2.7 - t * 0.12);
  return peak * (0.52 + 0.5 * ridge) * 1.05 + detail * (0.25 + peak) + foothills * 0.5;
}

export default function HeroBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const px = new Float32Array((ROWS + 1) * (COLS + 1));
    const py = new Float32Array((ROWS + 1) * (COLS + 1));
    const ph = new Float32Array((ROWS + 1) * (COLS + 1));
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let t = 2.2;

    const idx = (i: number, j: number) => i * (COLS + 1) + j;

    function resize() {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }

    function project(time: number) {
      const camDist = 2.2;
      const camH = 0.75;
      const horizon = h * 0.36;
      const K = h * 0.82;
      const K2 = w * 0.56;
      for (let i = 0; i <= ROWS; i++) {
        const z = (i / ROWS) * 2 - 1; // -1 far .. 1 near
        const scale = 1 / (camDist - z);
        for (let j = 0; j <= COLS; j++) {
          const x = (j / COLS) * 2.4 - 1.2;
          const y = terrain(x, z, time);
          const k = idx(i, j);
          px[k] = w / 2 + x * scale * K2;
          py[k] = horizon + (camH - y) * scale * K;
          ph[k] = y;
        }
      }
    }

    function stroke(isDark: boolean, a: number) {
      ctx.strokeStyle = isDark ? `rgba(254, 44, 85, ${a})` : `rgba(217, 26, 65, ${a * 0.8})`;
      ctx.stroke();
    }

    function draw() {
      if (!w || !h) return;
      const isDark = document.documentElement.classList.contains('dark');
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = isDark ? 'lighter' : 'source-over';
      ctx.lineWidth = 1;
      project(t);

      // rows (constant z)
      for (let i = 0; i <= ROWS; i++) {
        const near = i / ROWS;
        let mean = 0;
        ctx.beginPath();
        for (let j = 0; j <= COLS; j++) {
          const k = idx(i, j);
          mean += ph[k];
          if (j === 0) ctx.moveTo(px[k], py[k]);
          else ctx.lineTo(px[k], py[k]);
        }
        mean /= COLS + 1;
        stroke(isDark, Math.min(0.85, 0.1 + near * 0.32 + mean * 0.9));
      }

      // columns (constant x)
      for (let j = 0; j <= COLS; j++) {
        let mean = 0;
        ctx.beginPath();
        for (let i = 0; i <= ROWS; i++) {
          const k = idx(i, j);
          mean += ph[k];
          if (i === 0) ctx.moveTo(px[k], py[k]);
          else ctx.lineTo(px[k], py[k]);
        }
        mean /= ROWS + 1;
        stroke(isDark, Math.min(0.8, 0.07 + mean * 0.95));
      }
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (document.hidden) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      t += dt * 0.55;
      draw();
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    if (!reduceMotion) raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="lk-hero-bg" aria-hidden="true">
      <canvas ref={ref} className="lk-hero-bg__canvas" />
    </div>
  );
}
