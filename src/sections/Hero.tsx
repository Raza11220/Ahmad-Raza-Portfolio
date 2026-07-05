import { useEffect, useState } from "react";
import { ArrowDown, FileText, Send, Github, Linkedin, Smartphone, Code } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import HeroParticles from "../components/HeroParticles";
import { PERSONAL_INFO } from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";

export default function Hero() {
  const { isLightMode } = useTheme();
  const titles = [
    "React.js Developer",
    "React Native Developer",
    "Frontend Engineer",
    "Software Engineer",
    "AI Enthusiast"
  ];

  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriting logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = titles[titleIndex];
    const typingSpeed = isDeleting ? 40 : 100;

    const handleType = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          // Pause at end before deleting
          timer = setTimeout(() => setIsDeleting(true), 1800);
          return;
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className={`relative flex min-h-screen items-center justify-center overflow-hidden pt-24 transition-colors duration-300 ${
        isLightMode ? "bg-[#f8fafc]" : "bg-[#030712]"
      }`}
    >
      {/* Background visual components */}
      <HeroParticles />

      {/* Floating Glowing Orbs */}
      {!isLightMode && (
        <>
          <div className="absolute top-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-cyan-600/10 blur-[100px] pointer-events-none" />
          <div className="absolute top-1/3 right-1/3 h-[250px] w-[250px] rounded-full bg-violet-600/5 blur-[90px] pointer-events-none" />
        </>
      )}

      {/* Hero Content Grid */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8 w-full py-12 md:py-20 flex flex-col items-center text-center">
        {/* Intro Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 backdrop-blur-md transition-colors ${
            isLightMode
              ? "border-blue-200 bg-blue-50/80 text-blue-600 shadow-sm shadow-blue-100/50"
              : "border-blue-500/30 bg-blue-500/5 text-blue-400"
          }`}
        >
          <span className={`flex h-2 w-2 rounded-full animate-pulse ${isLightMode ? "bg-blue-600" : "bg-blue-400"}`} />
          <span className={`font-mono text-[11px] font-medium tracking-wider uppercase ${isLightMode ? "text-blue-600" : "text-blue-400"}`}>
            Available for new opportunities
          </span>
        </motion.div>

        {/* Name / Greeting */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`font-display text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl transition-colors ${
            isLightMode ? "text-slate-900" : "text-white"
          }`}
        >
          Hi, I'm <br className="sm:hidden" />
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            {PERSONAL_INFO.name}
          </span>
        </motion.h1>

        {/* Dynamic Rotating Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 min-h-[48px] sm:min-h-[60px] flex items-center justify-center font-display text-2xl font-bold tracking-tight text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text sm:text-4xl md:text-5xl"
        >
          <span>{currentText}</span>
          <span className={`ml-1 inline-block w-1.5 h-8 animate-pulse rounded-full ${isLightMode ? "bg-cyan-600" : "bg-cyan-400"}`} />
        </motion.div>

        {/* Brief Intro summary */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`mt-6 max-w-2xl text-sm sm:text-base leading-relaxed transition-colors ${
            isLightMode ? "text-slate-600" : "text-gray-400"
          }`}
        >
          I am a passionate{" "}
          <strong className={isLightMode ? "text-slate-950 font-bold" : "text-white"}>
            Software Engineer
          </strong>{" "}
          specializing in building high-fidelity web and mobile environments using{" "}
          <strong className={isLightMode ? "text-cyan-600 font-bold" : "text-cyan-400 font-bold"}>
            React.js
          </strong>{" "}
          and{" "}
          <strong className={isLightMode ? "text-blue-600 font-bold" : "text-blue-400 font-bold"}>
            React Native
          </strong>
          . Crafting digital systems with clean architecture, elegant interfaces, and real-time connectivity.
        </motion.p>

        {/* Dual Mode floating tech icons (visual aesthetic) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className={`mt-8 hidden sm:flex items-center gap-4 text-xs font-mono p-2.5 rounded-2xl border backdrop-blur-sm transition-colors ${
            isLightMode
              ? "bg-white/60 border-slate-200/80 text-slate-600 shadow-sm"
              : "bg-slate-900/40 border-slate-800/40 text-gray-500"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Code className={`h-4 w-4 ${isLightMode ? "text-blue-600" : "text-blue-400"}`} /> Web Apps
          </div>
          <div className={`h-3 w-px ${isLightMode ? "bg-slate-200" : "bg-slate-800"}`} />
          <div className="flex items-center gap-1.5">
            <Smartphone className={`h-4 w-4 ${isLightMode ? "text-cyan-600" : "text-cyan-400"}`} /> Mobile Apps
          </div>
        </motion.div>

        {/* Action Button cluster */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4 w-full max-w-xl animate-fade-in"
        >
          <button
            onClick={() => handleScrollTo("projects")}
            className={`group relative flex h-12 items-center justify-center gap-2 rounded-xl px-6 font-semibold text-xs text-white transition-all duration-300 w-full sm:w-auto shadow-lg ${
              isLightMode
                ? "bg-blue-600 hover:bg-blue-700 shadow-blue-600/15"
                : "bg-blue-600 hover:bg-blue-500 shadow-blue-500/20"
            }`}
          >
            View My Projects
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>

          <button
            onClick={() => handleScrollTo("contact")}
            className={`flex h-12 items-center justify-center gap-2 rounded-xl border px-6 font-semibold text-xs transition-all duration-300 w-full sm:w-auto backdrop-blur-sm ${
              isLightMode
                ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-sm"
                : "border-slate-800 bg-slate-900/60 text-gray-300 hover:bg-slate-800/80 hover:text-white"
            }`}
          >
            Contact Me
            <Send className="h-4 w-4" />
          </button>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 ${
              isLightMode
                ? "border-slate-200 bg-white text-slate-600 hover:text-slate-900 shadow-sm hover:bg-slate-50"
                : "border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 text-gray-400 hover:text-white"
            }`}
            title="GitHub Profile"
          >
            <Github className="h-5 w-5" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 ${
              isLightMode
                ? "border-slate-200 bg-white text-slate-600 hover:text-cyan-600 shadow-sm hover:bg-slate-50"
                : "border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 text-gray-400 hover:text-cyan-400"
            }`}
            title="LinkedIn Profile"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </motion.div>
      </div>

      {/* Infinite scrolling line accent indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className={`text-[10px] font-mono tracking-widest uppercase transition-colors duration-300 ${
          isLightMode ? "text-slate-400" : "text-gray-600"
        }`}>
          Scroll down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className={`flex h-8 w-5 justify-center rounded-full border p-1 transition-colors duration-300 ${
            isLightMode ? "border-slate-300" : "border-slate-800"
          }`}
        >
          <div className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
            isLightMode ? "bg-cyan-600" : "bg-cyan-400"
          }`} />
        </motion.div>
      </div>
    </section>
  );
}
