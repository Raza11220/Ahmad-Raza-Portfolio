import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Services from "./sections/Services";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Certificates from "./sections/Certificates";
import GithubDashboard from "./sections/GithubDashboard";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import { useTheme } from "./context/ThemeContext";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { isLightMode } = useTheme();

  // Simulated premium developer console-styled loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loadingScreen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712]"
          >
            {/* Visual ambient circles */}
            <div className="absolute top-1/3 left-1/3 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px]" />
            <div className="absolute bottom-1/3 right-1/3 h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px]" />

            <div className="relative flex flex-col items-center">
              {/* Outer logo loading frame */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="h-16 w-16 rounded-2xl border-2 border-dashed border-cyan-400 p-1 flex items-center justify-center"
              />
              <div className="absolute top-[18px] text-sm font-black text-white font-display tracking-widest">
                AR
              </div>

              {/* Text Loading details */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-8 font-mono text-[10px] text-cyan-400 tracking-widest uppercase"
              >
                Initializing core modules...
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Main Container */}
      <div className={`min-h-screen transition-colors duration-300 noise-bg selection:bg-cyan-500/30 selection:text-white ${
        isLightMode ? "bg-slate-50 text-slate-800" : "bg-[#030712] text-gray-100"
      }`}>
        {/* Custom pointer effects */}
        <CustomCursor />

        {/* Global sticky header */}
        <Navbar />

        {/* Modular Sections list */}
        <main>
          {/* 1. Hero Section */}
          <Hero />

          {/* 2. About Stats Section */}
          <About />

          {/* 3. Skills Matrix Section */}
          <Skills />

          {/* 4. Service Capabilities Section */}
          <Services />

          {/* 5. Interactive Projects Portfolio Section */}
          <Projects />

          {/* 6. Career Timeline Experience Section */}
          <Experience />

          {/* 7. Achievements & Certificates Section */}
          <Certificates />

          {/* 8. Interactive GitHub Activity Dashboard Section */}
          <GithubDashboard />

          {/* 9. Validated Secure Contact Section */}
          <Contact />
        </main>

        {/* Professional Copyright Footer Section */}
        <Footer />
      </div>
    </>
  );
}
