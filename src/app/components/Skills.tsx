import { motion } from "motion/react";

const skills = [
  {
    num: "01",
    category: "Frontend",
    items: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
    color: "#3b82f6",
  },
  {
    num: "02",
    category: "Backend",
    items: ["Flask", "Laravel", "PHP", "Python"],
    color: "#8b5cf6",
  },
  {
    num: "03",
    category: "Database",
    items: ["MySQL", "XAMPP"],
    color: "#4ade80",
  },
  {
    num: "04",
    category: "Tools",
    items: ["Git", "GitHub", "VS Code", "Figma", "Postman", "Vercel"],
    color: "#facc15",
  },
  {
    num: "05",
    category: "AI / Machine Learning & Data Science",
    items: ["AI/ML", "Python", "Model Training", "AI Integration", "Bot Development", "Data Analysis & Visualization"],
    color: "#f472b6",
  },
  {
    num: "06",
    category: "Soft Skills",
    items: ["Problem Solving", "Communication", "Team Collaboration", "Critical Thinking"],
    color: "#fb923c",
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      <div className="bg-glow w-[800px] h-[800px] bg-accent-blue/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="section-num">02 — Skills</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Technical Skills</h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            A comprehensive toolkit of modern technologies and frameworks I use to bring ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillGroup, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass glass-hover p-8 rounded-3xl relative overflow-hidden group"
            >
              {/* Colored top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: skillGroup.color }}
              />

              {/* Ambient glow on hover */}
              <div
                className="absolute -top-8 -right-8 w-32 h-32 blur-2xl rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: skillGroup.color }}
              />

              <div className="flex items-start justify-between mb-6 relative z-10">
                <h3
                  className="text-2xl font-semibold text-white/90"
                  style={{ textShadow: `0 0 20px ${skillGroup.color}30` }}
                >
                  {skillGroup.category}
                </h3>
                <span className="text-xs font-mono opacity-25 mt-1">{skillGroup.num}</span>
              </div>

              <div className="flex flex-wrap gap-3 relative z-10">
                {skillGroup.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium transition-colors cursor-default"
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = `${skillGroup.color}18`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${skillGroup.color}50`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "";
                      (e.currentTarget as HTMLElement).style.borderColor = "";
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
