import { ArrowUp, Github, Linkedin, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { PERSONAL_INFO } from "../data/portfolioData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <footer className="relative bg-[#030712] border-t border-slate-900 pt-16 pb-12 overflow-hidden">
      {/* Absolute floating Back to Top button */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.button
          onClick={handleScrollToTop}
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 shadow-xl cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10 flex flex-col items-center">
        {/* Core row: Brand and Quick links */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-slate-900 pb-10">
          {/* Brand */}
          <div className="md:col-span-5 text-center md:text-left space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-2 font-display text-lg font-bold text-white">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {PERSONAL_INFO.name}
              </span>
              <Sparkles className="h-4 w-4 text-cyan-400" />
            </div>
            <p className="text-xs text-gray-500 max-w-xs mx-auto md:mx-0">
              Passionate React & React Native Engineer building modular layouts, elegant platforms, and real-time connectivity.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-7 flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-3 text-xs font-medium text-gray-400">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(link.href.replace("#", ""));
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Lower row: copyright & social handles */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[11px] text-gray-600 font-mono">
          <span>
            &copy; {currentYear} {PERSONAL_INFO.name}. All Rights Reserved.
          </span>

          <div className="flex gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors flex items-center gap-1"
            >
              <Github className="h-4 w-4" />
              Raza11220
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
