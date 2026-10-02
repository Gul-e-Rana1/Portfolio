import { motion } from "motion/react";
import { SectionHeading } from "./SectionHeading";
import { useContent } from "../content/ContentContext";
import { getIcon } from "../lib/icons";

export function Skills() {
  const { settings, skills } = useContent();
  return (
    <section id="skills" className="py-28 md:py-36 relative">
      <div className="bg-glow w-[800px] h-[600px] bg-accent-blue/[0.07] top-1/3 left-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <SectionHeading copy={settings.sections.skills} align="center" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((group, idx) => {
            const Icon = getIcon(group.icon);
            return (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (idx % 3) * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass glass-hover p-7 rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-x-6 top-0 h-px hairline opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl border border-border bg-gradient-to-br from-accent-silver/15 to-accent-blue/5 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent-silver" strokeWidth={1.6} />
                </div>
                <span className="text-[11px] font-mono text-text-muted">{String(idx + 1).padStart(2, "0")}</span>
              </div>

              <h3 className="text-xl font-semibold mb-1.5">{group.category}</h3>
              <p className="text-sm text-text-muted mb-6">{group.description}</p>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-lg border border-border bg-fg/[0.02] text-xs font-medium text-fg/75 hover:text-fg hover:border-accent-blue/30 hover:bg-accent-blue/[0.06] transition-colors duration-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
