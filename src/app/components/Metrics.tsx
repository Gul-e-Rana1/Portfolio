import { motion } from "motion/react";
import { useContent } from "../content/ContentContext";


export function Metrics() {
  const metrics = useContent().stats;
  if (!metrics.length) return null;
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass rounded-3xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(122,162,255,0.1),transparent_70%)]" />
          <div className={`relative grid grid-cols-2 ${metrics.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
            {metrics.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 + i * 0.12 }}
                // Right + bottom hairlines on every cell; the panel clips the outer edges,
                // so dividers stay correct for any number of stats.
                className="px-6 py-10 md:px-10 md:py-14 shadow-[1px_0_0_0_var(--color-border),0_1px_0_0_var(--color-border)]"
              >
                <p className="font-heading text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-gradient">
                  {m.value}
                </p>
                <p className="mt-4 text-sm font-medium text-fg/90">{m.label}</p>
                <p className="mt-1 text-xs text-text-muted">{m.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
