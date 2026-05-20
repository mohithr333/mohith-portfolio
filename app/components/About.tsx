"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { target: 6, suffix: "+", label: "Projects Built" },
  { target: 3, suffix: "+", label: "Years of Building" },
  { target: 10, suffix: "+", label: "Technologies Used" },
  { target: 2, suffix: "", label: "Countries Studied In" },
];

const highlights = [
  "Built embedded systems combining hardware sensors with cloud platforms",
  "Practical startup experience with real client projects at Hackedin Solutions",
  "Comfortable across the stack — from Verilog HDL to React frontends",
  "Use AI-augmented workflows to prototype and ship faster",
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const duration = 1600;
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-2xl font-bold text-white mb-1">
      {count}
      {suffix}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#7c3aed] text-xs font-mono tracking-[0.2em] uppercase mb-3">
              About me
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              Practical builder.
              <br />
              <span className="text-[#94a3b8] font-normal">Fast learner.</span>
            </h2>
            <p className="text-[#6b7280] leading-relaxed mb-5 text-sm md:text-base">
              I&apos;m an Electronics &amp; Communication Engineering graduate now
              pursuing my Master&apos;s in AI at a Berlin university. My background
              is in embedded systems and IoT — I&apos;ve built everything from face
              recognition door locks to automated hydroponics systems.
            </p>
            <p className="text-[#6b7280] leading-relaxed mb-8 text-sm md:text-base">
              At Hackedin Solutions I worked directly with clients on software
              projects, picking up full-stack and coordination skills alongside
              my hardware work. I care about building things that actually work,
              not just look good in a presentation.
            </p>

            <ul className="space-y-3">
              {highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.09 }}
                  className="flex items-start gap-3 text-sm text-[#6b7280]"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7c3aed] flex-shrink-0" />
                  {h}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.09 }}
                whileHover={{ scale: 1.03 }}
                className="rounded-xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] p-6 transition-colors duration-200"
              >
                <Counter target={s.target} suffix={s.suffix} />
                <div className="text-xs text-[#64748b]">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
