"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const bullets = [
  "Collaborated on client software projects end-to-end, from requirements gathering to delivery",
  "Provided technical support and troubleshooting across development environments",
  "Coordinated directly with clients to gather requirements and communicate progress",
  "Delivered technical workshops and training sessions for junior team members",
  "Worked within an agile startup environment with fast iteration cycles",
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[#7c3aed] text-xs font-mono tracking-[0.2em] uppercase mb-3">
            Where I&apos;ve worked
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Experience
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-8 max-w-3xl relative overflow-hidden"
        >
          {/* accent line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#7c3aed]/60 rounded-l-xl" />

          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h3 className="text-white font-semibold text-lg">
                Software Development Engineer
              </h3>
              <div className="flex items-center gap-1.5 mt-1.5">
                <Briefcase size={13} className="text-[#7c3aed]" />
                <span className="text-[#7c3aed] text-sm font-medium">
                  Hackedin Solutions
                </span>
                <span className="text-[#374151] text-sm">· Startup</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5 text-[#475569] text-xs">
              <div className="flex items-center gap-1.5">
                <MapPin size={12} />
                <span>India</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={12} />
                <span>2022 – 2024</span>
              </div>
            </div>
          </div>

          <ul className="space-y-3">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#64748b]">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#7c3aed] flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
