"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "idle" | "entering" | "morphing" | "exiting";

export default function Intro() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<Phase>("idle");
  const [logo, setLogo] = useState({ x: 0, y: 0, fs: 80, op: 0 });

  const skip = () => {
    if (phase !== "idle" && phase !== "exiting") setPhase("exiting");
  };

  useEffect(() => {
    const x = window.innerWidth / 2 - 160;
    const y = window.innerHeight / 2 - 50;
    setLogo({ x, y, fs: 80, op: 0 });
    const t = setTimeout(() => setPhase("entering"), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === "entering") {
      setLogo((s) => ({ ...s, op: 1 }));
      const t = setTimeout(() => setPhase("morphing"), 900);
      return () => clearTimeout(t);
    }
    if (phase === "morphing") {
      setLogo({ x: 24, y: 19, fs: 18, op: 1 });
      // hold after spring settles, then exit
      const t = setTimeout(() => setPhase("exiting"), 1000);
      return () => clearTimeout(t);
    }
    if (phase === "exiting") {
      setVisible(false); // AnimatePresence plays exit animation, then onExitComplete fires
    }
  }, [phase]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        window.dispatchEvent(new CustomEvent("intro-complete"));
      }}
    >
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] bg-[#090a0f] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          onClick={skip}
        >
          {/* dot grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* breathing glow */}
          <motion.div
            className="absolute top-1/3 left-1/4 w-[560px] h-[560px] rounded-full bg-[#7c3aed]/10 blur-[130px] pointer-events-none"
            animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.85, 0.45] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* mohith. — fades in centered, then springs to navbar corner */}
          <motion.div
            className="fixed top-0 left-0 font-semibold tracking-tight text-white pointer-events-none select-none"
            animate={{
              x: logo.x,
              y: logo.y,
              fontSize: logo.fs,
              opacity: logo.op,
            }}
            transition={
              phase === "morphing"
                ? { type: "spring", stiffness: 75, damping: 16, mass: 1 }
                : { duration: 0.4, ease: "easeOut" }
            }
          >
            mohith<span style={{ color: "#7c3aed" }}>.</span>
          </motion.div>

          {/* skip hint */}
          <motion.p
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#2d3748] text-[10px] font-mono tracking-[0.3em] pointer-events-none select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            CLICK TO SKIP
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
