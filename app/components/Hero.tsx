"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "./Icons";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";
const NAME = "Mohith Ramesh";

const roles = ["IoT Builder", "Software Developer", "Rapid Prototyper", "MSc AI Student"];
const rand = () => CHARS[Math.floor(Math.random() * CHARS.length)];

function Typewriter() {
  const [text, setText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = roles[roleIdx];
    if (!deleting && text.length < role.length) {
      const t = setTimeout(() => setText(role.slice(0, text.length + 1)), 80);
      return () => clearTimeout(t);
    }
    if (!deleting && text.length === role.length) {
      const t = setTimeout(() => setDeleting(true), 2400);
      return () => clearTimeout(t);
    }
    if (deleting && text.length > 0) {
      const t = setTimeout(() => setText(text.slice(0, -1)), 40);
      return () => clearTimeout(t);
    }
    if (deleting && text.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
  }, [text, deleting, roleIdx]);

  return (
    <span className="text-white">
      {text}
      <span className="animate-pulse text-[#7c3aed] ml-0.5">|</span>
    </span>
  );
}

export default function Hero() {
  const [ready, setReady] = useState(false);
  const [display, setDisplay] = useState(NAME.replace(/[^ ]/g, "#"));
  const [locked, setLocked] = useState(0);
  const [scrambling, setScrambling] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setReady(true);
      setScrambling(true);
      setDisplay(NAME.replace(/[^ ]/g, rand));
    }, 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!scrambling || locked >= NAME.length) return;
    const cycleId = setInterval(() => {
      setDisplay(
        NAME.split("").map((c, i) => (c === " " ? " " : i < locked ? c : rand())).join("")
      );
    }, 50);
    const lockId = setTimeout(() => setLocked((l) => l + 1), locked === 0 ? 80 : 100);
    return () => { clearInterval(cycleId); clearTimeout(lockId); };
  }, [scrambling, locked]);

  useEffect(() => {
    if (locked >= NAME.length && scrambling) {
      setDisplay(NAME);
      setScrambling(false);
    }
  }, [locked, scrambling]);

  const show = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  });

  return (
    <>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.6); }
        }
        @keyframes scrollline {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          51%  { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
        .scroll-line { animation: scrollline 1.8s ease-in-out infinite; }
      `}</style>

      <section className="relative min-h-screen flex items-center px-6 pt-16 overflow-hidden">
        <div className="relative w-full flex justify-center">
          <div style={{ maxWidth: 720, width: "100%", transform: "translateX(-4%)" }}>

            {/* Eyebrow */}
            <motion.p {...show(0)} className="flex items-center gap-2 text-[#7c3aed] text-xs font-mono tracking-[0.2em] uppercase mb-5">
              <span style={{
                display: "inline-block", width: 6, height: 6,
                borderRadius: "50%", background: "#7c3aed",
                animation: "pulse-dot 2s ease-in-out infinite",
              }} />
              Hi, I&apos;m
            </motion.p>

            {/* Name scramble */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: ready ? 1 : 0 }}
              transition={{ duration: 0.12 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-4"
            >
              {scrambling || locked < NAME.length
                ? display.split("").map((char, i) => (
                    <span key={i} style={{
                      color: i < locked ? "#ffffff" : "#7c3aed",
                      textShadow: i < locked ? "none" : "0 0 10px rgba(124,58,237,0.7)",
                    }}>
                      {char === " " ? " " : char}
                    </span>
                  ))
                : <span className="text-white">Mohith Ramesh</span>
              }
            </motion.h1>

            {/* Subtitle + typewriter */}
            <motion.h2 {...show(0.2)} className="text-lg md:text-xl text-[#94a3b8] font-light mb-6 h-8">
              MSc AI Student
              <span className="mx-3 text-[#7c3aed]">·</span>
              <Typewriter />
            </motion.h2>

            {/* Tagline */}
            <motion.p {...show(0.4)} className="text-[#6b7280] max-w-lg leading-relaxed mb-10 text-sm md:text-base">
              I build real systems — IoT devices, embedded hardware, and web
              applications. Based in Berlin, studying Artificial Intelligence, and
              looking for{" "}
              <span className="text-[#94a3b8]">working student roles</span> where
              I can learn fast and ship things that work.
            </motion.p>

            {/* CTA buttons */}
            <motion.div {...show(0.6)} className="flex flex-wrap gap-3 mb-10">
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center h-[46px] px-[22px] bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm rounded-[10px] font-medium transition-all duration-200 overflow-hidden"
              >
                <span className="relative z-10">View Projects</span>
                <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center h-[46px] px-[22px] border border-white/[0.1] hover:border-[#7c3aed]/50 text-[#94a3b8] hover:text-white text-sm rounded-[10px] font-medium transition-all duration-200 hover:bg-[#7c3aed]/10"
              >
                Download Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center h-[46px] px-[22px] border border-white/[0.1] hover:border-white/20 text-[#94a3b8] hover:text-white text-sm rounded-[10px] font-medium transition-all duration-200 hover:bg-white/[0.04]"
              >
                Contact
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div {...show(0.75)} className="flex items-center gap-5">
              <a
                href="https://github.com/mohithr333"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#475569] hover:text-[#94a3b8] transition-colors text-sm group"
              >
                <span className="group-hover:scale-110 transition-transform duration-200">
                  <GithubIcon size={18} />
                </span>
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/mohith-ramesh-4a2b77364"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#475569] hover:text-[#94a3b8] transition-colors text-sm group"
              >
                <span className="group-hover:scale-110 transition-transform duration-200">
                  <LinkedinIcon size={18} />
                </span>
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#about"
          aria-label="Scroll down"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#374151] hover:text-[#6b7280] transition-colors"
        >
          <div style={{
            width: 1, height: 32, background: "currentColor",
            transformOrigin: "top",
          }} className="scroll-line" />
        </a>
      </section>
    </>
  );
}
