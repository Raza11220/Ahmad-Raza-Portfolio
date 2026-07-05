import React from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { isLightMode, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      id="theme-toggle-btn"
      className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 cursor-pointer ${
        isLightMode
          ? "border-slate-300 bg-white text-amber-500 shadow-md shadow-amber-500/5 hover:bg-amber-50"
          : "border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800/80"
      }`}
      title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
      aria-label="Toggle dark/light theme"
    >
      {isLightMode ? (
        <Moon className="h-5 w-5 transition-transform duration-300 rotate-0" />
      ) : (
        <Sun className="h-5 w-5 transition-transform duration-300 hover:rotate-45 text-amber-400" />
      )}
      
      {/* Floating active dot */}
      <span className="absolute -top-1 -right-1 flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
          isLightMode ? "bg-amber-400" : "bg-blue-400"
        }`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${
          isLightMode ? "bg-amber-400" : "bg-blue-400"
        }`}></span>
      </span>
    </motion.button>
  );
}
