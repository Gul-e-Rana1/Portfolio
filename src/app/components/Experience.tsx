import { motion } from "motion/react";
import { SectionHeading } from "./SectionHeading";
import { useContent } from "../content/ContentContext";

export function Experience() {
  const { settings, experiences } = useContent();
  return (
    <section id="experience" className="py-28 md:py-36 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-x-16">
          <div className="lg:sticky lg:top-32 self-start">
            <SectionHeading copy={settings.sections.experience} />
          </div>

          <div className="relative">
            <div className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-accent-blue/50 via-border to-transparent" />

            <div className="space-y-5">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-10"
                >
                  <span className="absolute left-0 top-8 w-[15px] h-[15px] rounded-full border border-accent-blue/40 bg-dark flex items-center justify-center">
                    <span className={`w-[5px] h-[5px] rounded-full ${exp.is_current ? "bg-accent-teal shadow-[0_0_8px_rgba(110,231,210,0.9)]" : "bg-accent-blue/70"}`} />
                  </span>

                  <div className="glass glass-hover p-7 rounded-2xl">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <span className="text-xs font-medium tracking-[0.15em] uppercase text-accent-blue/90">{exp.period}</span>
                      {exp.is_current && <span className="pill text-accent-teal/90">Current</span>}
                    </div>
                    <h3 className="text-2xl font-semibold tracking-tight">{exp.title}</h3>
                    <p className="text-fg/55 text-sm mt-1 mb-4">{exp.company}</p>
                    <p className="text-text-muted leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {exp.tags?.map((t) => (
                        <span key={t} className="text-[11px] px-2.5 py-1 rounded-md border border-border text-fg/65">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
