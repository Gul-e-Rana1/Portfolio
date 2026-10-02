// Shapes shared by the public site, the admin panel and the database tables.

type Row = { id: string; sort_order?: number; visible?: boolean };

export type Project = Row & {
  title: string;
  category: string;
  status: string;
  description: string;
  tech: string[];
  image_url: string;
  live_url: string;
  github_url: string;
  featured: boolean;
  is_placeholder: boolean;
};

export type SkillGroup = Row & {
  category: string;
  description: string;
  icon: string;
  items: string[];
};

export type Experience = Row & {
  title: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  is_current: boolean;
};

export type Education = Row & {
  title: string;
  subtitle: string;
  stat: string;
  stat_label: string;
  period: string;
};

export type Certification = Row & {
  title: string;
  issuer: string;
  description: string;
  url: string;
};

export type Stat = Row & {
  value: string;
  label: string;
  sub: string;
  icon: string;
  in_dashboard: boolean;
  dashboard_note: string;
};

export type Feature = Row & {
  title: string;
  tag: string;
  description: string;
  icon: string;
};

export type ProcessStep = Row & {
  title: string;
  description: string;
  icon: string;
};

export type SectionCopy = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
};

export type SectionKey = "why" | "work" | "skills" | "experience" | "education" | "process" | "contact";

export type Settings = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    primary_cta: string;
    secondary_cta: string;
  };
  contact: {
    email: string;
    linkedin: string;
    github: string;
    resume_url: string;
    available: boolean;
  };
  dashboard: {
    subtitle: string;
    latest_launch: string;
    building_title: string;
    building_text: string;
    stack: { name: string; value: number }[];
  };
  about_intro: string;
  sections: Record<SectionKey, SectionCopy>;
};

export type Content = {
  settings: Settings;
  projects: Project[];
  skills: SkillGroup[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  stats: Stat[];
  features: Feature[];
  process: ProcessStep[];
};

// Content key → database table
export const contentTables = {
  projects: "projects",
  skills: "skill_groups",
  experiences: "experiences",
  education: "education",
  certifications: "certifications",
  stats: "stats",
  features: "features",
  process: "process_steps",
} as const satisfies Record<Exclude<keyof Content, "settings">, string>;
