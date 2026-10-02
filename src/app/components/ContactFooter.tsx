import { motion } from "motion/react";
import { Mail, Linkedin, Github, FileText, ArrowUpRight } from "lucide-react";
import { useContent } from "../content/ContentContext";
import { GradientTitle } from "./SectionHeading";

export function Contact() {
  const { contact, sections } = useContent().settings;
  const copy = sections.contact;
  const mailto = `mailto:${contact.email}`;
  return (
    <section id="contact" className="py-28 md:py-36 relative">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2rem] border border-border overflow-hidden px-6 py-20 md:px-16 md:py-28 text-center bg-dark-2"
        >
          {/* Atmospheric layers */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(122,162,255,0.18),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_120%,rgba(162,155,254,0.14),transparent_70%)]" />
          <div className="absolute inset-0 grid-pattern opacity-70" />
          <div className="absolute inset-x-0 top-0 h-px hairline" />
          <div className="bg-glow w-[400px] h-[200px] bg-accent-blue/20 -top-24 left-1/2 -translate-x-1/2 animate-pulse-glow" />

          <div className="relative">
            <span className="eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-teal shadow-[0_0_8px_rgba(110,231,210,0.9)]" />
              {copy.eyebrow}
            </span>

            <h2 className="mt-8 text-4xl sm:text-5xl md:text-7xl font-semibold tracking-[-0.035em] leading-[1.02]">
              <GradientTitle title={copy.title} highlight={copy.highlight} />
            </h2>

            <p className="mt-8 text-lg text-text-muted max-w-xl mx-auto leading-relaxed">
              {copy.description}
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <a href={mailto} className="btn-primary group">
                <Mail className="w-4 h-4" />
                Email Me
                <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Linkedin className="w-4 h-4" />
                Connect on LinkedIn
              </a>
            </div>

            <p className="mt-8 text-sm text-text-muted">{contact.email}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  const { contact } = useContent().settings;
  const links = [
    { icon: Linkedin, label: "LinkedIn", href: contact.linkedin },
    { icon: Github, label: "GitHub", href: contact.github },
    { icon: FileText, label: "Resume", href: contact.resume_url },
  ].filter((l) => l.href);
  return (
    <footer className="relative z-10 pb-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="h-px hairline mb-10" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="" className="h-8 w-8 object-contain" />
            <p className="text-sm text-text-muted">
              Designed & developed by <span className="text-fg font-medium">Gul-e-Rana</span>
            </p>
          </div>

          <div className="flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="p-2.5 rounded-lg text-text-muted hover:text-fg hover:bg-surface transition-colors duration-300"
              >
                <link.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <p className="text-xs text-text-muted">&copy; {new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
