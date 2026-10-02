import { motion } from "motion/react";
import { GraduationCap, Award, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { useContent } from "../content/ContentContext";

export function EducationAchievements() {
  const { settings, education: educationCards, certifications: achievementCards } = useContent();
  return (
    <section id="education" className="py-28 md:py-36 relative">
      <div className="bg-glow w-[600px] h-[600px] bg-accent-purple/[0.06] top-0 right-0" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <SectionHeading copy={settings.sections.education} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {educationCards.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass glass-hover p-8 md:p-10 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent-blue/10 blur-[80px] rounded-full" />
              <div className="relative flex items-start justify-between gap-6">
                <div>
                  <div className="w-11 h-11 rounded-xl border border-border bg-gradient-to-br from-accent-silver/15 to-accent-blue/5 flex items-center justify-center mb-8">
                    <GraduationCap className="w-5 h-5 text-accent-silver" strokeWidth={1.6} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">{item.title}</h3>
                  <p className="text-fg/70">{item.subtitle}</p>
                  {item.period && <p className="text-sm text-text-muted mt-1">{item.period}</p>}
                </div>
                <div className="text-right shrink-0">
                  <p className="font-heading text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-gradient">{item.stat}</p>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-text-muted mt-2">{item.statLabel}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievementCards.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass glass-hover p-7 rounded-2xl group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <Award className="w-5 h-5 text-accent-silver/70 group-hover:text-accent-blue transition-colors duration-500" strokeWidth={1.6} />
                <span className="pill">Certified</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-xs text-accent-blue/80 mb-4">{item.issuer}</p>
              <p className="text-sm text-text-muted leading-relaxed">{item.description}</p>
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-5 text-xs text-accent-blue/90 hover:text-fg transition-colors">
                  View credential <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
