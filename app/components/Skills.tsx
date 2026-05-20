"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    label: "Programming",
    skills: ["Python", "JavaScript", "TypeScript", "C/C++", "Verilog HDL"],
  },
  {
    label: "Web & Frontend",
    skills: ["React", "Next.js", "Node.js", "HTML/CSS", "Tailwind CSS"],
  },
  {
    label: "Embedded & IoT",
    skills: ["Arduino", "ESP32", "ESP8266", "OpenCV", "Sensor Integration", "GSM/GPS"],
  },
  {
    label: "Tools & Platforms",
    skills: ["Git", "ThingSpeak", "Blynk", "Vercel", "VS Code"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[#7c3aed] text-xs font-mono tracking-[0.2em] uppercase mb-3">
            Technical skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Stack
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
              className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6"
            >
              <h3 className="text-[#94a3b8] text-xs font-medium uppercase tracking-widest mb-4">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[#e2e8f0] text-xs font-medium hover:border-white/[0.12] hover:bg-white/[0.06] transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
