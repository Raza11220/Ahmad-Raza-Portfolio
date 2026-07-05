import { Briefcase, Calendar, GraduationCap, Trophy, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import SpotlightCard from "../components/SpotlightCard";
import { EXPERIENCE } from "../data/portfolioData";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 bg-[#030712] border-t border-slate-900 overflow-hidden">
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 md:px-8 relative z-10">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-3 py-1 font-mono text-[10px] text-cyan-400 uppercase tracking-widest"
          >
            <Sparkles className="h-3 w-3" /> Career path
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            My Timeline & Experience
          </motion.h2>
          <div className="mt-3 h-1.5 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
        </div>

        {/* Timeline Layout wrapper */}
        <div className="relative pl-6 sm:pl-8 border-l border-slate-800/80 space-y-12 ml-4">
          {EXPERIENCE.map((item, index) => {
            // Determine type of timeline icon
            const isEducation = item.id === "exp-1";
            const isHackathon = item.id === "exp-3";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Glowing Timeline Marker Node */}
                <div className="absolute -left-[37px] sm:-left-[45px] top-1.5 flex h-7 sm:h-8 w-7 sm:w-8 items-center justify-center rounded-full bg-slate-950 border border-slate-800 text-cyan-400 shadow-xl shadow-cyan-400/5">
                  {isEducation && <GraduationCap className="h-3.5 sm:h-4 w-3.5 sm:w-4" />}
                  {isHackathon && <Trophy className="h-3.5 sm:h-4 w-3.5 sm:w-4" />}
                  {!isEducation && !isHackathon && <Briefcase className="h-3.5 sm:h-4 w-3.5 sm:w-4" />}
                </div>

                {/* Main Card */}
                <SpotlightCard
                  className="p-6 md:p-8 hover:scale-[1.01] duration-300 hover:border-slate-700/80"
                  glowColor="rgba(6, 182, 212, 0.1)"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <span className="text-[10px] font-mono font-semibold text-cyan-400 uppercase tracking-widest block mb-0.5">
                        {item.company}
                      </span>
                      <h3 className="font-display text-lg font-bold text-white tracking-wide">
                        {item.role}
                      </h3>
                    </div>

                    {/* Duration Badge */}
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-950 px-3 py-1 font-mono text-[10px] text-gray-400 border border-slate-900 w-fit">
                      <Calendar className="h-3 w-3" />
                      {item.duration}
                    </span>
                  </div>

                  {/* Bullet description */}
                  <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                    {item.description.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills/Tags associated with role */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[9px] font-mono text-gray-400 bg-slate-950 border border-slate-900"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
