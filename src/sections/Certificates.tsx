import { Award, ExternalLink, Sparkles, Download } from "lucide-react";
import { motion } from "motion/react";
import SpotlightCard from "../components/SpotlightCard";
import { CERTIFICATES } from "../data/portfolioData";

export default function Certificates() {
  return (
    <section id="certificates" className="relative py-24 bg-[#030712] border-t border-slate-900 overflow-hidden">
      {/* Visual background rings */}
      <div className="absolute top-1/2 left-10 h-72 w-72 rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-3 py-1 font-mono text-[10px] text-cyan-400 uppercase tracking-widest"
          >
            <Sparkles className="h-3 w-3" /> Credentials
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Achievements & Certificates
          </motion.h2>
          <div className="mt-3 h-1.5 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CERTIFICATES.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="h-full"
            >
              <SpotlightCard
                className="p-0 h-full flex flex-col justify-between overflow-hidden border border-slate-800/80 hover:border-slate-700/80 duration-300 relative group cursor-pointer bg-slate-900/30"
                glowColor="rgba(139, 92, 246, 0.1)"
              >
                {/* Certificate banner image / abstract placeholder */}
                <div className="relative aspect-[16/9] bg-slate-950 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
                  <img
                    src={cert.image || `https://picsum.photos/seed/cert-${cert.id}/600/400`}
                    alt={cert.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Floating badge */}
                  <span className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                    <Award className="h-4 w-4" />
                  </span>
                </div>

                {/* Content details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase font-semibold">
                      {cert.issuer} &bull; {cert.date}
                    </span>
                    <h3 className="font-display text-base font-bold text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>

                  {/* Actions footer */}
                  <div className="mt-6 pt-4 border-t border-slate-900 flex items-center justify-between">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-mono text-cyan-500 hover:text-white transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View Verification
                    </a>

                    <button
                      onClick={() => {
                        if (cert.image) {
                          const link = document.createElement("a");
                          link.href = cert.image;
                          link.download = `${cert.id}.jpg`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        } else {
                          alert(`Initiating download of: Certificate_${cert.id}.pdf`);
                        }
                      }}
                      className="flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-cyan-400 transition-colors cursor-pointer"
                      title="Download Certificate Image"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </button>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
