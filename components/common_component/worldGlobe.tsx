// "use client";

// import { useMemo } from "react";

// /**
//  * WorldTreeGlobe
//  * ----------------------------------------------------------------
//  * A rotating dot-matrix world map inside a circular "globe" viewport,
//  * with animated connection arcs converging on a central hub — meant
//  * to read as "streaming in from anywhere in the world, into Xonnect."
//  *
//  * - No external map assets, no extra npm packages. Pure SVG + CSS.
//  * - Continents are stylized dot blobs (not real geo data) — good
//  *   enough to read as a world map at hero-graphic scale.
//  * - The illusion of globe rotation is a classic trick: the dotted
//  *   map is duplicated side-by-side and scrolled horizontally inside
//  *   a circular clip.
//  *
//  * Usage:
//  *   <WorldTreeGlobe size={420} />
//  */

// type Blob = { cx: number; cy: number; rx: number; ry: number; rot: number };

// // Rough stylized continent placements on an 800x400 equirectangular canvas.
// // Not geographically precise — tuned to read as recognizable landmasses
// // once rendered as a dot grid.
// const CONTINENTS: Blob[] = [
//   { cx: 150, cy: 120, rx: 95, ry: 62, rot: -18 }, // North America
//   { cx: 235, cy: 260, rx: 40, ry: 92, rot: 12 }, // South America
//   { cx: 420, cy: 95, rx: 46, ry: 30, rot: 0 }, // Europe
//   { cx: 430, cy: 225, rx: 54, ry: 98, rot: 0 }, // Africa
//   { cx: 575, cy: 108, rx: 148, ry: 76, rot: -8 }, // Asia
//   { cx: 655, cy: 292, rx: 44, ry: 26, rot: 0 }, // Australia
// ];

// const MAP_W = 800;
// const MAP_H = 400;
// const GRID_STEP = 13;

// function insideBlob(x: number, y: number, b: Blob) {
//   const rad = (b.rot * Math.PI) / 180;
//   const dx = x - b.cx;
//   const dy = y - b.cy;
//   const rx = dx * Math.cos(-rad) - dy * Math.sin(-rad);
//   const ry = dx * Math.sin(-rad) + dy * Math.cos(-rad);
//   return (rx * rx) / (b.rx * b.rx) + (ry * ry) / (b.ry * b.ry) <= 1;
// }

// function generateDots(seed: number) {
//   // simple deterministic pseudo-random so the map doesn't reshuffle on re-render
//   let s = seed;
//   const rand = () => {
//     s = (s * 9301 + 49297) % 233280;
//     return s / 233280;
//   };

//   const dots: { x: number; y: number; r: number }[] = [];
//   for (let y = 8; y < MAP_H; y += GRID_STEP) {
//     for (let x = 8; x < MAP_W; x += GRID_STEP) {
//       const jx = x + (rand() - 0.5) * 5;
//       const jy = y + (rand() - 0.5) * 5;
//       if (CONTINENTS.some((b) => insideBlob(jx, jy, b))) {
//         dots.push({ x: jx, y: jy, r: 1.3 + rand() * 0.9 });
//       }
//     }
//   }
//   return dots;
// }

// type Arc = {
//   id: number;
//   path: string;
//   delay: number;
//   duration: number;
// };

// function generateArcs(count: number, radius: number, center: number, seed: number): Arc[] {
//   let s = seed;
//   const rand = () => {
//     s = (s * 9301 + 49297) % 233280;
//     return s / 233280;
//   };

//   const arcs: Arc[] = [];
//   for (let i = 0; i < count; i++) {
//     const angle = rand() * Math.PI * 2;
//     const dist = radius * (0.75 + rand() * 0.22);
//     const x1 = center + Math.cos(angle) * dist;
//     const y1 = center + Math.sin(angle) * dist;

//     // control point bows the line outward, away from a straight chord,
//     // so arcs read as "arriving" rather than cutting straight through
//     const bow = 0.35 + rand() * 0.25;
//     const mx = center + (x1 - center) * bow;
//     const my = center + (y1 - center) * bow;
//     const perpX = -(y1 - center);
//     const perpY = x1 - center;
//     const perpLen = Math.hypot(perpX, perpY) || 1;
//     const bowStrength = 18 + rand() * 22;
//     const cx = mx + (perpX / perpLen) * bowStrength * (rand() > 0.5 ? 1 : -1);
//     const cy = my + (perpY / perpLen) * bowStrength * (rand() > 0.5 ? 1 : -1);

//     arcs.push({
//       id: i,
//       path: `M${x1.toFixed(1)},${y1.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${center},${center}`,
//       delay: rand() * 5,
//       duration: 2.6 + rand() * 1.8,
//     });
//   }
//   return arcs;
// }

// export default function WorldTreeGlobe({
//   size = 420,
//   arcCount = 9,
//   rotationSeconds = 34,
//   accent = "#F02330",
//   dotColor = "#FFFFFF",
// }: {
//   size?: number;
//   arcCount?: number;
//   rotationSeconds?: number;
//   accent?: string;
//   dotColor?: string;
// }) {
//   const dots = useMemo(() => generateDots(7), []);
//   const arcs = useMemo(() => generateArcs(arcCount, 190, 200, 42), [arcCount]);

//   const mapHeightPx = size;
//   const mapWidthPx = (MAP_W / MAP_H) * mapHeightPx;

//   return (
//     <div
//       className="wtg-root"
//       style={{ width: size, height: size, ["--accent" as string]: accent, ["--dot" as string]: dotColor }}
//     >
//       <div className="wtg-glow" />

//       <div className="wtg-clip">
//         <div className="wtg-track">
//           {[0, 1].map((copy) => (
//             <svg
//               key={copy}
//               className="wtg-map"
//               viewBox={`0 0 ${MAP_W} ${MAP_H}`}
//               width={mapWidthPx}
//               height={mapHeightPx}
//               preserveAspectRatio="none"
//             >
//               {dots.map((d, i) => (
//                 <circle key={i} cx={d.x} cy={d.y} r={d.r} className="wtg-dot" />
//               ))}
//             </svg>
//           ))}
//         </div>
//       </div>

//       <div className="wtg-shade" />
//       <div className="wtg-ring" />

//       <svg className="wtg-arcs" viewBox="0 0 400 400" width={size} height={size}>
//         {arcs.map((a) => (
//           <g key={a.id} style={{ animationDelay: `${a.delay}s`, animationDuration: `${a.duration}s` }} className="wtg-arc-group">
//             <path d={a.path} className="wtg-arc-path" />
//             <circle r="3.2" className="wtg-arc-dot">
//               <animateMotion dur={`${a.duration}s`} begin={`${a.delay}s`} repeatCount="indefinite" path={a.path} />
//               <animate
//                 attributeName="opacity"
//                 values="0;1;1;0"
//                 keyTimes="0;0.08;0.85;1"
//                 dur={`${a.duration}s`}
//                 begin={`${a.delay}s`}
//                 repeatCount="indefinite"
//               />
//             </circle>
//           </g>
//         ))}

//         <circle cx="200" cy="200" r="9" className="wtg-hub-glow" />

//         {/* mini Xonnect stroke mark, transparent bg — same hub+spoke geometry
//             as the brand logo, scaled down to sit at the globe's center */}
//         <g className="wtg-hub-mark">
//           <line x1="200" y1="200" x2="192.1" y2="189" />
//           <line x1="200" y1="200" x2="208.4" y2="189.7" />
//           <line x1="200" y1="200" x2="213.9" y2="200" />
//           <line x1="200" y1="200" x2="204.2" y2="211.2" />
//           <line x1="200" y1="200" x2="188.8" y2="208.6" />

//           <circle cx="200" cy="200" r="4.6" />
//           <circle cx="192.1" cy="189" r="3.3" />
//           <circle cx="208.4" cy="189.7" r="2.2" />
//           <circle cx="213.9" cy="200" r="1.8" />
//           <circle cx="204.2" cy="211.2" r="3.7" />
//           <circle cx="188.8" cy="208.6" r="2.4" />
//         </g>
//       </svg>

//       <style>{`
//         .wtg-root{
//           position: relative;
//           border-radius: 9999px;
//           overflow: visible;
//         }
//         .wtg-glow{
//           position: absolute;
//           inset: -10%;
//           border-radius: 9999px;
//           background: radial-gradient(circle at 38% 32%, var(--accent) 0%, transparent 60%);
//           opacity: 0.16;
//           filter: blur(18px);
//           pointer-events: none;
//         }
//         .wtg-clip{
//           position: absolute;
//           inset: 0;
//           border-radius: 9999px;
//           overflow: hidden;
//           background: #0c0e13;
//         }
//         .wtg-track{
//           display: flex;
//           width: fit-content;
//           height: 100%;
//           animation: wtg-rotate ${rotationSeconds}s linear infinite;
//         }
//         @keyframes wtg-rotate{
//           from{ transform: translateX(0); }
//           to{ transform: translateX(-50%); }
//         }
//         .wtg-map{ display:block; flex-shrink: 0; }
//         .wtg-dot{ fill: var(--dot); opacity: 0.55; }

//         .wtg-shade{
//           position: absolute;
//           inset: 0;
//           border-radius: 9999px;
//           background:
//             radial-gradient(circle at 32% 28%, rgba(255,255,255,0.10) 0%, transparent 40%),
//             radial-gradient(circle at 68% 78%, rgba(0,0,0,0.55) 0%, transparent 60%),
//             radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%);
//           pointer-events: none;
//         }
//         .wtg-ring{
//           position: absolute;
//           inset: 0;
//           border-radius: 9999px;
//           border: 1.5px solid rgba(255,255,255,0.18);
//           box-shadow: 0 0 0 1px rgba(0,0,0,0.4) inset;
//           pointer-events: none;
//         }

//         .wtg-arcs{
//           position: absolute;
//           inset: 0;
//           overflow: visible;
//           pointer-events: none;
//         }
//         .wtg-arc-group{
//           animation-name: wtg-arc-fade;
//           animation-timing-function: ease-in-out;
//           animation-iteration-count: infinite;
//         }
//         @keyframes wtg-arc-fade{
//           0%{ opacity: 0; }
//           8%{ opacity: 0.9; }
//           82%{ opacity: 0.9; }
//           100%{ opacity: 0; }
//         }
//         .wtg-arc-path{
//           fill: none;
//           stroke: var(--accent);
//           stroke-width: 1.4;
//           stroke-linecap: round;
//           opacity: 0.55;
//         }
//         .wtg-arc-dot{ fill: var(--accent); }

//         .wtg-hub-glow{
//           fill: var(--accent);
//           opacity: 0.25;
//           animation: wtg-hub-pulse 2.2s ease-in-out infinite;
//         }
//         @keyframes wtg-hub-pulse{
//           0%,100%{ opacity: 0.15; r: 8; }
//           50%{ opacity: 0.4; r: 13; }
//         }
//         .wtg-hub-mark{
//           fill: transparent;
//           stroke: var(--dot);
//           stroke-width: 2.6;
//           stroke-linecap: round;
//           transform-origin: 200px 200px;
//           animation: wtg-mark-breathe 2.2s ease-in-out infinite;
//         }
//         @keyframes wtg-mark-breathe{
//           0%,100%{ transform: scale(1); }
//           50%{ transform: scale(1.08); }
//         }

//         @media (prefers-reduced-motion: reduce){
//           .wtg-track, .wtg-arc-group, .wtg-hub-glow, .wtg-hub-mark{ animation: none !important; }
//           .wtg-arc-group{ opacity: 0.7 !important; }
//         }
//       `}</style>
//     </div>
//   );
// }


























"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * WorldTreeGlobe (v2 - real globe)
 * ----------------------------------------------------------------
 * A real 3D dotted Earth (true country shapes) with red people-dots in
 * cities around the world, pulsing rings, and red arcs with traveling
 * "packets" streaming into the Xonnect hub.
 *
 * INSTALL (once):
 *   npm i react-globe.gl
 *   (if you get "Cannot find module 'three'":  npm i three)
 *
 * Usage (same as before):
 *   <WorldTreeGlobe size={420} />
 *
 * Props are the same as the old one, plus two optional extras:
 *   hub     -> [lat, lng] of the central hub (default Lagos)
 *   geoUrl  -> your own countries.geojson (e.g. "/countries.geojson"
 *              if you put the file in /public). Optional.
 */

// [lat, lng]
const CITIES: [number, number][] = [
  [40.7, -74.0], // New York
  [34.05, -118.2], // Los Angeles
  [43.7, -79.4], // Toronto
  [19.4, -99.1], // Mexico City
  [-23.5, -46.6], // Sao Paulo
  [-34.6, -58.4], // Buenos Aires
  [4.7, -74.1], // Bogota
  [51.5, -0.1], // London
  [48.85, 2.35], // Paris
  [52.5, 13.4], // Berlin
  [40.4, -3.7], // Madrid
  [41.0, 29.0], // Istanbul
  [55.75, 37.6], // Moscow
  [30.0, 31.2], // Cairo
  [-1.3, 36.8], // Nairobi
  [-26.2, 28.0], // Johannesburg
  [5.6, -0.2], // Accra
  [14.7, -17.4], // Dakar
  [25.2, 55.3], // Dubai
  [19.0, 72.8], // Mumbai
  [28.6, 77.2], // Delhi
  [1.35, 103.8], // Singapore
  [-6.2, 106.8], // Jakarta
  [14.6, 121.0], // Manila
  [31.2, 121.5], // Shanghai
  [37.6, 127.0], // Seoul
  [35.7, 139.7], // Tokyo
  [-33.9, 151.2], // Sydney
];

const GEO_URLS = [
  "https://unpkg.com/three-globe/example/datasets/ne_110m_admin_0_countries.geojson",
  "https://cdn.jsdelivr.net/npm/three-globe/example/datasets/ne_110m_admin_0_countries.geojson",
  "https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson",
];

function makeRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function rgba(hex: string, a: number) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

export default function WorldTreeGlobe({
  size = 420,
  arcCount = 14,
  rotationSeconds = 34,
  accent = "#F02330",
  dotColor = "#FFFFFF",
  hub = [6.5244, 3.3792],
  geoUrl,
}: {
  size?: number;
  arcCount?: number;
  rotationSeconds?: number;
  accent?: string;
  dotColor?: string;
  hub?: [number, number];
  geoUrl?: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Globe, setGlobe] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [countries, setCountries] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);

  // load the globe lib on the client only (avoids Next.js SSR "window" errors)
  useEffect(() => {
    let alive = true;
    import("react-globe.gl").then((m) => {
      if (alive) setGlobe(() => m.default);
    });
    return () => {
      alive = false;
    };
  }, []);

  // load real country shapes
  useEffect(() => {
    let alive = true;
    const urls = geoUrl ? [geoUrl, ...GEO_URLS] : GEO_URLS;
    (async () => {
      for (const url of urls) {
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const json = await res.json();
          if (alive && json?.features) setCountries(json.features);
          return;
        } catch {
          /* try next url */
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, [geoUrl]);

  // people dots: a cluster around every city
  const people = useMemo(() => {
    const rand = makeRand(11);
    const out: { lat: number; lng: number; hot: boolean }[] = [];
    CITIES.forEach(([lat, lng]) => {
      const n = 4 + Math.floor(rand() * 4);
      for (let i = 0; i < n; i++) {
        out.push({
          lat: lat + (rand() - 0.5) * 6,
          lng: lng + (rand() - 0.5) * 8,
          hot: rand() > 0.55,
        });
      }
    });
    out.push({ lat: hub[0], lng: hub[1], hot: true });
    return out;
  }, [hub]);

  // arcs: city -> hub, each with its own speed + start offset
  const arcs = useMemo(() => {
    const rand = makeRand(42);
    const order = [...CITIES].sort(() => rand() - 0.5).slice(0, Math.min(arcCount, CITIES.length));
    return order.map(([lat, lng]) => ({
      startLat: lat,
      startLng: lng,
      endLat: hub[0],
      endLng: hub[1],
      time: 2200 + rand() * 2400,
      gap: rand(),
    }));
  }, [arcCount, hub]);

  // pulsing rings at each arc origin + a bigger one at the hub
  const rings = useMemo(() => {
    const list = arcs.map((a, i) => ({
      lat: a.startLat,
      lng: a.startLng,
      maxR: 3.2,
      speed: 1.8,
      period: 1500 + (i % 5) * 300,
    }));
    list.push({ lat: hub[0], lng: hub[1], maxR: 7, speed: 3, period: 1400 });
    return list;
  }, [arcs, hub]);

  const reduced =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const setup = () => {
    const g = globeRef.current;
    if (!g) return;
    try {
      const controls = g.controls();
      controls.autoRotate = !reduced;
      controls.autoRotateSpeed = 60 / rotationSeconds; // 2.0 ~ 30s per turn
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableRotate = false; // so it never hijacks page scroll on mobile
    } catch {
      /* ignore */
    }
    try {
      g.pointOfView({ lat: 12, lng: hub[1], altitude: 1.9 }, 0);
    } catch {
      /* ignore */
    }
    try {
      const mat = g.globeMaterial?.();
      if (mat) {
        mat.color?.set?.("#0c0e13");
        mat.emissive?.set?.("#07080b");
        mat.shininess = 8;
      }
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    if (Globe) {
      const t = setTimeout(setup, 50);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Globe, rotationSeconds]);

  return (
    <div className="wtg-root" style={{ width: size, height: size, position: "relative" }}>
      <div
        style={{
          position: "absolute",
          inset: "-8%",
          borderRadius: 9999,
          background: `radial-gradient(circle at 50% 50%, ${accent} 0%, transparent 62%)`,
          opacity: 0.14,
          filter: "blur(22px)",
          pointerEvents: "none",
        }}
      />

      {Globe && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <Globe
            ref={globeRef}
            width={size}
            height={size}
            backgroundColor="rgba(0,0,0,0)"
            onGlobeReady={setup}
            /* globe body + glow */
            showAtmosphere
            atmosphereColor={accent}
            atmosphereAltitude={0.2}
            /* real land as dots */
            hexPolygonsData={countries}
            hexPolygonResolution={3}
            hexPolygonMargin={0.5}
            hexPolygonUseDots
            hexPolygonColor={() => rgba(dotColor, 0.7)}
            /* people */
            pointsData={people}
            pointLat="lat"
            pointLng="lng"
            pointAltitude={0.006}
            pointRadius={0.28}
            pointColor={(d: { hot: boolean }) => (d.hot ? accent : "#ffffff")}
            pointsMerge
            /* connections */
            arcsData={arcs}
            arcStartLat="startLat"
            arcStartLng="startLng"
            arcEndLat="endLat"
            arcEndLng="endLng"
            arcColor={() => [rgba(accent, 0.15), accent]}
            arcAltitudeAutoScale={0.38}
            arcStroke={0.55}
            arcDashLength={0.4}
            arcDashGap={1.1}
            arcDashInitialGap={(d: { gap: number }) => d.gap}
            arcDashAnimateTime={(d: { time: number }) => d.time}
            /* pulses */
            ringsData={rings}
            ringLat="lat"
            ringLng="lng"
            ringMaxRadius={(d: { maxR: number }) => d.maxR}
            ringPropagationSpeed={(d: { speed: number }) => d.speed}
            ringRepeatPeriod={(d: { period: number }) => d.period}
            ringColor={() => (t: number) => rgba(accent, Math.max(0, 1 - t))}
          />
        </div>
      )}
    </div>
  );
}
