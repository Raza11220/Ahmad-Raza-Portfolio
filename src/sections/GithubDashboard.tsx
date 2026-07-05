import React, { useState, useEffect } from "react";
import {
  Github, GitFork, Star, GitPullRequest, GitBranch, Terminal, Sparkles,
  ArrowUpRight, Play, Eye, Users, FolderDot, BarChart3, RotateCw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import SpotlightCard from "../components/SpotlightCard";
import { PERSONAL_INFO } from "../data/portfolioData";

export default function GithubDashboard() {
  const [isPlayingSnake, setIsPlayingSnake] = useState(false);
  const [snakeHead, setSnakeHead] = useState({ x: 3, y: 3 });
  const [snakeDir, setSnakeDir] = useState({ x: 1, y: 0 });
  const [snakeLength, setSnakeLength] = useState(5);
  const [followers, setFollowers] = useState(54);
  const [following, setFollowing] = useState(62);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // GitHub mock/real repo list
  const repos = [
    { name: "AeroPuzzle", description: "AI-powered gesture puzzle game controlled entirely by real-time hand coordinates.", lang: "Python", stars: 12, forks: 4, url: "https://github.com/Raza11220" },
    { name: "Food-Delivery-App", description: "Premium, cross-platform mobile restaurant aggregator built in React Native.", lang: "JavaScript", stars: 8, forks: 2, url: "https://github.com/Raza11220" },
    { name: "AI-Smart-Vision-System", description: "Intelligent computer vision stream parsing assistant with Text-to-Speech output.", lang: "Python", stars: 15, forks: 5, url: "https://github.com/Raza11220" },
    { name: "Hospital-Management-System", description: "Comprehensive role-based Doctor-Patient scheduling & electronic records web portal.", lang: "JavaScript", stars: 6, forks: 1, url: "https://github.com/Raza11220" },
  ];

  // Language shares
  const languages = [
    { name: "JavaScript / TS", percentage: 45, color: "bg-yellow-500" },
    { name: "Python", percentage: 25, color: "bg-blue-500" },
    { name: "Java", percentage: 18, color: "bg-amber-600" },
    { name: "C++", percentage: 12, color: "bg-red-500" }
  ];

  // Contribution grid generation (15 weeks of 7 days)
  const [grid, setGrid] = useState<number[][]>([]);

  useEffect(() => {
    // Generate static realistic contributions
    const initialGrid = Array.from({ length: 7 }, () =>
      Array.from({ length: 24 }, () => Math.floor(Math.random() * 5))
    );
    setGrid(initialGrid);
  }, []);

  // Contribution Snake animation logic
  useEffect(() => {
    if (!isPlayingSnake) return;

    const interval = setInterval(() => {
      setSnakeHead((prev) => {
        let newX = prev.x + snakeDir.x;
        let newY = prev.y + snakeDir.y;

        // Wrap around grid bounds
        if (newX >= 24) newX = 0;
        if (newX < 0) newX = 23;
        if (newY >= 7) newY = 0;
        if (newY < 0) newY = 6;

        return { x: newX, y: newY };
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isPlayingSnake, snakeDir]);

  // Turn snake on user click/interaction
  const handleSnakeTurn = (dir: "up" | "down" | "left" | "right") => {
    if (dir === "up") setSnakeDir({ x: 0, y: -1 });
    if (dir === "down") setSnakeDir({ x: 0, y: 1 });
    if (dir === "left") setSnakeDir({ x: -1, y: 0 });
    if (dir === "right") setSnakeDir({ x: 1, y: 0 });
  };

  const refreshGithubData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setFollowers((prev) => prev + 1); // Mock live fetch
    }, 1200);
  };

  return (
    <section id="github" className="relative py-24 bg-[#030712] border-t border-slate-900 overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-1/4 right-1/4 h-80 w-80 rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 h-80 w-80 rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 px-3 py-1 font-mono text-[10px] text-blue-400 uppercase tracking-widest"
          >
            <Github className="h-3.5 w-3.5" /> Integration
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            GitHub Activity Dashboard
          </motion.h2>
          <div className="mt-3 h-1.5 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
        </div>

        {/* Dashboard Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left panel: Bio summary, followers, language statistics */}
          <div className="lg:col-span-4 space-y-6 flex flex-col">
            <SpotlightCard className="p-6 flex-1 flex flex-col justify-between" glowColor="rgba(6, 182, 212, 0.1)">
              {/* Profile card row */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 rounded-full border border-slate-700 overflow-hidden bg-slate-950 flex items-center justify-center">
                    <Github className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-white">Raza11220</h3>
                    <p className="text-xs text-cyan-400 font-mono">@AhmadRaza</p>
                  </div>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed">
                  Active contributions to open-source software, computer vision tools, and React-based cross-platform libraries.
                </p>

                {/* Follow stats */}
                <div className="flex gap-4 pt-2 border-t border-slate-900">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm font-bold text-white">{followers}</span>
                    <span className="text-xs text-gray-500">followers</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-bold text-white">{following}</span>
                    <span className="text-xs text-gray-500">following</span>
                  </div>
                </div>
              </div>

              {/* Refresh indicator button */}
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={refreshGithubData}
                  disabled={isRefreshing}
                  className="flex items-center gap-2 text-[10px] font-mono text-gray-500 hover:text-white transition-colors"
                >
                  <RotateCw className={`h-3 w-3 ${isRefreshing ? "animate-spin text-cyan-400" : ""}`} />
                  {isRefreshing ? "Syncing API..." : "Synced just now"}
                </button>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 hover:text-white transition-colors"
                >
                  Visit Profile <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </SpotlightCard>

            {/* Language share graph */}
            <SpotlightCard className="p-6" glowColor="rgba(59, 130, 246, 0.1)">
              <h4 className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-400" /> Language Distribution
              </h4>

              <div className="space-y-4">
                {languages.map((lang) => (
                  <div key={lang.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-300 font-medium">{lang.name}</span>
                      <span className="text-gray-500 font-mono">{lang.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                      <div className={`h-full rounded-full ${lang.color}`} style={{ width: `${lang.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </div>

          {/* Right panel: Contribution Graph & Pinned repos */}
          <div className="lg:col-span-8 space-y-6">
            {/* Pinned Repositories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {repos.map((repo) => (
                <SpotlightCard key={repo.name} className="p-5 flex flex-col justify-between hover:-translate-y-1 duration-300 bg-slate-900/25" glowColor="rgba(139, 92, 246, 0.1)">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                        <FolderDot className="h-4 w-4 text-cyan-400" />
                        {repo.name}
                      </span>
                      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                        Pinned repo
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                      {repo.description}
                    </p>
                  </div>

                  {/* Fork/Star details */}
                  <div className="mt-4 pt-4 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-gray-400">
                    <div className="flex gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-amber-400 fill-amber-400" /> {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3 w-3 text-cyan-400" /> {repo.forks}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-850 text-gray-500">
                        {repo.lang}
                      </span>
                    </div>

                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-white transition-colors"
                    >
                      Inspect
                    </a>
                  </div>
                </SpotlightCard>
              ))}
            </div>

            {/* Contribution Graph Frame */}
            <SpotlightCard className="p-6" glowColor="rgba(6, 182, 212, 0.1)">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-cyan-400" /> 365 Days Contributions
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-1">
                    540 commits and submissions in the past year.
                  </p>
                </div>

                {/* Contribution Snake Trigger Button */}
                <button
                  onClick={() => setIsPlayingSnake(!isPlayingSnake)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono text-[10px] tracking-widest uppercase transition-all ${
                    isPlayingSnake
                      ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-md animate-pulse"
                      : "bg-slate-950 border-slate-800 text-gray-400 hover:text-white"
                  }`}
                >
                  <Play className="h-3 w-3" />
                  {isPlayingSnake ? "Playing Snake" : "Run Contribution Snake"}
                </button>
              </div>

              {/* Contribution Grid */}
              <div className="relative overflow-x-auto pb-2">
                <div className="grid grid-rows-7 grid-flow-col gap-1.5 min-w-[500px]">
                  {grid.map((row, rIdx) =>
                    row.map((val, cIdx) => {
                      const isSnakeHead = isPlayingSnake && snakeHead.x === cIdx && snakeHead.y === rIdx;

                      // Shade selection logic
                      let shadeClass = "bg-slate-950 border border-slate-900"; // 0
                      if (val === 1) shadeClass = "bg-emerald-950/40 border border-emerald-900/10";
                      if (val === 2) shadeClass = "bg-emerald-900/60";
                      if (val === 3) shadeClass = "bg-emerald-700";
                      if (val === 4) shadeClass = "bg-emerald-400";

                      if (isSnakeHead) {
                        shadeClass = "bg-cyan-400 scale-110 shadow-lg shadow-cyan-400/50 border-cyan-300 z-10";
                      }

                      return (
                        <div
                          key={`${rIdx}-${cIdx}`}
                          className={`h-3 w-3 rounded-sm transition-colors duration-300 ${shadeClass}`}
                          title={`Contributions: ${val}`}
                        />
                      );
                    })
                  )}
                </div>
              </div>

              {/* Snake Game controllers */}
              {isPlayingSnake && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex flex-col items-center gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-900"
                >
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                    Snake Controls
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleSnakeTurn("up")}
                      className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-xs font-mono font-bold text-gray-300"
                    >
                      W
                    </button>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleSnakeTurn("left")}
                      className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-xs font-mono font-bold text-gray-300"
                    >
                      A
                    </button>
                    <button
                      onClick={() => handleSnakeTurn("down")}
                      className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-xs font-mono font-bold text-gray-300"
                    >
                      S
                    </button>
                    <button
                      onClick={() => handleSnakeTurn("right")}
                      className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-xs font-mono font-bold text-gray-300"
                    >
                      D
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Grid Legend index labels */}
              <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-gray-500">
                <span>Jan</span>
                <div className="flex items-center gap-1">
                  <span>Less</span>
                  <div className="h-2.5 w-2.5 rounded-sm bg-slate-950 border border-slate-900" />
                  <div className="h-2.5 w-2.5 rounded-sm bg-emerald-950/40" />
                  <div className="h-2.5 w-2.5 rounded-sm bg-emerald-900/60" />
                  <div className="h-2.5 w-2.5 rounded-sm bg-emerald-700" />
                  <div className="h-2.5 w-2.5 rounded-sm bg-emerald-400" />
                  <span>More</span>
                </div>
                <span>Dec</span>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
