import { motion } from "motion/react";
import { SectionHeading } from "./SectionHeading";
import { useContent } from "../content/ContentContext";
import { getIcon } from "../lib/icons";

export function Process() {
  const { settings, process: steps } = useContent();
  return (
    <section id="process" className="py-28 md:py-36 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeading copy={settings.sections.process} align="center" />

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-[52px] left-[12%] right-[12%] h-px bg-border">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: [0.65, 0, 0.35, 1] }}
              className="w-full h-full origin-left bg-gradient-to-r from-accent-purple/60 via-accent-blue/70 to-accent-silver/60"
            />
          </div>

          {steps.map((step, idx) => {
            const Icon = getIcon(step.icon);
            return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative glass glass-hover rounded-2xl p-7 pt-6"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="relative w-12 h-12 rounded-xl border border-border bg-dark-2 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent-silver" strokeWidth={1.6} />
                  <div className="absolute inset-0 rounded-xl shadow-[0_0_24px_-4px_rgba(122,162,255,0.35)]" />
                </div>
                <span className="font-heading text-4xl font-semibold text-fg/[0.07]">{String(idx + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{step.description}</p>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
