"use client";

import { useEffect, useRef } from "react";

// ── Constants ────────────────────────────────────────────────────────────────
const SUITS = ["♥", "♦", "♣", "♠"] as const;
const RANKS = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"] as const;
type Card = { suit: string; rank: string };

const CW  = 62;   // card width
const CH  = 88;   // card height  (ratio ≈ 1 : 1.42 — standard playing card)
const HR  = 115;  // hub radius   (gap between fan centre and inner card edge)
const N   = 52;
const SZ  = (HR + CH) * 2 + 70;  // canvas CSS size ≈ 476

const V   = "#7c3aed";   // violet
const CY  = "#06b6d4";   // cyan
const BG  = "#0e0f1a";   // card face background
const KING_IDX = 13;

const col = (s: string) => s === "♥" || s === "♦" ? V : CY;

// ── Helpers ──────────────────────────────────────────────────────────────────
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y,     x + w, y + r,     r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x,     y + h, x,     y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x,     y,     x + r, y,         r);
  ctx.closePath();
}

function drawCard(
  ctx: CanvasRenderingContext2D,
  card: Card,
  scale = 1,
  glow  = 0,
) {
  const c  = col(card.suit);
  const hw = CW / 2, hh = CH / 2;

  ctx.save();
  ctx.scale(scale, scale);

  // Glow pass (King only)
  if (glow > 0) {
    ctx.shadowColor = `rgba(124,58,237,${glow * 0.85})`;
    ctx.shadowBlur  = 18;
  }

  // Card body
  roundRect(ctx, -hw, -hh, CW, CH, 4);
  ctx.fillStyle = BG;
  ctx.fill();

  ctx.shadowBlur = 0;

  // Border
  roundRect(ctx, -hw + 1, -hh + 1, CW - 2, CH - 2, 3);
  ctx.strokeStyle = c;
  ctx.lineWidth   = glow > 0 ? 1.2 : 0.7;
  ctx.globalAlpha = glow > 0 ? 1 : 0.55;
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Corner index — top-left
  ctx.fillStyle   = c;
  ctx.textAlign   = "left";
  ctx.textBaseline = "top";
  ctx.font = `bold ${card.rank === "10" ? 8 : 9}px Georgia,serif`;
  ctx.fillText(card.rank, -hw + 4, -hh + 3);
  ctx.font = `8px Georgia,serif`;
  ctx.fillText(card.suit, -hw + 4.5, -hh + 13);

  // Centre pip
  ctx.font = "17px Georgia,serif";
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.globalAlpha  = 0.45;
  ctx.fillText(card.suit, 0, 2);
  ctx.globalAlpha  = 1;

  // Corner index — bottom-right (rotated 180°)
  ctx.save();
  ctx.rotate(Math.PI);
  ctx.textAlign    = "left";
  ctx.textBaseline = "top";
  ctx.font = `bold ${card.rank === "10" ? 8 : 9}px Georgia,serif`;
  ctx.fillText(card.rank, -hw + 4, -hh + 3);
  ctx.font = `8px Georgia,serif`;
  ctx.fillText(card.suit, -hw + 4.5, -hh + 13);
  ctx.restore();

  ctx.restore();
}

// ── Particle ─────────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; size: number; hue: number;
}

// ── Component ────────────────────────────────────────────────────────────────
export default function HeroCards() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // HiDPI — keeps text crisp on retina
    const dpr    = window.devicePixelRatio || 1;
    canvas.width  = SZ * dpr;
    canvas.height = SZ * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    // ── Build shuffled deck (King♥ at slot KING_IDX) ─────────────────────
    const deck: Card[] = (SUITS as readonly string[]).flatMap(s =>
      (RANKS as readonly string[]).map(r => ({ suit: s, rank: r }))
    );
    const rest = deck.filter(c => !(c.suit === "♥" && c.rank === "K"));
    for (let i = rest.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rest[i], rest[j]] = [rest[j], rest[i]];
    }
    rest.splice(KING_IDX, 0, { suit: "♥", rank: "K" });

    // ── Animation state ──────────────────────────────────────────────────
    const cx = SZ / 2, cy = SZ / 2;
    let fanAngle    = 0;
    let fanSpeed    = 0.004;
    let fanTarget   = 0.004;
    let kingScale   = 0;
    let kingVel     = 0;
    let kingTarget  = 0;
    let kingSpawned = false;
    const particles: Particle[] = [];

    const spawnBurst = () => {
      const a  = (KING_IDX / N) * Math.PI * 2 + fanAngle;
      const kx = cx + Math.sin(a) * (HR + CH * 0.5);
      const ky = cy - Math.cos(a) * (HR + CH * 0.5);
      for (let i = 0; i < 60; i++) {
        const pa  = Math.random() * Math.PI * 2;
        const spd = 1.5 + Math.random() * 4.5;
        particles.push({
          x: kx, y: ky,
          vx: Math.cos(pa) * spd, vy: Math.sin(pa) * spd,
          life: 1, size: 1.5 + Math.random() * 3,
          hue:  255 + Math.random() * 40,
        });
      }
    };

    const popTimer = setTimeout(() => { kingTarget = 1; }, 1600);

    // ── RAF loop ─────────────────────────────────────────────────────────
    let rafId: number;
    const tick = () => {
      // Fan spin
      fanSpeed += (fanTarget - fanSpeed) * 0.03;
      fanAngle += fanSpeed;

      // King spring (overshoots naturally for a pop feel)
      kingVel    = (kingVel + (kingTarget - kingScale) * 0.1) * 0.72;
      kingScale += kingVel;
      if (!kingSpawned && kingScale > 0.05) {
        kingSpawned = true;
        spawnBurst();
      }

      // Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.07;          // gravity
        p.life -= 0.017;
        if (p.life <= 0) particles.splice(i, 1);
      }

      // ── Draw ────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, SZ, SZ);

      // Ambient hub glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, HR * 0.9);
      grd.addColorStop(0, "rgba(124,58,237,0.13)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, SZ, SZ);

      // Cards (low → high index = bottom → top of z-stack)
      for (let i = 0; i < N; i++) {
        const isKing = i === KING_IDX;
        if (isKing && kingScale < 0.01) continue;

        const a = (i / N) * Math.PI * 2 + fanAngle;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(a);
        ctx.translate(0, -(HR + CH / 2));  // card centre sits in the ring

        drawCard(
          ctx, rest[i],
          isKing ? Math.max(0, kingScale) : 1,
          isKing ? Math.min(1, kingScale) : 0,
        );
        ctx.restore();
      }

      // Particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},85%,70%,${p.life})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Hover speed
    const onEnter = () => { fanTarget = 0.022; };
    const onLeave = () => { fanTarget = 0.004; };
    canvas.addEventListener("mouseenter", onEnter);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(popTimer);
      canvas.removeEventListener("mouseenter", onEnter);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: SZ, height: SZ }}
      className="select-none"
    />
  );
}
