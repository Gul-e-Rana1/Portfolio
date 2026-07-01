import { motion } from "motion/react";
import { Github, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type Project = {
  title: string;
  description: string;
  tech: string[];
  image: string;
  hasLinks?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  isPlaceholder?: boolean;
};

const projects: Project[] = [
  {
    title: "Deep Fake Detection System",
    description: "An AI-powered deepfake detection platform developed using React.js, Flask, and MySQL to identify manipulated facial media.",
    tech: ["React.js", "Flask", "MySQL", "Python", "AI/ML"],
    image: "https://images.unsplash.com/photo-1696272440000-0808a203c852?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwZGVlcGZha2UlMjBmYWNlJTIwbWVzaCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzgyNzM3MTI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    hasLinks: true
  },
  {
    title: "SlackBot Platform",
    description: "A modern AI-powered SlackBot interface developed with responsive UI components, seamless API integration, and an optimized user experience for workplace automation.",
    tech: ["React", "Tailwind CSS", "REST APIs", "Responsive UI"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXNwb25zaXZlJTIwZGFzaGJvYXJkJTIwdWklMjB3ZWIlMjBkZXNpZ258ZW58MXx8fHwxNzgyNzM3MTI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    liveUrl: "https://app.meta360.dev/"
  },
  {
    title: "Handwritten Digit Recognition",
    description: "An AI-powered computer vision application that identifies handwritten digits from uploaded images using a custom-trained deep learning model. Developed as a one-page Streamlit application with complete model training, integration, and real-time inference.",
    tech: ["Python", "Computer Vision", "Deep Learning", "Streamlit"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    hasLinks: false
  },
  {
    title: "Envoice",
    description: "A scalable invoicing and business management platform featuring responsive interfaces, reusable components, and efficient frontend architecture for a seamless user experience.",
    tech: ["React", "Ant Design", "Laravel", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    hasLinks: false
  },
  {
    title: "Personal Portfolio",
    description: "A premium animated portfolio built with React, Framer Motion, and modern web technologies to showcase professional work.",
    tech: ["React", "Framer Motion", "Tailwind CSS", "Design System"],
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGNvZGluZyUyMGFuaW1hdGlvbiUyMHBvcnRmb2xpbyUyMHdlYiUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc4MjczNzEyOHww&ixlib=rb-4.1.0&q=80&w=1080",
    hasLinks: true
  },
  {
    title: "Upcoming Project",
    description: "Currently ideating and developing a new scalable digital solution. Stay tuned for updates on this space.",
    tech: ["Innovation", "Research", "Development"],
    image: "",
    hasLinks: false,
    isPlaceholder: true
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="section-num">03 — Work</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-purple to-accent-blue rounded-full" />
        </motion.div>

        <div className="space-y-32">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
            >
              <div className="w-full lg:w-3/5 group">
                <div className={`relative aspect-video rounded-3xl overflow-hidden glass p-2 ${project.isPlaceholder ? 'flex items-center justify-center bg-surface/50' : ''}`}>
                  {project.isPlaceholder ? (
                    <div className="text-center text-text-muted">
                      <div className="w-16 h-16 rounded-full border border-border mx-auto mb-4 flex items-center justify-center animate-pulse">
                        <span className="text-2xl">✨</span>
                      </div>
                      <p className="font-medium tracking-widest uppercase text-sm">Coming Soon</p>
                    </div>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-accent-purple/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover rounded-[20px] group-hover:scale-105 transition-transform duration-700"
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="w-full lg:w-2/5 space-y-6">
                <h3 className="text-3xl font-bold text-white group-hover:text-glow transition-all">{project.title}</h3>
                <p className="text-text-muted text-lg leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs font-medium uppercase tracking-wider text-accent-blue/80 bg-accent-blue/10 px-3 py-1 rounded-full border border-accent-blue/20">
                      {t}
                    </span>
                  ))}
                </div>
                
                {(project.hasLinks || project.liveUrl || project.githubUrl) && (
                  <div className="flex flex-wrap items-center gap-4 pt-6">
                    {(project.liveUrl || project.hasLinks) && (
                      project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full glass hover:bg-white hover:text-dark transition-colors font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                      ) : (
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full glass hover:bg-white hover:text-dark transition-colors font-medium">
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </button>
                      )
                    )}
                    {(project.githubUrl || project.hasLinks) && (
                      project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-text-muted hover:text-white transition-colors"
                        >
                          <Github className="w-5 h-5" />
                          <span>GitHub</span>
                        </a>
                      ) : (
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full text-text-muted hover:text-white transition-colors">
                          <Github className="w-5 h-5" />
                          <span>GitHub</span>
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
