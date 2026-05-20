"use client";

import { useEffect, useRef } from "react";

const TRACES = [
  { d: "M 80 120 L 80 220 L 220 220 L 220 320",          dur: "6s",  color: "var(--wb-v)" },
  { d: "M 1280 100 L 1280 200 L 1160 200 L 1160 320",    dur: "8s",  color: "var(--wb-v)" },
  { d: "M 60 720 L 180 720 L 180 600",                    dur: "7s",  color: "var(--wb-c)" },
  { d: "M 1340 480 L 1240 480 L 1240 380 L 1140 380",    dur: "9s",  color: "var(--wb-v)" },
  { d: "M 1380 760 L 1380 660 L 1260 660",               dur: "10s", color: "var(--wb-c)" },
];

const NODES = [
  { x: 220,  y: 320, color: "var(--wb-v)", dur: "2.8s" },
  { x: 1160, y: 320, color: "var(--wb-c)", dur: "3.4s" },
  { x: 180,  y: 600, color: "var(--wb-c)", dur: "4.2s" },
  { x: 1140, y: 380, color: "var(--wb-v)", dur: "3.1s" },
];

export default function Workbench() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    let tx = 50, ty = 35;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth) * 100;
      ty = (e.clientY / window.innerHeight) * 100;
      if (!raf) raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${tx}%`);
        el.style.setProperty("--my", `${ty}%`);
        raf = 0;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none"
      style={{
        position: "fixed", inset: 0, zIndex: 0,
        // CSS vars for accent colours (updated by theme if needed)
        ["--wb-v" as string]: "#7c3aed",
        ["--wb-c" as string]: "#06b6d4",
      }}
    >
      {/* Tonal blobs */}
      <div style={{
        position: "absolute", width: 480, height: 480, borderRadius: "50%",
        background: "#7c3aed", filter: "blur(110px)", opacity: 0.38,
        top: -160, left: -120,
      }} />
      <div style={{
        position: "absolute", width: 520, height: 520, borderRadius: "50%",
        background: "#06b6d4", filter: "blur(110px)", opacity: 0.22,
        bottom: -200, right: -160,
      }} />

      {/* Dot lattice */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(226,232,240,0.13) 1px, transparent 0)",
        backgroundSize: "28px 28px",
      }} />

      {/* SVG: circuit traces, IoT nodes, radar sweep */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden="true"
      >
        {/* Traces */}
        <g fill="none" strokeLinecap="round" strokeWidth="1">
          {TRACES.map((t, i) => (
            <g key={i}>
              <path d={t.d} stroke={t.color} strokeOpacity="0.16" />
              <path d={t.d} stroke={t.color} strokeOpacity="0.6" strokeDasharray="3 14">
                <animate attributeName="stroke-dashoffset" values="0;-34" dur={t.dur} repeatCount="indefinite" />
              </path>
              <circle r="2.5" fill={t.color} fillOpacity="0.7">
                <animateMotion dur={t.dur} repeatCount="indefinite" path={t.d} />
              </circle>
            </g>
          ))}
        </g>

        {/* IoT nodes */}
        {NODES.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="3" fill={n.color} opacity="0.9" />
            <circle cx={n.x} cy={n.y} r="3" fill="none" stroke={n.color} strokeWidth="1" opacity="0.5">
              <animate attributeName="r"       values="3;22;3"         dur={n.dur} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.55;0;0.55"    dur={n.dur} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* Radar sweep — bottom-right */}
        <g transform="translate(1280 760)" opacity="0.28">
          <circle r="140" fill="none" stroke="#06b6d4" strokeWidth="0.6" opacity="0.5" />
          <circle r="92"  fill="none" stroke="#06b6d4" strokeWidth="0.6" opacity="0.35" />
          <circle r="48"  fill="none" stroke="#06b6d4" strokeWidth="0.6" opacity="0.25" />
          <defs>
            <linearGradient id="wbsweep" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"   />
            </linearGradient>
          </defs>
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="18s" repeatCount="indefinite" />
            <path d="M 0 0 L 140 0 L 140 -30 Z" fill="url(#wbsweep)" />
          </g>
          <circle r="2" fill="#06b6d4" />
        </g>

        {/* Workbench margin labels */}
        <g fontFamily="'Geist Mono', ui-monospace, monospace" fontSize="10" fill="#6b7280" opacity="0.45">
          <text x="56"  y="870">/ workbench · v1</text>
          <text x="1384" y="870" textAnchor="end">52.52°N · 13.40°E · MITTE</text>
        </g>
      </svg>

      {/* Cursor spotlight */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(600px circle at var(--mx, 50%) var(--my, 35%), rgba(124,58,237,0.08), transparent 50%)",
      }} />

      {/* Edge vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, transparent 40%, #090a0f 100%)",
      }} />
    </div>
  );
}
