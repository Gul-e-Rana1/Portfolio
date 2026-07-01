import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const highlights = [
  "Computer Science Graduate",
  "Full Stack Development",
  "AI & Machine Learning Projects",
  "UI/UX Design Experience",
  "Continuous Learning"
];

export function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="section-num">01 — About</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent-purple to-accent-blue rounded-full" />
            <p className="text-lg text-text-muted leading-relaxed font-light">
              I am a passionate Computer Science graduate specializing in Full Stack Web Development. I have experience building modern, responsive, and scalable web applications using <span className="text-white font-medium">React.js, Flask, Laravel, MySQL</span>, and contemporary UI design principles. 
              <br /><br />
              I enjoy solving real-world problems through technology and creating digital products that are both efficient and visually engaging.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
            
            <div className="space-y-12">
              {highlights.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-12 group"
                >
                  <div className="absolute left-[11px] top-1 w-2.5 h-2.5 rounded-full bg-accent-purple shadow-[0_0_10px_rgba(139,92,246,0.8)] group-hover:scale-150 transition-transform duration-300" />
                  <h3 className="text-xl font-medium text-white/90 group-hover:text-white transition-colors">{item}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
