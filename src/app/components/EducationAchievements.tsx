import { motion } from "motion/react";
import { GraduationCap, Award } from "lucide-react";

const coursework = [
  "Web Development", "Database Systems", "Software Engineering", 
  "Artificial Intelligence", "Data Structures & Algorithms"
];

const achievements = [
  { title: "Programming Certifications", desc: "Advanced React Patterns & Python Data Structures" },
  { title: "Hackathons", desc: "1st Place - University AI Innovation Hackathon 2025" },
  { title: "Academic Achievements", desc: "Dean's List for 4 consecutive semesters" },
  { title: "Workshops", desc: "Led 'Intro to Modern Web Dev' workshop for 100+ students" },
  { title: "Technical Training", desc: "AWS Cloud Practitioner & MongoDB Developer certified" }
];

export function EducationAchievements() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="bg-glow w-[600px] h-[600px] bg-accent-purple/10 top-0 right-0" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Education Section */}
        <div id="education" className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="section-num">05 — Education</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Education</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent-purple to-accent-blue rounded-full" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 blur-[80px] rounded-full" />
            
            <div className="flex items-start gap-6 relative z-10">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center shrink-0 border-accent-blue/30">
                <GraduationCap className="w-8 h-8 text-accent-blue" />
              </div>
              
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Bachelor of Science in Computer Science</h3>
                <p className="text-text-muted text-lg mb-8">Graduated with Honors</p>
                
                <h4 className="text-white font-medium mb-4">Relevant Coursework:</h4>
                <div className="flex flex-wrap gap-3">
                  {coursework.map((course, i) => (
                    <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm hover:border-accent-blue/50 transition-colors cursor-default">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Achievements Section */}
        <div id="achievements">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="section-num">06 — Achievements</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Certifications & Achievements</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent-purple to-accent-blue rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass glass-hover p-8 rounded-3xl group relative overflow-hidden"
              >
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-accent-purple/20 blur-2xl rounded-full group-hover:bg-accent-purple/40 transition-colors duration-500" />
                <Award className="w-8 h-8 text-white/50 group-hover:text-accent-purple transition-colors mb-6 relative z-10" />
                <h3 className="text-xl font-bold mb-3 relative z-10">{item.title}</h3>
                <p className="text-text-muted relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
