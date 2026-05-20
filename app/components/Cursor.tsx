"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = -100, mouseY = -100;
    let scale = 1;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onEnter = () => { scale = 2.5; };
    const onLeave = () => { scale = 1; };

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px) scale(${scale})`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const attachListeners = () => {
      document.querySelectorAll<HTMLElement>("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(animate);
    attachListeners();

    const mo = new MutationObserver(attachListeners);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      mo.disconnect();
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#7c3aed] rounded-full pointer-events-none z-[9999]"
      style={{ willChange: "transform", transition: "transform 0.15s ease, scale 0.2s ease" }}
    />
  );
}
