import { motion } from "motion/react";
import { Mail, Linkedin, Github, FileText, ArrowUpRight } from "lucide-react";

const links = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:gulerana3205@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/gul-e-rana",
    target: "_blank",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Gul-e-Rana1",
    target: "_blank",
  },
  {
    icon: FileText,
    label: "Resume",
    href: "/Gul-eRana-CV.pdf",
    download: true,
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="bg-glow w-[800px] h-[800px] bg-accent-blue/10 bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass p-12 md:p-20 rounded-[3rem] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-fg/5 to-transparent pointer-events-none" />

          <span className="section-num">09 — Contact</span>

          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Let's Build Something <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple text-glow">
              Amazing
            </span>
          </h2>

          <p className="text-xl text-text-muted mb-12 max-w-2xl mx-auto">
            Ready to bring your ideas to life? I'm currently available for freelance projects and full-time opportunities.
          </p>

          <a
            href="mailto:gulerana3205@gmail.com"
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-fg text-dark font-semibold rounded-full overflow-hidden transition-transform hover:scale-105 text-lg mb-16"
          >
            <span className="relative z-10">Get In Touch</span>
            <ArrowUpRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black dark:from-gray-200 dark:to-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <div className="flex flex-wrap justify-center items-center gap-4">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target={link.target}
                rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                download={link.download || undefined}
                className="flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-fg hover:text-dark transition-all duration-300 font-medium"
              >
                <link.icon className="w-4 h-4" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-8 relative z-10 border-t border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-fg/80 font-medium">
            Designed & Developed by{" "}
            <span className="text-fg font-bold tracking-wide">Gul-e-Rana</span>
          </p>
          <p className="text-text-muted text-sm">&copy; 2026 All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
