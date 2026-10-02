import { contentTables, type Content } from "../app/data/types";

export type FieldType = "text" | "textarea" | "url" | "tags" | "boolean" | "icon" | "image" | "number";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  help?: string;
  required?: boolean;
  /** Takes half the form width on larger screens */
  half?: boolean;
};

export type CollectionKey = Exclude<keyof Content, "settings">;

export type Collection = {
  key: CollectionKey;
  table: string;
  label: string;
  singular: string;
  description: string;
  titleField: string;
  subtitleField?: string;
  imageField?: string;
  iconField?: string;
  /** Boolean fields shown as badges in the list */
  badges?: { field: string; label: string }[];
  fields: Field[];
  blank: Record<string, unknown>;
};

export const collections: Record<CollectionKey, Collection> = {
  projects: {
    key: "projects",
    table: contentTables.projects,
    label: "Projects",
    singular: "project",
    description: "The Selected Work section. The first project marked Featured gets the wide card.",
    titleField: "title",
    subtitleField: "category",
    imageField: "image_url",
    badges: [
      { field: "featured", label: "Featured" },
      { field: "is_placeholder", label: "Coming soon" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, half: true },
      { name: "category", label: "Category", type: "text", placeholder: "AI · Emergency Response", half: true },
      { name: "status", label: "Status badge", type: "text", placeholder: "Live, FYP, Building…", help: "\"Live\" shows a green dot.", half: true },
      { name: "featured", label: "Featured (wide card)", type: "boolean", half: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "tech", label: "Tech stack", type: "tags", placeholder: "Type and press Enter" },
      { name: "image_url", label: "Cover image", type: "image", help: "Upload an image or paste a link. Landscape (16:10) looks best." },
      { name: "live_url", label: "Live link", type: "url", placeholder: "https://…", half: true },
      { name: "github_url", label: "GitHub link", type: "url", placeholder: "https://github.com/…", half: true },
      { name: "is_placeholder", label: "\"Coming soon\" placeholder card (no image)", type: "boolean" },
    ],
    blank: { title: "", category: "", status: "Live", description: "", tech: [], image_url: "", live_url: "", github_url: "", featured: false, is_placeholder: false, visible: true },
  },

  skills: {
    key: "skills",
    table: contentTables.skills,
    label: "Skills",
    singular: "skill group",
    description: "Skill cards in the Capabilities section.",
    titleField: "category",
    subtitleField: "description",
    iconField: "icon",
    fields: [
      { name: "category", label: "Group name", type: "text", required: true, half: true },
      { name: "icon", label: "Icon", type: "icon", half: true },
      { name: "description", label: "Short description", type: "text" },
      { name: "items", label: "Skills", type: "tags", placeholder: "Type a skill and press Enter" },
    ],
    blank: { category: "", description: "", icon: "Monitor", items: [], visible: true },
  },

  experiences: {
    key: "experiences",
    table: contentTables.experiences,
    label: "Experience",
    singular: "role",
    description: "Your work timeline, top to bottom.",
    titleField: "title",
    subtitleField: "company",
    badges: [{ field: "is_current", label: "Current" }],
    fields: [
      { name: "title", label: "Job title", type: "text", required: true, half: true },
      { name: "company", label: "Company · City", type: "text", half: true },
      { name: "period", label: "Period", type: "text", placeholder: "Jun 2026 — Present", half: true },
      { name: "is_current", label: "Current role", type: "boolean", half: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "tags", label: "Tags", type: "tags" },
    ],
    blank: { title: "", company: "", period: "", description: "", tags: [], is_current: false, visible: true },
  },

  education: {
    key: "education",
    table: contentTables.education,
    label: "Education",
    singular: "degree",
    description: "Degree cards with a highlighted figure such as CGPA.",
    titleField: "title",
    subtitleField: "subtitle",
    fields: [
      { name: "title", label: "Degree", type: "text", required: true, half: true },
      { name: "subtitle", label: "Institution", type: "text", half: true },
      { name: "stat", label: "Highlight figure", type: "text", placeholder: "3.7", half: true },
      { name: "stat_label", label: "Figure label", type: "text", placeholder: "CGPA / 4.0", half: true },
      { name: "period", label: "Period", type: "text", placeholder: "2021 — 2025" },
    ],
    blank: { title: "", subtitle: "", stat: "", stat_label: "", period: "", visible: true },
  },

  certifications: {
    key: "certifications",
    table: contentTables.certifications,
    label: "Certifications",
    singular: "certification",
    description: "Certificates and trainings shown under Education.",
    titleField: "title",
    subtitleField: "issuer",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, half: true },
      { name: "issuer", label: "Issued by", type: "text", half: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "url", label: "Credential link (optional)", type: "url", placeholder: "https://…" },
    ],
    blank: { title: "", issuer: "", description: "", url: "", visible: true },
  },

  stats: {
    key: "stats",
    table: contentTables.stats,
    label: "Stats",
    singular: "stat",
    description: "Big numbers in the Metrics strip. Up to 3 marked \"Show in hero dashboard\" also appear on the hero.",
    titleField: "value",
    subtitleField: "label",
    iconField: "icon",
    badges: [{ field: "in_dashboard", label: "In dashboard" }],
    fields: [
      { name: "value", label: "Value", type: "text", placeholder: "10+", required: true, half: true },
      { name: "label", label: "Label", type: "text", placeholder: "Projects shipped", required: true, half: true },
      { name: "sub", label: "Small caption", type: "text", placeholder: "Web apps, AI tools & platforms" },
      { name: "in_dashboard", label: "Show in hero dashboard", type: "boolean", half: true },
      { name: "icon", label: "Dashboard icon", type: "icon", half: true },
      { name: "dashboard_note", label: "Dashboard caption", type: "text", placeholder: "Web · AI · Data" },
    ],
    blank: { value: "", label: "", sub: "", icon: "Rocket", in_dashboard: false, dashboard_note: "", visible: true },
  },

  features: {
    key: "features",
    table: contentTables.features,
    label: "Why work with me",
    singular: "card",
    description: "Feature cards under \"Why work with me\".",
    titleField: "title",
    subtitleField: "tag",
    iconField: "icon",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, half: true },
      { name: "tag", label: "Small tag", type: "text", placeholder: "Performance", half: true },
      { name: "icon", label: "Icon", type: "icon" },
      { name: "description", label: "Description", type: "textarea" },
    ],
    blank: { title: "", tag: "", description: "", icon: "Layers", visible: true },
  },

  process: {
    key: "process",
    table: contentTables.process,
    label: "Process",
    singular: "step",
    description: "Steps in the Process section, in order.",
    titleField: "title",
    subtitleField: "description",
    iconField: "icon",
    fields: [
      { name: "title", label: "Step name", type: "text", required: true, half: true },
      { name: "icon", label: "Icon", type: "icon", half: true },
      { name: "description", label: "Description", type: "textarea" },
    ],
    blank: { title: "", description: "", icon: "Code2", visible: true },
  },
};
