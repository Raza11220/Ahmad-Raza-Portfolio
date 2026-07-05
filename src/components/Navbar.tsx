import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Github, Linkedin, Download, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { downloadResumePDF } from "../utils/resumeGenerator";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { isLightMode } = useTheme();

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Certificates", href: "#certificates" },
    { name: "GitHub", href: "#github" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple intersection observer detection for active links
      const scrollPosition = window.scrollY + 150;
      for (const link of navLinks) {
        const element = document.getElementById(link.href.replace("#", ""));
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.href.replace("#", ""));
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(href.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isLightMode
            ? isScrolled
              ? "bg-white/95 border-b border-slate-200/90 backdrop-blur-md py-4 shadow-sm"
              : "bg-white/85 border-b border-slate-200/50 backdrop-blur-sm py-5"
            : isScrolled
            ? "bg-[#030712]/90 border-b border-slate-700/60 backdrop-blur-md py-4"
            : "bg-[#030712]/40 border-b border-slate-800/40 backdrop-blur-sm py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8 flex items-center justify-between">
          {/* Logo with micro-interaction */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className={`group flex items-center gap-2.5 font-display text-xl font-bold tracking-tight ${
              isLightMode ? "text-slate-950" : "text-white"
            }`}
          >
            <motion.div
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-violet-500 p-[1.5px]"
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#030712]">
                <span className="text-sm font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  AR
                </span>
              </div>
            </motion.div>
            <span className="relative overflow-hidden">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                Ahmad Raza
              </span>
              <span className={`absolute left-0 top-full inline-block transition-transform duration-300 group-hover:-translate-y-full flex items-center gap-1 font-medium ${
                isLightMode ? "text-cyan-600" : "text-cyan-400"
              }`}>
                Dev Portfolio <Sparkles className="h-3 w-3" />
              </span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className={`hidden xl:flex items-center gap-1.5 rounded-full border p-1.5 backdrop-blur-sm ${
            isLightMode ? "border-slate-200 bg-white/90" : "border-slate-800/40 bg-slate-900/40"
          }`}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative px-4 py-2 text-xs font-medium tracking-wide rounded-full transition-colors ${
                    isActive 
                      ? isLightMode ? "text-slate-900" : "text-white"
                      : isLightMode ? "text-slate-600 hover:text-slate-900" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className={`absolute inset-0 rounded-full -z-10 border ${
                        isLightMode ? "bg-slate-100 border-slate-200" : "bg-slate-800 border-slate-700/50"
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop Call to Action */}
          <div className="hidden xl:flex items-center gap-4">
            <ThemeToggle />

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className={`transition-colors ${isLightMode ? "text-slate-600 hover:text-slate-900" : "text-gray-400 hover:text-white"}`}
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className={`transition-colors ${isLightMode ? "text-slate-600 hover:text-cyan-600" : "text-gray-400 hover:text-cyan-400"}`}
            >
              <Linkedin className="h-5 w-5" />
            </a>

            <button
              onClick={() => {
                downloadResumePDF();
              }}
              className="resume-btn group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/10 transition-all duration-300 hover:shadow-cyan-500/20 cursor-pointer"
            >
              <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              Resume
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex xl:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
                isLightMode 
                  ? "border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50" 
                  : "border-slate-800 bg-slate-900/50 text-gray-400 hover:text-white hover:bg-slate-800/80"
              }`}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-30 backdrop-blur-xl xl:hidden flex flex-col justify-center px-8 ${
              isLightMode ? "bg-white/95" : "bg-[#030712]/95"
            }`}
          >
            {/* Background elements */}
            {!isLightMode && (
              <>
                <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px]" />
                <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px]" />
              </>
            )}

            <nav className="flex flex-col gap-6 text-center">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`font-display text-2xl font-semibold tracking-wide transition-all ${
                      isActive 
                        ? isLightMode ? "text-slate-900" : "text-white"
                        : isLightMode ? "text-slate-500 hover:text-slate-900" : "text-gray-500 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-col items-center gap-6"
            >
              <div className="flex gap-6">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors ${
                    isLightMode 
                      ? "border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300" 
                      : "border-slate-800 bg-slate-900 text-gray-300 hover:text-white"
                  }`}
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors ${
                    isLightMode 
                      ? "border-slate-200 bg-white text-slate-600 hover:text-cyan-600 hover:border-slate-300" 
                      : "border-slate-800 bg-slate-900 text-gray-300 hover:text-cyan-400"
                  }`}
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>

              <button
                onClick={() => {
                  downloadResumePDF();
                }}
                className="resume-btn flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3 text-sm font-semibold text-white shadow-lg cursor-pointer"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
