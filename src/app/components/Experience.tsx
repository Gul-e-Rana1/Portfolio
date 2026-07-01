import { motion } from "motion/react";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "Freelance Full Stack Developer",
    company: "Self-Employed",
    period: "2024 - Present",
    description: "Designing and developing premium web applications for diverse clients, focusing on scalable architecture, responsive UI, and seamless performance."
  },
  {
    title: "Software Engineering Intern",
    company: "Tech Solutions Inc.",
    period: "2023 - 2024",
    description: "Collaborated with a cross-functional team to build internal dashboard tools using React and Node.js. Improved API response times by 20%."
  },
  {
    title: "Personal Development Projects",
    company: "Independent Learning",
    period: "2022 - 2023",
    description: "Built several comprehensive full-stack applications, exploring AI integrations, modern styling frameworks, and database optimizations."
  },
  {
    title: "Professional Development Experience",
    company: "University Programs",
    period: "2021 - 2022",
    description: "Participated in agile software development cycles, contributing to open source tools and leading university-level coding workshops."
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="section-num">04 — Experience</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Experience</h2>
          <p className="text-text-muted text-lg">My professional journey and technical growth over the years.</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-accent-purple/50 via-accent-blue/50 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="hidden md:block w-1/2" />
                
                <div className="absolute left-0 md:left-1/2 w-14 h-14 -translate-x-0 md:-translate-x-1/2 glass rounded-full flex items-center justify-center z-10 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                  <Briefcase className="w-5 h-5 text-accent-purple" />
                </div>

                <div className="ml-20 w-[calc(100%-5rem)] md:ml-0 md:w-1/2 glass glass-hover p-6 sm:p-8 rounded-3xl group">
                  <span className="text-accent-blue text-sm font-semibold tracking-wider uppercase mb-2 block">
                    {exp.period}
                  </span>
                  <h3 className="text-2xl font-bold mb-1 group-hover:text-glow transition-all">
                    {exp.title}
                  </h3>
                  <h4 className="text-white/60 font-medium mb-4">{exp.company}</h4>
                  <p className="text-text-muted leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
