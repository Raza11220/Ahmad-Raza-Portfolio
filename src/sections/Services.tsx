import {
  Atom, Smartphone, Monitor, Cpu, Flame, Zap, Bug, Sparkles
} from "lucide-react";
import { motion } from "motion/react";
import SpotlightCard from "../components/SpotlightCard";
import { SERVICES } from "../data/portfolioData";

const iconMap: Record<string, any> = {
  Atom, Smartphone, Monitor, Cpu, Flame, Zap, Bug, Sparkles
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 bg-[#030712] border-t border-slate-900 overflow-hidden">
      {/* Glow ambient spots */}
      <div className="absolute top-1/4 right-10 h-80 w-80 rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 h-80 w-80 rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-3 py-1 font-mono text-[10px] text-cyan-400 uppercase tracking-widest"
          >
            <Sparkles className="h-3 w-3" /> Solutions
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Services Offered
          </motion.h2>
          <div className="mt-3 h-1.5 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
        </div>

        {/* Services Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => {
            const IconComp = iconMap[service.iconName] || Sparkles;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="h-full"
              >
                <SpotlightCard
                  className="p-6 h-full flex flex-col justify-between border border-slate-800/80 hover:border-slate-700/80 duration-300 relative group cursor-pointer"
                  glowColor="rgba(6, 182, 212, 0.12)"
                >
                  <div className="space-y-4">
                    {/* Circle Icon Container */}
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:text-white group-hover:bg-cyan-500 transition-all duration-300">
                      <IconComp className="h-5 w-5" />
                    </div>

                    {/* Headline and details */}
                    <div>
                      <h3 className="font-display text-base font-bold text-white tracking-wide group-hover:text-cyan-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Aesthetic Corner arrow or simple line indicator */}
                  <div className="mt-6 flex items-center gap-1.5 text-[10px] font-mono text-gray-500 group-hover:text-cyan-400 transition-colors uppercase tracking-widest">
                    <span>Active service</span>
                    <span className="h-1 w-1.5 rounded-full bg-gray-500 group-hover:bg-cyan-400" />
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
