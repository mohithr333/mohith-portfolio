"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";

type Project = {
  title: string;
  description: string;
  tech: string[];
  color: string;
  github?: string;
  demo?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "Face Recognition Home Security",
    description:
      "Multi-sensor home security system with face recognition door lock, real-time intrusion detection, gas & fire alerts, and GSM-based SMS notifications.",
    tech: ["Python", "OpenCV", "Arduino", "GSM Module", "Sensors"],
    color: "#7c3aed",
    featured: true,
  },
  {
    title: "IoT Vehicle Collision & Pollution Monitor",
    description:
      "Arduino + ESP8266 system for real-time vehicle safety: collision detection, alcohol sensing, pollution tracking, and GPS-based alerts via ThingSpeak cloud.",
    tech: ["Arduino", "ESP8266", "ThingSpeak", "IoT Sensors", "GPS"],
    color: "#06b6d4",
    featured: true,
  },
  {
    title: "Smart Attendance System",
    description:
      "Biometric attendance system with RFID and fingerprint two-factor authentication, plus automated parent notification on attendance events.",
    tech: ["Arduino", "RFID", "Fingerprint Sensor"],
    color: "#10b981",
  },
  {
    title: "IoT Hydroponics System",
    description:
      "ESP32-based automated hydroponics controller with Blynk cloud integration for remote monitoring, automated water control, and real-time sensor feedback.",
    tech: ["ESP32", "Blynk", "Water Sensors", "IoT"],
    color: "#22c55e",
  },
  {
    title: "Wallace Tree Multiplier",
    description:
      "High-performance binary multiplier implemented in Verilog HDL using Wallace tree reduction for minimized critical path and optimized propagation delay.",
    tech: ["Verilog HDL", "VLSI", "Digital Design"],
    color: "#f59e0b",
  },
  {
    title: "Lassi Grand — Restaurant Website",
    description:
      "Frontend website for a restaurant brand with menu presentation and brand identity, deployed on Vercel.",
    tech: ["HTML", "CSS", "JavaScript"],
    color: "#ec4899",
    demo: "https://lassi-grand.vercel.app",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateZ(10px)`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, ${project.color}18, transparent 65%)`;
    }
  };

  const handleMouseEnter = () => {
    if (cardRef.current) cardRef.current.style.transition = "none";
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 0.6s ease";
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    if (glowRef.current) glowRef.current.style.background = "transparent";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative rounded-xl border border-white/[0.07] bg-white/[0.02] p-6 flex flex-col gap-4 h-full overflow-hidden"
        style={{ transformStyle: "preserve-3d", transition: "transform 0.6s ease" }}
      >
        {/* per-card mouse glow */}
        <div ref={glowRef} className="absolute inset-0 pointer-events-none transition-none rounded-xl" />

        {/* top accent bar */}
        <div
          className="absolute top-0 inset-x-0 h-[2px] rounded-t-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: project.color }}
        />

        {/* hover border glow */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 1px ${project.color}30` }}
        />

        <div className="relative flex items-start justify-between gap-2">
          <h3 className="text-white font-semibold text-base leading-snug">
            {project.title}
          </h3>
          {project.featured && (
            <span
              className="text-[10px] font-mono px-2 py-0.5 rounded-full border shrink-0 mt-0.5"
              style={{
                color: project.color,
                borderColor: `${project.color}40`,
                background: `${project.color}12`,
              }}
            >
              featured
            </span>
          )}
        </div>

        <p className="relative text-[#64748b] text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="relative flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[#64748b] hover:text-[#94a3b8] hover:border-white/[0.1] transition-colors"
            >
              {t}
            </span>
          ))}
        </div>

        {(project.demo || project.github) && (
          <div className="relative flex items-center gap-4 pt-1 border-t border-white/[0.05]">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#64748b] hover:text-white transition-colors"
              >
                <ExternalLink size={13} />
                Live demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#64748b] hover:text-white transition-colors"
              >
                <GithubIcon size={13} />
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[#7c3aed] text-xs font-mono tracking-[0.2em] uppercase mb-3">
            What I&apos;ve built
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Projects
          </h2>
          <p className="mt-3 text-[#64748b] text-sm max-w-lg">
            Real systems, not tutorials. Each project solved an actual problem
            with hardware, software, or both.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
