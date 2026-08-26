"use client";

import { memo, useEffect, useRef } from "react";

import "./DotField.css";

const TWO_PI = Math.PI * 2;

const DotField = memo(function DotField({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  attractToCursor = false,
  glowRadius = 160,
  enableGlow = true,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = "rgba(168, 85, 247, 0.35)",
  gradientTo = "rgba(180, 151, 207, 0.25)",
  glowColor = "#120F17",
  ...rest
}) {
  const canvasRef = useRef(null);
  const svgRef = useRef(null);
  const glowRef = useRef(null);
  const dotsRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0, inside: false });
  const rafRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
  const glowOpacity = useRef(0);
  const engagement = useRef(0);
  const lastPointerMoveRef = useRef(0);
  const propsRef = useRef({});
  propsRef.current = {
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    attractToCursor,
    sparkle,
    waveAmplitude,
    gradientFrom,
    gradientTo,
  };
  const rebuildRef = useRef(null);
  const glowIdRef = useRef(`dot-field-glow-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glowEl = glowRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let resizeTimer;
    let speedInterval;
    let isVisible = true;

    function resize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(doResize, 100);
    }

    function doResize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      sizeRef.current = {
        w,
        h,
        offsetX: rect.left + window.scrollX,
        offsetY: rect.top + window.scrollY,
      };

      buildDots(w, h);
    }

    function buildDots(w, h) {
      const p = propsRef.current;
      const step = p.dotRadius + p.dotSpacing;
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const dots = new Array(rows * cols);
      let idx = 0;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          dots[idx++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
        }
      }
      dotsRef.current = dots;
    }

    function onMouseMove(e) {
      const rect = canvas.parentElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      mouseRef.current.inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      lastPointerMoveRef.current = performance.now();
      start();
    }

    function updateMouseSpeed() {
      const m = mouseRef.current;
      const dx = m.prevX - m.x;
      const dy = m.prevY - m.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      m.speed += (dist - m.speed) * 0.5;
      if (m.speed < 0.001) m.speed = 0;
      m.prevX = m.x;
      m.prevY = m.y;
    }

    let frameCount = 0;

    function tick() {
      frameCount++;
      const dots = dotsRef.current;
      const m = mouseRef.current;
      const { w, h } = sizeRef.current;
      const p = propsRef.current;
      const len = dots.length;
      const t = frameCount * 0.02;

      const pointerIsActive = m.inside && performance.now() - lastPointerMoveRef.current < 500;
      const targetEngagement = p.attractToCursor && pointerIsActive
        ? 1
        : Math.min(m.speed / 5, 1);
      engagement.current += (targetEngagement - engagement.current) * (p.attractToCursor ? 0.12 : 0.06);
      if (engagement.current < 0.001) engagement.current = 0;
      const eng = engagement.current;
      const targetGlow = p.attractToCursor && m.inside ? 0.65 : eng;
      glowOpacity.current += (targetGlow - glowOpacity.current) * 0.08;

      if (glowEl && enableGlow) {
        glowEl.setAttribute("cx", m.x);
        glowEl.setAttribute("cy", m.y);
        glowEl.style.opacity = glowOpacity.current;
      }

      ctx.clearRect(0, 0, w, h);

      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, p.gradientFrom);
      grad.addColorStop(1, p.gradientTo);
      ctx.fillStyle = grad;

      const cr = p.cursorRadius;
      const crSq = cr * cr;
      const rad = p.dotRadius / 2;
      const isBulge = p.bulgeOnly && !p.attractToCursor;
      const isAttract = p.attractToCursor;

      ctx.beginPath();

      for (let i = 0; i < len; i++) {
        const d = dots[i];
        const dx = m.x - d.ax;
        const dy = m.y - d.ay;
        const distSq = dx * dx + dy * dy;

        if (distSq < crSq && eng > 0.01) {
          const dist = Math.sqrt(distSq);
          const angle = Math.atan2(dy, dx);
          const influence = 1 - dist / cr;
          const force = influence * influence * p.bulgeStrength * eng;

          if (isAttract) {
            d.sx += (d.ax + Math.cos(angle) * force - d.sx) * 0.18;
            d.sy += (d.ay + Math.sin(angle) * force - d.sy) * 0.18;
          } else if (isBulge) {
            d.sx += (d.ax - Math.cos(angle) * force - d.sx) * 0.15;
            d.sy += (d.ay - Math.sin(angle) * force - d.sy) * 0.15;
          } else {
            const move = (500 / dist) * (m.speed * p.cursorForce);
            d.vx += Math.cos(angle) * -move;
            d.vy += Math.sin(angle) * -move;
          }
        } else if (isBulge || isAttract) {
          d.sx += (d.ax - d.sx) * 0.12;
          d.sy += (d.ay - d.sy) * 0.12;
        }

        if (!isBulge && !isAttract) {
          d.vx *= 0.9;
          d.vy *= 0.9;
          d.x = d.ax + d.vx;
          d.y = d.ay + d.vy;
          d.sx += (d.x - d.sx) * 0.1;
          d.sy += (d.y - d.sy) * 0.1;
        }

        let drawX = d.sx;
        let drawY = d.sy;
        if (p.waveAmplitude > 0) {
          drawY += Math.sin(d.ax * 0.03 + t) * p.waveAmplitude;
          drawX += Math.cos(d.ay * 0.03 + t * 0.7) * p.waveAmplitude * 0.5;
        }

        if (p.sparkle) {
          const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0;
          if (hash % 100 < 3) {
            ctx.moveTo(drawX + rad * 1.8, drawY);
            ctx.arc(drawX, drawY, rad * 1.8, 0, TWO_PI);
          } else {
            ctx.moveTo(drawX + rad, drawY);
            ctx.arc(drawX, drawY, rad, 0, TWO_PI);
          }
        } else {
          ctx.moveTo(drawX + rad, drawY);
          ctx.arc(drawX, drawY, rad, 0, TWO_PI);
        }
      }

      ctx.fill();

      const shouldContinue = pointerIsActive || engagement.current > 0.001 || m.speed > 0.001;
      if (isVisible && !document.hidden && !reducedMotion && shouldContinue) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        stop();
      }
    }

    function start() {
      if (reducedMotion || !isVisible || document.hidden || rafRef.current) return;
      speedInterval = window.setInterval(updateMouseSpeed, 50);
      rafRef.current = requestAnimationFrame(tick);
    }

    function stop() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      clearInterval(speedInterval);
      speedInterval = null;
    }

    function onVisibilityChange() {
      if (document.hidden) stop();
      else start();
    }

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else stop();
    });

    doResize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    visibilityObserver.observe(canvas.parentElement);

    rebuildRef.current = () => {
      const { w, h } = sizeRef.current;
      if (w > 0 && h > 0) buildDots(w, h);
    };

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(speedInterval);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      visibilityObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    rebuildRef.current?.();
  }, [dotRadius, dotSpacing]);

  return (
    <div className="dot-field-container" {...rest}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
      {enableGlow ? (
        <svg
          ref={svgRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <defs>
            <radialGradient id={glowIdRef.current}>
              <stop offset="0%" stopColor={glowColor} />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle
            ref={glowRef}
            cx="-9999"
            cy="-9999"
            r={glowRadius}
            fill={`url(#${glowIdRef.current})`}
            style={{ opacity: 0, willChange: "opacity" }}
          />
        </svg>
      ) : null}
    </div>
  );
});

export default DotField;
