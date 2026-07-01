import { motion } from "motion/react";
import { ArrowRight, Download } from "lucide-react";

const codeLines = [
  { text: "const developer = {", color: "text-accent-purple font-medium" },
  { text: '  name: "Gul-e-Rana",', color: "text-accent-blue/80" },
  { text: '  role: "Full Stack Dev",', color: "text-accent-blue/80" },
  { text: '  stack: ["React", "Flask", "Python"],', color: "text-green-400/80" },
  { text: '  available: true,', color: "text-yellow-400/80" },
  { text: "}", color: "text-accent-purple font-medium" },
];

const floatingBadges = [
  { label: "React.js", color: "#61DAFB", pos: "top-0 left-1/4", yDir: -1, delay: 1.5 },
  { label: "Python",   color: "#F7C948", pos: "top-1/3 -right-3", yDir: 1,  delay: 1.7 },
  { label: "Flask",    color: "#93C5FD", pos: "bottom-2 right-12", yDir: -1, delay: 1.9 },
  { label: "MySQL",    color: "#4ADE80", pos: "bottom-1/3 -left-3", yDir: 1, delay: 2.1 },
];

const stats = [
  { value: "3+",  label: "Projects" },
  { value: "10+", label: "Technologies" },
  { value: "2025", label: "CS Graduate" },
];

export function Hero() {
  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      {/* Background effects – clipped so they don't affect layout */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-glow w-[600px] h-[600px] bg-accent-purple/20 top-[-100px] left-[-100px]" />
        <div className="bg-glow w-[500px] h-[500px] bg-accent-blue/20 bottom-[-100px] right-[-100px]" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
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
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-accent-purple/30 bg-accent-purple/10 text-accent-purple text-sm font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-pulse" />
              Computer Science Graduate
            </motion.div>

            <h1 className="text-6xl md:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-accent-purple text-glow">
                Gul-e-Rana
              </span>
            </h1>

            <p className="text-lg md:text-xl text-text-muted max-w-lg leading-relaxed">
              Full Stack Developer crafting modern, scalable, and user-focused digital experiences.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToProjects}
                className="group flex items-center gap-2 px-8 py-4 bg-white text-dark font-semibold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 px-8 py-4 glass glass-hover rounded-full text-white font-medium transition-all hover:scale-105"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-5 sm:gap-x-10 pt-6 border-t border-border"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.15 }}
                >
                  <div className="text-2xl font-bold font-heading text-white">{stat.value}</div>
                  <div className="text-xs text-text-muted mt-1 tracking-widest uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Animated Code Terminal ─────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="relative hidden lg:block"
          >
            {/* Outer wrapper – provides positioning context for floating badges */}
            <div className="relative py-8 px-8">

              {/* Terminal card */}
              <div className="relative glass rounded-3xl overflow-hidden shadow-2xl">
                {/* Traffic lights header */}
                <div className="flex items-center gap-1.5 px-5 py-4 border-b border-white/10 bg-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="ml-4 text-text-muted text-xs font-mono tracking-wider">
                    developer.ts
                  </span>
                </div>

                {/* Code body */}
                <div className="p-8 font-mono text-sm leading-8">
                  {codeLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.9 + i * 0.12 }}
                      className="flex gap-5"
                    >
                      <span className="text-white/20 select-none w-4 text-right shrink-0">
                        {i + 1}
                      </span>
                      <span className={line.color}>{line.text}</span>
                    </motion.div>
                  ))}

                  {/* Blinking cursor */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.85 }}
                    className="flex gap-5 mt-0.5"
                  >
                    <span className="text-white/20 w-4 text-right shrink-0">7</span>
                    <motion.span
                      animate={{ opacity: [1, 1, 0, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="inline-block w-2.5 h-[1.15em] bg-accent-purple rounded-sm"
                    />
                  </motion.div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/5 via-transparent to-accent-blue/5 pointer-events-none" />
              </div>

              {/* Floating tech badges */}
              {floatingBadges.map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, badge.yDir * 8, 0],
                  }}
                  transition={{
                    opacity: { delay: badge.delay, duration: 0.3 },
                    scale:   { delay: badge.delay, duration: 0.4, type: "spring", stiffness: 200 },
                    y:       { duration: 3.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 },
                  }}
                  className={`absolute ${badge.pos} glass px-4 py-2 rounded-full text-xs font-semibold shadow-xl z-10`}
                  style={{ color: badge.color, borderColor: `${badge.color}35` }}
                >
                  {badge.label}
                </motion.div>
              ))}

              {/* Ambient glow behind the card */}
              <div className="absolute inset-4 bg-accent-purple/8 blur-3xl rounded-3xl -z-10" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
