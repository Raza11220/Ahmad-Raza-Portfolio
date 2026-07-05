import React, { useEffect, useState, useRef } from "react";
import { Award, Code2, Cpu, GraduationCap, Laptop, Sparkles, Trophy } from "lucide-react";
import { motion, useInView } from "motion/react";
import SpotlightCard from "../components/SpotlightCard";
import { PERSONAL_INFO, STATISTICS } from "../data/portfolioData";

// Animated counter component
function AnimatedCounter({ value, label, index }: { value: string; label: string; index: number; key?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    // Parse the target number (e.g. "15+" -> 15)
    const target = parseInt(value.replace(/\D/g, ""), 10);
    const duration = 2000; // ms
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const current = Math.round(target * (progress * (2 - progress)));

      if (frame >= totalFrames) {
        setCount(target);
        clearInterval(counter);
      } else {
        setCount(current);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [isInView, value]);

  const suffix = value.replace(/\d/g, "");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <SpotlightCard className="flex flex-col items-center justify-center p-6 h-full text-center hover:scale-[1.02] duration-300">
        <span className="font-display text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
          {count}
          {suffix}
        </span>
        <span className="mt-2 text-xs font-medium text-gray-400 tracking-wide uppercase">
          {label}
        </span>
      </SpotlightCard>
    </motion.div>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 bg-[#030712] border-t border-slate-900 overflow-hidden">
      {/* Glow ambient backdrops */}
      <div className="absolute top-1/2 left-10 h-80 w-80 rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-3 py-1 font-mono text-[10px] text-cyan-400 uppercase tracking-widest"
          >
            <Sparkles className="h-3 w-3" /> About Me
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            My Story & Background
          </motion.h2>
          <div className="mt-3 h-1.5 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
        </div>

        {/* Content Layout Grid */}
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Avatar & Card graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="relative group cursor-pointer"
            >
              {/* Outer Glow behind picture */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-400 to-violet-500 opacity-30 blur-lg group-hover:opacity-65 transition-all duration-500" />

              {/* Avatar Picture frame */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#111827] p-3 w-[280px] h-[340px] sm:w-[320px] sm:h-[400px] flex flex-col justify-between shadow-2xl">
                {/* Visual grid inside avatar box */}
                <div className="absolute inset-0 grid-bg opacity-10" />

                {/* Technical Abstract Icon representing software developer */}
                <div className="flex-1 flex items-center justify-center relative">
                  {/* Outer spinning ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute h-40 w-40 border border-dashed border-cyan-500/30 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute h-48 w-48 border border-dashed border-blue-500/10 rounded-full"
                  />

                  {/* Core graphics representing code & phone */}
                  <div className="relative h-28 w-28 rounded-full bg-slate-900/80 border border-slate-800 flex items-center justify-center flex-col shadow-inner">
                    <Laptop className="h-10 w-10 text-cyan-400 animate-pulse" />
                    <span className="mt-2 text-[10px] font-mono tracking-widest text-cyan-500 uppercase">SYS_ACTIVE</span>
                  </div>
                </div>

                {/* Subtitle tag */}
                <div className="relative bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-center backdrop-blur-sm">
                  <h4 className="font-display text-sm font-bold text-white tracking-wide">
                    {PERSONAL_INFO.name}
                  </h4>
                  <p className="mt-0.5 text-[10px] font-mono text-cyan-400 tracking-wider uppercase">
                    {PERSONAL_INFO.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Bio Description and stats */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-blue-500" />
                Crafting Scalable Digital Ecosystems
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-gray-400">
                Hi there! I am a passionate Software Engineer from <span className="text-white font-semibold">Pakistan</span> currently pursuing a BS in Software Engineering at <span className="text-white font-semibold">COMSATS University Islamabad</span>.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-gray-400">
                I love turning complex requirements into beautiful, responsive layouts. My specialty lies in implementing single-page platforms using <span className="text-cyan-400 font-semibold">React.js</span> and packaging native mobile client products using <span className="text-blue-400">React Native</span>.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-gray-400">
                I continuously explore computer vision modules with <span className="text-violet-400">OpenCV</span> and hand gesture algorithms to build touchless gaming canvases (like <span className="text-white">AeroPuzzle</span>), bridging software and spatial computing.
              </p>
            </motion.div>

            {/* Micro Details Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SpotlightCard className="p-4 flex items-start gap-3">
                <Code2 className="h-5 w-5 text-blue-400 mt-1" />
                <div>
                  <h4 className="text-xs font-mono text-gray-300 uppercase tracking-wide">Primary Languages</h4>
                  <p className="text-sm text-white font-medium mt-0.5">Java, JavaScript, Python, C++</p>
                </div>
              </SpotlightCard>
              <SpotlightCard className="p-4 flex items-start gap-3">
                <Cpu className="h-5 w-5 text-cyan-400 mt-1" />
                <div>
                  <h4 className="text-xs font-mono text-gray-300 uppercase tracking-wide">Focus Domains</h4>
                  <p className="text-sm text-white font-medium mt-0.5">Web Systems, Mobile Apps, AI/CV</p>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>

        {/* Counter Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16">
          {STATISTICS.map((stat, idx) => (
            <AnimatedCounter
              key={stat.id}
              value={stat.value}
              label={stat.label}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
