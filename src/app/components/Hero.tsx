import { motion } from "motion/react";
import { ArrowRight, Download, Linkedin, Mail } from "lucide-react";
import { DeveloperDashboard } from "./DeveloperDashboard";
import { useContent } from "../content/ContentContext";
import { GradientTitle } from "./SectionHeading";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { hero, contact } = useContent().settings;
  const mailto = `mailto:${contact.email}`;
  const scrollToWork = () =>
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-24 lg:pt-24">
      {/* Local hero atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 grid-pattern" />
        <div className="bg-glow w-[700px] h-[500px] bg-accent-blue/10 -top-40 right-[-10%] animate-pulse-glow" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-20 lg:gap-12 items-center">

          {/* ── Left: Headline ─────────────────────── */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="eyebrow"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-teal shadow-[0_0_8px_rgba(110,231,210,0.9)]" />
              {hero.eyebrow}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.2, ease }}
              className="mt-8 text-[2.75rem] leading-[1.02] sm:text-6xl md:text-7xl xl:text-[5.25rem] font-semibold tracking-[-0.035em]"
            >
              <GradientTitle title={hero.title} highlight={hero.highlight} />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease }}
              className="mt-8 text-base sm:text-lg text-text-muted max-w-md leading-relaxed"
            >
              {hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.55, ease }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a href={mailto} className="btn-primary group">
                {hero.primary_cta}
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </a>
              <button onClick={scrollToWork} className="btn-ghost" data-track="View Work">
                {hero.secondary_cta}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-text-muted"
            >
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-fg transition-colors">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a href={mailto} className="inline-flex items-center gap-2 hover:text-fg transition-colors">
                <Mail className="w-4 h-4" /> Email
              </a>
              <a href={contact.resume_url} download="Gul-eRana-CV.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-fg transition-colors">
                <Download className="w-4 h-4" /> Resume
              </a>
            </motion.div>
          </div>

          {/* ── Right: Dashboard ───────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.4, ease }}
            className="relative px-2 sm:px-8 lg:px-0"
          >
            <DeveloperDashboard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
