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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[85vh]">

          {/* ── Left: Content ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-8"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.0] tracking-tight">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fg via-blue-500 dark:via-blue-200 to-accent-purple text-glow">
                Gul-e-Rana
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-lg leading-relaxed">
              A Software Engineer & Full Stack Developer who genuinely enjoys turning ideas into working code — from React interfaces to Python/Flask backends and everything in between. Always up for learning something new, solving a tricky bug or building something that actually makes life easier. Let's build something cool together!
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToProjects}
                className="group flex items-center gap-2 px-8 py-4 bg-fg text-dark font-semibold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

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
