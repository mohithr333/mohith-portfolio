"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 h-[2px] z-[200] pointer-events-none"
      style={{
        width: "0%",
        background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
        boxShadow: "0 0 8px rgba(124,58,237,0.6)",
      }}
    />
  );
}
