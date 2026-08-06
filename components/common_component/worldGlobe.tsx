"use client";

import { useMemo } from "react";

/**
 * WorldTreeGlobe
 * ----------------------------------------------------------------
 * A rotating dot-matrix world map inside a circular "globe" viewport,
 * with animated connection arcs converging on a central hub — meant
 * to read as "streaming in from anywhere in the world, into Xonnect."
 *
 * - No external map assets, no extra npm packages. Pure SVG + CSS.
 * - Continents are stylized dot blobs (not real geo data) — good
 *   enough to read as a world map at hero-graphic scale.
 * - The illusion of globe rotation is a classic trick: the dotted
 *   map is duplicated side-by-side and scrolled horizontally inside
 *   a circular clip.
 *
 * Usage:
 *   <WorldTreeGlobe size={420} />
 */

type Blob = { cx: number; cy: number; rx: number; ry: number; rot: number };

// Rough stylized continent placements on an 800x400 equirectangular canvas.
// Not geographically precise — tuned to read as recognizable landmasses
// once rendered as a dot grid.
const CONTINENTS: Blob[] = [
  { cx: 150, cy: 120, rx: 95, ry: 62, rot: -18 }, // North America
  { cx: 235, cy: 260, rx: 40, ry: 92, rot: 12 }, // South America
  { cx: 420, cy: 95, rx: 46, ry: 30, rot: 0 }, // Europe
  { cx: 430, cy: 225, rx: 54, ry: 98, rot: 0 }, // Africa
  { cx: 575, cy: 108, rx: 148, ry: 76, rot: -8 }, // Asia
  { cx: 655, cy: 292, rx: 44, ry: 26, rot: 0 }, // Australia
];

const MAP_W = 800;
const MAP_H = 400;
const GRID_STEP = 13;

function insideBlob(x: number, y: number, b: Blob) {
  const rad = (b.rot * Math.PI) / 180;
  const dx = x - b.cx;
  const dy = y - b.cy;
  const rx = dx * Math.cos(-rad) - dy * Math.sin(-rad);
  const ry = dx * Math.sin(-rad) + dy * Math.cos(-rad);
  return (rx * rx) / (b.rx * b.rx) + (ry * ry) / (b.ry * b.ry) <= 1;
}

function generateDots(seed: number) {
  // simple deterministic pseudo-random so the map doesn't reshuffle on re-render
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  const dots: { x: number; y: number; r: number }[] = [];
  for (let y = 8; y < MAP_H; y += GRID_STEP) {
    for (let x = 8; x < MAP_W; x += GRID_STEP) {
      const jx = x + (rand() - 0.5) * 5;
      const jy = y + (rand() - 0.5) * 5;
      if (CONTINENTS.some((b) => insideBlob(jx, jy, b))) {
        dots.push({ x: jx, y: jy, r: 1.3 + rand() * 0.9 });
      }
    }
  }
  return dots;
}

type Arc = {
  id: number;
  path: string;
  delay: number;
  duration: number;
};

function generateArcs(count: number, radius: number, center: number, seed: number): Arc[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  const arcs: Arc[] = [];
  for (let i = 0; i < count; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = radius * (0.75 + rand() * 0.22);
    const x1 = center + Math.cos(angle) * dist;
    const y1 = center + Math.sin(angle) * dist;

    // control point bows the line outward, away from a straight chord,
    // so arcs read as "arriving" rather than cutting straight through
    const bow = 0.35 + rand() * 0.25;
    const mx = center + (x1 - center) * bow;
    const my = center + (y1 - center) * bow;
    const perpX = -(y1 - center);
    const perpY = x1 - center;
    const perpLen = Math.hypot(perpX, perpY) || 1;
    const bowStrength = 18 + rand() * 22;
    const cx = mx + (perpX / perpLen) * bowStrength * (rand() > 0.5 ? 1 : -1);
    const cy = my + (perpY / perpLen) * bowStrength * (rand() > 0.5 ? 1 : -1);

    arcs.push({
      id: i,
      path: `M${x1.toFixed(1)},${y1.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${center},${center}`,
      delay: rand() * 5,
      duration: 2.6 + rand() * 1.8,
    });
  }
  return arcs;
}

export default function WorldTreeGlobe({
  size = 420,
  arcCount = 9,
  rotationSeconds = 34,
  accent = "#F02330",
  dotColor = "#FFFFFF",
}: {
  size?: number;
  arcCount?: number;
  rotationSeconds?: number;
  accent?: string;
  dotColor?: string;
}) {
  const dots = useMemo(() => generateDots(7), []);
  const arcs = useMemo(() => generateArcs(arcCount, 190, 200, 42), [arcCount]);

  const mapHeightPx = size;
  const mapWidthPx = (MAP_W / MAP_H) * mapHeightPx;

  return (
    <div
      className="wtg-root"
      style={{ width: size, height: size, ["--accent" as string]: accent, ["--dot" as string]: dotColor }}
    >
      <div className="wtg-glow" />

      <div className="wtg-clip">
        <div className="wtg-track">
          {[0, 1].map((copy) => (
            <svg
              key={copy}
              className="wtg-map"
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              width={mapWidthPx}
              height={mapHeightPx}
              preserveAspectRatio="none"
            >
              {dots.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r={d.r} className="wtg-dot" />
              ))}
            </svg>
          ))}
        </div>
      </div>

      <div className="wtg-shade" />
      <div className="wtg-ring" />

      <svg className="wtg-arcs" viewBox="0 0 400 400" width={size} height={size}>
        {arcs.map((a) => (
          <g key={a.id} style={{ animationDelay: `${a.delay}s`, animationDuration: `${a.duration}s` }} className="wtg-arc-group">
            <path d={a.path} className="wtg-arc-path" />
            <circle r="3.2" className="wtg-arc-dot">
              <animateMotion dur={`${a.duration}s`} begin={`${a.delay}s`} repeatCount="indefinite" path={a.path} />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.08;0.85;1"
                dur={`${a.duration}s`}
                begin={`${a.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        <circle cx="200" cy="200" r="9" className="wtg-hub-glow" />

        {/* mini Xonnect stroke mark, transparent bg — same hub+spoke geometry
            as the brand logo, scaled down to sit at the globe's center */}
        <g className="wtg-hub-mark">
          <line x1="200" y1="200" x2="192.1" y2="189" />
          <line x1="200" y1="200" x2="208.4" y2="189.7" />
          <line x1="200" y1="200" x2="213.9" y2="200" />
          <line x1="200" y1="200" x2="204.2" y2="211.2" />
          <line x1="200" y1="200" x2="188.8" y2="208.6" />

          <circle cx="200" cy="200" r="4.6" />
          <circle cx="192.1" cy="189" r="3.3" />
          <circle cx="208.4" cy="189.7" r="2.2" />
          <circle cx="213.9" cy="200" r="1.8" />
          <circle cx="204.2" cy="211.2" r="3.7" />
          <circle cx="188.8" cy="208.6" r="2.4" />
        </g>
      </svg>

      <style>{`
        .wtg-root{
          position: relative;
          border-radius: 9999px;
          overflow: visible;
        }
        .wtg-glow{
          position: absolute;
          inset: -10%;
          border-radius: 9999px;
          background: radial-gradient(circle at 38% 32%, var(--accent) 0%, transparent 60%);
          opacity: 0.16;
          filter: blur(18px);
          pointer-events: none;
        }
        .wtg-clip{
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          overflow: hidden;
          background: #0c0e13;
        }
        .wtg-track{
          display: flex;
          width: fit-content;
          height: 100%;
          animation: wtg-rotate ${rotationSeconds}s linear infinite;
        }
        @keyframes wtg-rotate{
          from{ transform: translateX(0); }
          to{ transform: translateX(-50%); }
        }
        .wtg-map{ display:block; flex-shrink: 0; }
        .wtg-dot{ fill: var(--dot); opacity: 0.55; }

        .wtg-shade{
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background:
            radial-gradient(circle at 32% 28%, rgba(255,255,255,0.10) 0%, transparent 40%),
            radial-gradient(circle at 68% 78%, rgba(0,0,0,0.55) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%);
          pointer-events: none;
        }
        .wtg-ring{
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          border: 1.5px solid rgba(255,255,255,0.18);
          box-shadow: 0 0 0 1px rgba(0,0,0,0.4) inset;
          pointer-events: none;
        }

        .wtg-arcs{
          position: absolute;
          inset: 0;
          overflow: visible;
          pointer-events: none;
        }
        .wtg-arc-group{
          animation-name: wtg-arc-fade;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes wtg-arc-fade{
          0%{ opacity: 0; }
          8%{ opacity: 0.9; }
          82%{ opacity: 0.9; }
          100%{ opacity: 0; }
        }
        .wtg-arc-path{
          fill: none;
          stroke: var(--accent);
          stroke-width: 1.4;
          stroke-linecap: round;
          opacity: 0.55;
        }
        .wtg-arc-dot{ fill: var(--accent); }

        .wtg-hub-glow{
          fill: var(--accent);
          opacity: 0.25;
          animation: wtg-hub-pulse 2.2s ease-in-out infinite;
        }
        @keyframes wtg-hub-pulse{
          0%,100%{ opacity: 0.15; r: 8; }
          50%{ opacity: 0.4; r: 13; }
        }
        .wtg-hub-mark{
          fill: transparent;
          stroke: var(--dot);
          stroke-width: 2.6;
          stroke-linecap: round;
          transform-origin: 200px 200px;
          animation: wtg-mark-breathe 2.2s ease-in-out infinite;
        }
        @keyframes wtg-mark-breathe{
          0%,100%{ transform: scale(1); }
          50%{ transform: scale(1.08); }
        }

        @media (prefers-reduced-motion: reduce){
          .wtg-track, .wtg-arc-group, .wtg-hub-glow, .wtg-hub-mark{ animation: none !important; }
          .wtg-arc-group{ opacity: 0.7 !important; }
        }
      `}</style>
    </div>
  );
}
