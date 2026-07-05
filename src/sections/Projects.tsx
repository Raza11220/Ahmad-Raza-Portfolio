import React, { useState } from "react";
import {
  ExternalLink, Github, Search, SlidersHorizontal, Sparkles, X, CheckCircle, Info,
  Smartphone, Laptop, BrainCircuit
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import SpotlightCard from "../components/SpotlightCard";
import { PROJECTS, Project } from "../data/portfolioData";

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "web" | "mobile" | "ai">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter & Search Logic
  const filteredProjects = PROJECTS.filter((proj) => {
    const matchesCategory = activeCategory === "all" || proj.category === activeCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { value: "all", label: "All Projects" },
    { value: "web", label: "Web Apps" },
    { value: "mobile", label: "Mobile Apps" },
    { value: "ai", label: "AI & Vision" },
  ] as const;

  return (
    <section id="projects" className="relative py-24 bg-[#030712] border-t border-slate-900 overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/3 left-10 h-72 w-72 rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 h-72 w-72 rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 px-3 py-1 font-mono text-[10px] text-blue-400 uppercase tracking-widest"
          >
            <Sparkles className="h-3 w-3" /> Showcase
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Featured Engineering Projects
          </motion.h2>
          <div className="mt-3 h-1.5 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/60 backdrop-blur-sm">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 ${
                    isActive
                      ? "text-white bg-blue-600 shadow-md shadow-blue-500/15"
                      : "text-gray-400 hover:text-white border border-slate-800 bg-slate-900/10 hover:bg-slate-900/40"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search technologies or titles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-300"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="h-full flex"
              >
                <SpotlightCard
                  onClick={() => setSelectedProject(project)}
                  className="p-0 flex flex-col justify-between h-full overflow-hidden border border-slate-800/80 hover:border-slate-700/80 duration-300 relative group cursor-pointer"
                  glowColor="rgba(59, 130, 246, 0.1)"
                >
                  {/* Project Image Frame */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                    {/* Dark gradient mapping over image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 opacity-80" />
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Category Label Overlay */}
                    <span className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider text-white bg-slate-900/90 border border-slate-800 backdrop-blur-sm flex items-center gap-1.5">
                      {project.category === "mobile" && <Smartphone className="h-3 w-3 text-cyan-400" />}
                      {project.category === "web" && <Laptop className="h-3 w-3 text-blue-400" />}
                      {project.category === "ai" && <BrainCircuit className="h-3 w-3 text-violet-400" />}
                      {project.category}
                    </span>
                  </div>

                  {/* Body Text details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase">
                        {project.subtitle}
                      </span>
                      <h3 className="font-display text-lg font-bold text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Tag bubbles */}
                    <div className="mt-6">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md text-[9px] font-mono text-gray-400 bg-slate-900 border border-slate-800"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-0.5 rounded-md text-[9px] font-mono text-cyan-400 bg-slate-900 border border-slate-800">
                            +{project.tags.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Modal Trigger feedback */}
                      <div className="mt-4 pt-4 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-cyan-500 uppercase tracking-widest group-hover:text-white transition-colors">
                        <span className="flex items-center gap-1">
                          <Info className="h-3 w-3 text-cyan-400" /> More Info & Specs
                        </span>
                        <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search Result */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-sm font-mono">No matching engineering projects found.</p>
          </div>
        )}
      </div>

      {/* Detailed Slide-In / Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />

                {/* Close Button overlay */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/80 text-gray-400 hover:text-white border border-slate-800 hover:scale-105 transition-all"
                  aria-label="Close details"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Left side text overlays */}
                <div className="absolute bottom-4 left-6 z-10 space-y-1">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                    {selectedProject.subtitle}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-wide">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Scrollable details wrapper */}
              <div className="p-6 overflow-y-auto space-y-6">
                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Concept Overview</h4>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Core Features</h4>
                  <div className="space-y-2.5">
                    {selectedProject.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-3 text-xs text-gray-300 leading-normal">
                        <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech stack row */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Technologies Employed</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-semibold text-cyan-300 bg-slate-950 border border-slate-800/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer row */}
              <div className="p-4 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between gap-4">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">
                  Open Source Project
                </span>

                <div className="flex items-center gap-3">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 px-4 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    GitHub Repo
                  </a>

                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 text-xs font-semibold text-white shadow-lg shadow-blue-500/10 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
