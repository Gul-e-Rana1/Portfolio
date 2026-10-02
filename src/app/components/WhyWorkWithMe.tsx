import { motion } from "motion/react";
import { useContent } from "../content/ContentContext";
import { getIcon } from "../lib/icons";
import { SectionHeading } from "./SectionHeading";

export function WhyWorkWithMe() {
  const { settings, features } = useContent();
  return (
    <section id="about" className="py-28 md:py-36 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-x-16 items-end mb-4">
          <SectionHeading copy={settings.sections.why} />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-text-muted text-lg leading-relaxed mb-16 md:mb-20 max-w-xl"
          >
            {settings.about_intro}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => {
            const Icon = getIcon(f.icon);
            return (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass glass-hover rounded-2xl p-7 relative overflow-hidden group"
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-accent-blue/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <div className="flex items-center justify-between mb-10">
                  <div className="w-11 h-11 rounded-xl border border-border bg-gradient-to-br from-accent-silver/15 to-accent-blue/5 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent-silver" strokeWidth={1.6} />
                  </div>
                  <span className="pill">{f.tag}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{f.description}</p>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
