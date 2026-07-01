import { motion } from "motion/react";

const steps = [
  {
    num: "01",
    title: "Research",
    desc: "Understand requirements, users, and project goals."
  },
  {
    num: "02",
    title: "Planning",
    desc: "Design architecture, user flows, and technical strategy."
  },
  {
    num: "03",
    title: "Development",
    desc: "Build scalable, responsive, and maintainable applications."
  },
  {
    num: "04",
    title: "Testing & Deployment",
    desc: "Test thoroughly, optimize performance, and deploy production-ready solutions."
  }
];

export function Process() {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="section-num">07 — Process</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Development Process</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">A structured approach to delivering high-quality digital solutions.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-12 left-12 right-12 h-0.5 bg-border z-0">
            <motion.div 
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full h-full bg-gradient-to-r from-accent-purple via-accent-blue to-accent-purple"
            />
          </div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative z-10"
            >
              <div className="w-24 h-24 rounded-full glass flex items-center justify-center text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 mb-8 mx-auto lg:mx-0 shadow-[0_0_30px_rgba(255,255,255,0.05)] border-white/20 relative">
                {step.num}
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full border border-white/10 scale-[1.15]" />
              </div>
              
              <div className="text-center lg:text-left glass glass-hover p-8 rounded-3xl h-[calc(100%-8rem)]">
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-text-muted">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
