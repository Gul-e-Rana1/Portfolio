import type { Content } from "./types";

// Built-in content. The site shows this until the admin panel's
// "Import current content" has filled the database, and whenever
// the database can't be reached.
export const defaultContent: Content = {
  settings: {
    hero: {
      eyebrow: "Open to freelance & full-time roles",
      title: "Building software\nthat",
      highlight: "performs.",
      description:
        "I'm Gul-e-Rana, a full stack developer crafting fast, reliable web products and AI-powered tools — from polished React interfaces to robust Python and Laravel backends.",
      primary_cta: "Get in Touch",
      secondary_cta: "View Work",
    },
    contact: {
      email: "gulerana3205@gmail.com",
      linkedin: "https://linkedin.com/in/gul-e-rana",
      github: "https://github.com/Gul-e-Rana1",
      resume_url: "/Gul-eRana-CV.pdf",
      available: true,
    },
    dashboard: {
      subtitle: "Gul-e-Rana · Full Stack",
      latest_launch: "ResQ AI · Live",
      building_title: "Currently building",
      building_text: "New projects in progress",
      stack: [
        { name: "React / Next.js", value: 92 },
        { name: "Python / Flask", value: 85 },
        { name: "TypeScript", value: 78 },
        { name: "Laravel / PHP", value: 70 },
        { name: "MySQL / Supabase", value: 74 },
      ],
    },
    about_intro:
      "A Computer Science graduate from Quaid-i-Azam University, I combine solid engineering fundamentals with a product mindset — writing code that's clean, scalable and genuinely useful to the people who rely on it.",
    sections: {
      why: { eyebrow: "Why work with me", title: "Built for", highlight: "real-world impact.", description: "" },
      work: {
        eyebrow: "Selected work",
        title: "Products I've",
        highlight: "designed & shipped.",
        description: "A selection of platforms, AI tools and client builds — each one taken from idea to a working, tested product.",
      },
      skills: {
        eyebrow: "Capabilities",
        title: "A complete,",
        highlight: "modern toolkit.",
        description: "The technologies I use to take products from first commit to production.",
      },
      experience: {
        eyebrow: "Experience",
        title: "Where I've",
        highlight: "built & grown.",
        description: "A track record of shipping real software — for clients, for teams and through independent work.",
      },
      education: {
        eyebrow: "Education & certifications",
        title: "Strong",
        highlight: "foundations.",
        description: "A rigorous computer science education, reinforced by national AI and data programs.",
      },
      process: {
        eyebrow: "Process",
        title: "From idea to",
        highlight: "production.",
        description: "A clear, structured workflow that keeps projects predictable and quality high.",
      },
      contact: {
        eyebrow: "Available for new projects",
        title: "Have an idea?\n",
        highlight: "Let's build it.",
        description:
          "Open to freelance projects and full-time opportunities. Tell me what you're building and let's turn it into something real.",
      },
    },
  },

  projects: [
    {
      id: "p1",
      title: "ResQ AI",
      category: "AI · Emergency Response",
      status: "Live",
      description:
        "An AI-powered disaster response platform that coordinates admins, camp managers and relief seekers in real time — with role-based access, live resource tracking and a clean, crisis-ready interface.",
      tech: ["Next.js", "TypeScript", "Supabase", "React Query", "AI/ML"],
      image_url: "/Resq AI.png",
      live_url: "https://res-q-ai-xi.vercel.app/",
      github_url: "https://github.com/Gul-e-Rana1/ResQ-AI",
      featured: true,
      is_placeholder: false,
    },
    {
      id: "p2",
      title: "Deepfake Detection System",
      category: "Final Year Project",
      status: "FYP",
      description:
        "A full stack platform that analyses facial media to flag deepfake manipulation, pairing a trained detection model with a React interface and Flask API.",
      tech: ["React.js", "Flask", "Python", "MySQL", "AI/ML"],
      image_url:
        "https://images.unsplash.com/photo-1696272440000-0808a203c852?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwZGVlcGZha2UlMjBmYWNlJTIwbWVzaCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzgyNzM3MTI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      live_url: "",
      github_url: "https://github.com/Gul-e-Rana1/DFD",
      featured: false,
      is_placeholder: false,
    },
    {
      id: "p3",
      title: "SlackBot Platform",
      category: "Workplace Automation",
      status: "Live",
      description:
        "A responsive interface for an AI-powered Slack bot, with seamless API integration and a streamlined experience for automating everyday team workflows.",
      tech: ["React", "Tailwind CSS", "REST APIs"],
      image_url:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXNwb25zaXZlJTIwZGFzaGJvYXJkJTIwdWklMjB3ZWIlMjBkZXNpZ258ZW58MXx8fHwxNzgyNzM3MTI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      live_url: "https://app.meta360.dev/",
      github_url: "",
      featured: false,
      is_placeholder: false,
    },
    {
      id: "p4",
      title: "Envoice",
      category: "Business Management",
      status: "Platform",
      description:
        "A scalable invoicing and business management platform built on reusable components and an efficient frontend architecture for smooth day-to-day operations.",
      tech: ["React", "Laravel", "Ant Design", "Tailwind CSS"],
      image_url:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      live_url: "",
      github_url: "",
      featured: false,
      is_placeholder: false,
    },
    {
      id: "p5",
      title: "Handwritten Digit Recognition",
      category: "Computer Vision",
      status: "AI Model",
      description:
        "A deep learning app that recognises handwritten digits from uploaded images — custom model training, integration and real-time inference in one Streamlit experience.",
      tech: ["Python", "Deep Learning", "Computer Vision", "Streamlit"],
      image_url:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      live_url: "",
      github_url: "https://github.com/Gul-e-Rana1/Digit_Recognition",
      featured: false,
      is_placeholder: false,
    },
    {
      id: "p6",
      title: "Personal Portfolio",
      category: "Design & Frontend",
      status: "Live",
      description:
        "This site — a premium, motion-driven portfolio built with React, Framer Motion and a custom Tailwind design system.",
      tech: ["React", "Framer Motion", "Tailwind CSS", "Supabase"],
      image_url:
        "https://images.unsplash.com/photo-1559028012-481c04fa702d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGNvZGluZyUyMGFuaW1hdGlvbiUyMHBvcnRmb2xpbyUyMHdlYiUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc4MjczNzEyOHww&ixlib=rb-4.1.0&q=80&w=1080",
      live_url: "https://gul-e-rana.vercel.app",
      github_url: "https://github.com/Gul-e-Rana1/Portfolio",
      featured: false,
      is_placeholder: false,
    },
    {
      id: "p7",
      title: "Next Project",
      category: "In Development",
      status: "Building",
      description: "New projects are currently in progress. Something new is on the way — check back soon.",
      tech: ["Research", "Development"],
      image_url: "",
      live_url: "",
      github_url: "",
      featured: false,
      is_placeholder: true,
    },
  ],

  skills: [
    {
      id: "s1",
      icon: "Monitor",
      category: "Frontend",
      description: "Responsive, accessible interfaces with modern frameworks.",
      items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5", "CSS3", "Bootstrap"],
    },
    {
      id: "s2",
      icon: "Server",
      category: "Backend",
      description: "APIs and server logic that scale with the product.",
      items: ["Python", "Flask", "Laravel", "PHP", "REST APIs"],
    },
    {
      id: "s3",
      icon: "Database",
      category: "Data & Storage",
      description: "Structured, reliable data layers.",
      items: ["MySQL", "Supabase", "XAMPP"],
    },
    {
      id: "s4",
      icon: "BrainCircuit",
      category: "AI, ML & Data Science",
      description: "From model training to production integration.",
      items: ["Model Training", "Computer Vision", "AI Integration", "Bot Development", "Data Analysis", "Power BI"],
    },
    {
      id: "s5",
      icon: "Wrench",
      category: "Tools & Workflow",
      description: "A dependable, Git-driven delivery workflow.",
      items: ["Git", "GitHub", "VS Code", "Postman", "Figma", "Vercel"],
    },
    {
      id: "s6",
      icon: "Users",
      category: "Collaboration",
      description: "The skills that make teams ship faster.",
      items: ["Problem Solving", "Communication", "Team Collaboration", "Critical Thinking"],
    },
  ],

  experiences: [
    {
      id: "e1",
      title: "Freelance Full Stack Developer",
      company: "Self-Employed",
      period: "Jun 2026 — Present",
      is_current: true,
      description:
        "Partnering with clients to design, build and deploy responsive web applications — owning everything from API integration and UI/UX to testing and launch.",
      tags: ["Client Delivery", "Full Stack", "Deployment"],
    },
    {
      id: "e2",
      title: "Full Stack Developer Intern",
      company: "UExel Solutions Pvt. Ltd. · Islamabad",
      period: "Nov 2025 — May 2026",
      is_current: false,
      description:
        "Shipped features and fixes across production applications using modern stacks, collaborating closely with the team through code reviews, testing and Git-based workflows.",
      tags: ["Feature Development", "QA", "Team Workflow"],
    },
    {
      id: "e3",
      title: "Independent Projects",
      company: "Personal R&D",
      period: "2023 — Present",
      is_current: false,
      description:
        "Built a portfolio of projects spanning full stack web development, AI/ML, computer vision and data science — a continuous lab for learning and applying new technologies.",
      tags: ["AI/ML", "Computer Vision", "Web Platforms"],
    },
  ],

  education: [
    {
      id: "ed1",
      title: "BS Computer Science",
      subtitle: "Quaid-i-Azam University, Islamabad",
      stat: "3.7",
      stat_label: "CGPA / 4.0",
      period: "2021 — 2025",
    },
    {
      id: "ed2",
      title: "ICS",
      subtitle: "IMCG (P.G.) F-7/4, Islamabad",
      stat: "A",
      stat_label: "Grade",
      period: "",
    },
  ],

  certifications: [
    {
      id: "c1",
      title: "NAVTTC High Impact Training",
      issuer: "NAVTTC",
      description: "Intensive training in Artificial Intelligence, Data Science and Blockchain.",
      url: "",
    },
    {
      id: "c2",
      title: "ACT AI Training Program",
      issuer: "AI Skillbridge · HEC · PMYP · NAVTTC",
      description: "Awareness, Competency & Tools training for AI — a national initiative.",
      url: "",
    },
    {
      id: "c3",
      title: "Microsoft Power BI",
      issuer: "Udemy",
      description: "Certification in data modelling, analysis and dashboard visualization.",
      url: "",
    },
  ],

  stats: [
    { id: "st1", value: "10+", label: "Projects shipped", sub: "Web apps, AI tools & platforms", icon: "Rocket", in_dashboard: true, dashboard_note: "Web · AI · Data" },
    { id: "st2", value: "15+", label: "Technologies", sub: "Frontend, backend, data & AI", icon: "Layers", in_dashboard: true, dashboard_note: "Across the stack" },
    { id: "st3", value: "3.7", label: "CGPA", sub: "BS Computer Science, QAU", icon: "GraduationCap", in_dashboard: false, dashboard_note: "" },
    { id: "st4", value: "3+", label: "Years building", sub: "Shipping code since 2023", icon: "Code2", in_dashboard: true, dashboard_note: "Since 2023" },
  ],

  features: [
    {
      id: "f1",
      icon: "Layers",
      tag: "End-to-end",
      title: "Full stack ownership",
      description:
        "From database schema to the final pixel — React and Next.js frontends backed by Flask, Laravel and Supabase, built as one coherent product.",
    },
    {
      id: "f2",
      icon: "BrainCircuit",
      tag: "AI-ready",
      title: "AI & data, applied",
      description:
        "Hands-on with model training, computer vision and AI integration — turning research ideas like deepfake detection into usable tools.",
    },
    {
      id: "f3",
      icon: "Gauge",
      tag: "Performance",
      title: "Fast, responsive interfaces",
      description:
        "Clean component architecture, smooth motion and layouts that feel right on every screen, with performance treated as a feature.",
    },
    {
      id: "f4",
      icon: "ShieldCheck",
      tag: "Reliability",
      title: "Tested & production-ready",
      description:
        "QA is part of every build — thorough testing, Git-based workflows and clean deployments so what ships keeps working.",
    },
  ],

  process: [
    { id: "pr1", icon: "Search", title: "Discover", description: "Clarify goals, users and requirements so every decision serves the outcome." },
    { id: "pr2", icon: "PenTool", title: "Architect", description: "Plan the data model, user flows and technical approach before writing code." },
    { id: "pr3", icon: "Code2", title: "Build", description: "Develop in focused iterations — clean, responsive and maintainable by design." },
    { id: "pr4", icon: "Rocket", title: "Test & Ship", description: "Test thoroughly, optimise performance and deploy a production-ready release." },
  ],
};
