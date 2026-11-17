// @ts-nocheck
import { useEffect, useRef } from 'react';
import { withBase } from '@rspress/core/runtime';

/**
 * The Lynx Kit mark, rebuilt as a field of dots.
 *
 * The brand logo is sampled into a grid. The dots fly in, settle into the lynx, shimmer, and
 * scatter away from the cursor before springing back. A thin scan line passes over them.
 * Drawn on a canvas; the only asset is /logo-dark.svg. With reduced motion it draws one still frame.
 */
const SIZE = 300; // sampling resolution in px
const GAP = 4; // sampling step in px

export default function HeroArt() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let dots: any[] = [];
    let w = 0;
    let h = 0;
    let cell = 3;
    let raf = 0;
    let last = 0;
    let t = 0;
    let settled = false;
    const mouse = { x: -9999, y: -9999 };

    const isDark = () => document.documentElement.classList.contains('dark');

    function sample(image: HTMLImageElement) {
      const off = document.createElement('canvas');
      off.width = off.height = SIZE;
      const c = off.getContext('2d', { willReadFrequently: true });
      const r = Math.min(SIZE / image.width, SIZE / image.height);
      const iw = image.width * r;
      const ih = image.height * r;
      c.drawImage(image, (SIZE - iw) / 2, (SIZE - ih) / 2, iw, ih);
      const data = c.getImageData(0, 0, SIZE, SIZE).data;
      const out: any[] = [];
      for (let y = 0; y < SIZE; y += GAP) {
        for (let x = 0; x < SIZE; x += GAP) {
          const i = (y * SIZE + x) * 4;
          if (data[i + 3] < 140) continue;
          const bolt = data[i] > 200 && data[i + 1] < 110 && data[i + 2] < 140;
          out.push({
            hx: x / SIZE,
            hy: y / SIZE,
            tx: 0,
            ty: 0,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            bolt,
            ph: Math.random() * Math.PI * 2,
          });
        }
      }
      return out;
    }

    function layout(scatter: boolean) {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const side = Math.min(w, h) * 0.96;
      const ox = (w - side) / 2;
      const oy = (h - side) / 2;
      cell = (side / SIZE) * GAP;
      for (const d of dots) {
        d.tx = ox + d.hx * side;
        d.ty = oy + d.hy * side;
        if (scatter) {
          d.x = d.tx + (Math.random() - 0.5) * w * 1.6;
          d.y = d.ty + (Math.random() - 0.5) * h * 1.6;
        } else if (reduceMotion) {
          d.x = d.tx;
          d.y = d.ty;
        }
      }
    }

    function draw() {
      if (!w || !h) return;
      const dark = isDark();
      ctx.clearRect(0, 0, w, h);
      const band = ((t * 0.28) % 1.5) - 0.25; // scan line position (0..1 = top..bottom)
      for (const d of dots) {
        const shimmer = 0.86 + 0.14 * Math.sin(t * 1.7 + d.ph);
        const near = Math.max(0, 1 - Math.abs(d.hy - band) / 0.1);
        const s = cell * 0.7 * shimmer * (1 + near * 0.22);
        let color: string;
        if (d.bolt) {
          color = `rgba(254, 44, 85, ${Math.min(1, 0.9 + near * 0.1)})`;
        } else {
          const a = Math.min(1, 0.72 + near * 0.28) * (0.9 + 0.1 * shimmer);
          color = dark ? `rgba(244, 241, 247, ${a})` : `rgba(10, 6, 18, ${a})`;
        }
        ctx.fillStyle = color;
        ctx.fillRect(d.x - s / 2, d.y - s / 2, s, s);
      }
    }

    function step(dt: number) {
      const R = Math.max(70, w * 0.16);
      let moving = false;
      for (const d of dots) {
        let ax = (d.tx - d.x) * 18;
        let ay = (d.ty - d.y) * 18;
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < R && dist > 0.01) {
          const f = (1 - dist / R) ** 2 * 2600;
          ax += (dx / dist) * f;
          ay += (dy / dist) * f;
        }
        d.vx = (d.vx + ax * dt) * 0.88;
        d.vy = (d.vy + ay * dt) * 0.88;
        d.x += d.vx * dt * 60 * 0.28;
        d.y += d.vy * dt * 60 * 0.28;
        if (Math.abs(d.vx) + Math.abs(d.vy) > 0.4) moving = true;
      }
      settled = !moving;
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (document.hidden) return;
      const dt = last ? Math.min(0.033, (now - last) / 1000) : 0.016;
      last = now;
      t += dt;
      step(dt);
      draw();
    }

    function onMove(e: PointerEvent) {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    }
    function onLeave() {
      mouse.x = mouse.y = -9999;
    }

    const image = new Image();
    image.onload = () => {
      dots = sample(image);
      layout(!reduceMotion);
      if (reduceMotion) {
        draw();
      } else {
        raf = requestAnimationFrame(frame);
      }
    };
    image.src = withBase('/logo-dark.svg');

    const ro = new ResizeObserver(() => {
      if (dots.length) {
        layout(false);
        if (reduceMotion) draw();
      }
    });
    ro.observe(canvas);

    // Redraw the still frame when the theme is toggled.
    const mo = new MutationObserver(() => {
      if (reduceMotion && dots.length) draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('pointermove', onMove);
    window.addEventListener('blur', onLeave);
    document.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('blur', onLeave);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="lk-hero-art" aria-hidden="true">
      <canvas ref={ref} className="lk-hero-art__canvas" />
    </div>
  );
}
