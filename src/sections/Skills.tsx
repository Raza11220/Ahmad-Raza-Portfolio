import { useState } from "react";
import {
  Atom, Smartphone, Code2, Palette, Layers, Globe, Flame, Cpu, Server,
  FileJson, Database, Coffee, Terminal, Code, Eye, Scissors, Github, Send,
  Figma, Sparkles, Star
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import SpotlightCard from "../components/SpotlightCard";
import { SKILL_CATEGORIES } from "../data/portfolioData";

// Icon lookup resolver
const iconMap: Record<string, any> = {
  Atom, Smartphone, Code2, Palette, Layers, Globe, Flame, Cpu, Server,
  FileJson, Database, Coffee, Terminal, Code, Eye, Scissors, Github, Send, Figma
};

function SkillIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = iconMap[name] || Code;
  return <IconComponent className={className} />;
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const tabs = ["All", "Frontend", "Backend & Database", "Programming & AI", "Tools"];

  // Filter skills based on tab selection
  const filteredCategories = activeTab === "All"
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter((cat) => cat.category.toLowerCase().includes(activeTab.split(" ")[0].toLowerCase()));

  return (
    <section id="skills" className="relative py-24 bg-[#030712] border-t border-slate-900 overflow-hidden">
      {/* Decorative vector mesh */}
      <div className="absolute top-10 left-1/3 h-96 w-96 rounded-full bg-blue-600/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 h-96 w-96 rounded-full bg-cyan-600/5 blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 px-3 py-1 font-mono text-[10px] text-blue-400 uppercase tracking-widest"
          >
            <Sparkles className="h-3 w-3" /> Tech Stack
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Skills & Competences
          </motion.h2>
          <div className="mt-3 h-1.5 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-white border border-slate-800/60 bg-slate-900/20"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeSkillsTab"
                    className="absolute inset-0 bg-blue-600 rounded-xl -z-10 shadow-lg shadow-blue-500/15"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {tab}
              </button>
            );
          })}
        </div>

        {/* Skills Cards Layout */}
        <motion.div
          layout
          className="space-y-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((group) => (
              <motion.div
                key={group.category}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Category Header */}
                <h3 className="font-display text-base font-bold text-gray-300 flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  {group.category}
                </h3>

                {/* Grid of skill blocks inside category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {group.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <SpotlightCard
                        className="p-5 flex flex-col justify-between h-36 relative overflow-hidden group cursor-pointer border border-slate-800/80 hover:border-slate-700/80 duration-300"
                        glowColor="rgba(59, 130, 246, 0.12)"
                      >
                        {/* Background subtle mesh decoration */}
                        <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-500 group-hover:scale-110">
                          <SkillIcon name={skill.iconName} className="h-28 w-28 text-white" />
                        </div>

                        {/* Upper row: icon & title */}
                        <div className="flex items-start justify-between relative z-10">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:text-white group-hover:bg-blue-600 transition-all duration-300">
                              <SkillIcon name={skill.iconName} className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white tracking-wide">{skill.name}</h4>
                              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-0.5 block">
                                Core competence
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 font-mono text-xs text-gray-400 bg-slate-900/50 px-2 py-0.5 rounded-lg border border-slate-800">
                            <Star className="h-3 w-3 text-cyan-400 fill-cyan-400" />
                            {skill.level}%
                          </div>
                        </div>

                        {/* Lower row: progress gauge bar */}
                        <div className="space-y-1.5 relative z-10">
                          <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500"
                            />
                          </div>
                        </div>
                      </SpotlightCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
