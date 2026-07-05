import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";

export default function HeroParticles() {
  const { isLightMode } = useTheme();
  // Generate coordinates for abstract tech-looking code snippets and floating visual structures
  const shapes = [
    { id: 1, size: "h-32 w-32", color: "bg-blue-500/20", x: "10%", y: "20%", delay: 0, duration: 20 },
    { id: 2, size: "h-48 w-48", color: "bg-cyan-500/15", x: "75%", y: "15%", delay: 2, duration: 25 },
    { id: 3, size: "h-40 w-40", color: "bg-purple-500/15", x: "20%", y: "65%", delay: 4, duration: 22 },
    { id: 4, size: "h-36 w-36", color: "bg-emerald-500/10", x: "80%", y: "70%", delay: 1, duration: 18 },
  ];

  const floatingSnippets = [
    { id: "s1", text: "const [state, setState] = useState()", x: "15%", y: "30%", rotation: -6 },
    { id: "s2", text: "import { motion } from 'motion/react'", x: "70%", y: "25%", rotation: 8 },
    { id: "s3", text: "<canvas ref={ref} />", x: "10%", y: "60%", rotation: -12 },
    { id: "s4", text: "npm i @google/genai", x: "65%", y: "55%", rotation: 4 },
    { id: "s5", text: "export default function App()", x: "50%", y: "75%", rotation: -2 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background Animated Blobs */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute rounded-full blur-[60px] opacity-60 ${shape.size} ${shape.color}`}
          style={{ left: shape.x, top: shape.y }}
          animate={{
            x: [0, 40, -40, 20, 0],
            y: [0, -50, 30, -20, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}

      {/* Grid Pattern Background overlay with subtle mask */}
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]" />

      {/* Floating Interactive Code Snippets */}
      <div className="absolute inset-0 hidden lg:block">
        {floatingSnippets.map((snippet) => (
          <motion.div
            key={snippet.id}
            className={`absolute rounded-lg px-3 py-1.5 font-mono text-[10px] shadow-md select-none backdrop-blur-sm transition-all border ${
              isLightMode
                ? "bg-white/80 border-slate-200 text-slate-600 shadow-slate-100/40"
                : "bg-slate-900/80 border-slate-800/80 text-cyan-400/60 shadow-black/20"
            }`}
            style={{
              left: snippet.x,
              top: snippet.y,
              rotate: snippet.rotation,
            }}
            animate={{
              y: [0, -12, 12, 0],
              x: [0, 6, -6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className={isLightMode ? "text-blue-500" : "text-purple-400"}>⚡</span> {snippet.text}
          </motion.div>
        ))}
      </div>

      {/* Decorative vertical stream lines */}
      <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />
      <div className="absolute left-3/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/10 to-transparent" />
    </div>
  );
}
