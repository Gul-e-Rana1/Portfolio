import { motion } from "motion/react";
import { Github, ArrowUpRight, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SectionHeading } from "./SectionHeading";
import { useContent } from "../content/ContentContext";
import type { Project } from "../data/types";


function ProjectLinks({ project }: { project: Project }) {
  if (!project.live_url && !project.github_url) return null;
  return (
    <div className="flex items-center gap-2">
      {project.live_url && (
        <a
          href={project.live_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border border-border bg-surface hover:border-accent-blue/30 hover:bg-surface-hover transition-all duration-300"
        >
          Live <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      )}
      {project.github_url && (
        <a
          href={project.github_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on GitHub`}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-text-muted hover:text-fg transition-colors duration-300"
        >
          <Github className="w-3.5 h-3.5" /> Code
        </a>
      )}
    </div>
  );
}

function ProjectCard({ project, featured, index }: { project: Project; featured?: boolean; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`glass glass-hover rounded-3xl p-3 group flex flex-col ${
        featured ? "lg:col-span-2 lg:grid lg:grid-cols-[1.4fr_1fr] lg:gap-4" : ""
      }`}
    >
      {/* Media */}
      <div className={`relative overflow-hidden rounded-2xl ${featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[380px]" : "aspect-[16/10]"}`}>
        {project.is_placeholder ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(122,162,255,0.12),transparent_70%)]">
            <div className="absolute inset-0 grid-pattern" />
            <div className="relative w-16 h-16 rounded-2xl glass flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-6 h-6 text-accent-silver" strokeWidth={1.5} />
            </div>
          </div>
        ) : (
          <>
            <ImageWithFallback
              src={project.image_url}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/10 to-transparent" />
            <div className="absolute inset-0 bg-accent-blue/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700" />
          </>
        )}
        <span className="pill absolute top-4 left-4 backdrop-blur-md bg-dark/40">
          <span className={`w-1.5 h-1.5 rounded-full ${project.status === "Live" ? "bg-accent-teal" : "bg-accent-blue"}`} />
          {project.status}
        </span>
      </div>

      {/* Body */}
      <div className={`flex flex-col flex-1 p-4 ${featured ? "lg:p-8 lg:justify-center" : "pt-6"}`}>
        <p className="text-[11px] uppercase tracking-[0.2em] text-accent-blue/80 mb-3">{project.category}</p>
        <h3 className={`${featured ? "text-3xl md:text-4xl" : "text-2xl"} font-semibold tracking-tight mb-3`}>
          {project.title}
        </h3>
        <p className="text-text-muted leading-relaxed text-[15px] mb-6">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((t) => (
            <span key={t} className="text-[11px] px-2.5 py-1 rounded-md border border-border bg-fg/[0.02] text-fg/70">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto">
          <ProjectLinks project={project} />
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const { settings, projects } = useContent();
  return (
    <section id="work" className="py-28 md:py-36 relative">
      <div className="bg-glow w-[700px] h-[700px] bg-accent-purple/[0.06] top-40 -left-60" />
      <div className="container mx-auto px-6 max-w-7xl relative">
        <SectionHeading copy={settings.sections.work} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} featured={project.featured} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
