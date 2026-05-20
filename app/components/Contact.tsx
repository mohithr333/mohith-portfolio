"use client";

import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "./Icons";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/mohithr333",
    Icon: GithubIcon,
    handle: "mohithr333",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohith-ramesh-4a2b77364",
    Icon: LinkedinIcon,
    handle: "mohith-ramesh",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-[#7c3aed] text-xs font-mono tracking-[0.2em] uppercase mb-3">
            Get in touch
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Let&apos;s connect
          </h2>
          <p className="text-[#64748b] leading-relaxed mb-10 text-sm md:text-base max-w-md">
            I&apos;m actively looking for working student positions in Berlin —
            software, AI, IoT, or product. If you have something that fits,
            I&apos;d love to hear from you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {links.map((l) => {
              const Icon = l.Icon;
              return (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-200 group"
                >
                  <Icon
                    size={18}
                    className="text-[#7c3aed] group-hover:text-[#a78bfa] transition-colors"
                  />
                  <div>
                    <div className="text-white text-sm font-medium">{l.label}</div>
                    <div className="text-[#475569] text-xs">{l.handle}</div>
                  </div>
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
