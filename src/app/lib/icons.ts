import {
  Award, BarChart3, BrainCircuit, Briefcase, Cloud, Code2, Cpu, Database, Gauge, Globe,
  GraduationCap, Layers, Lightbulb, Monitor, PenTool, Rocket, Search, Server, ShieldCheck,
  Smartphone, Sparkles, Star, Target, Users, Wrench, Zap, type LucideIcon,
} from "lucide-react";

// Icons selectable from the admin panel. Stored in the database by name.
export const icons: Record<string, LucideIcon> = {
  Award, BarChart3, BrainCircuit, Briefcase, Cloud, Code2, Cpu, Database, Gauge, Globe,
  GraduationCap, Layers, Lightbulb, Monitor, PenTool, Rocket, Search, Server, ShieldCheck,
  Smartphone, Sparkles, Star, Target, Users, Wrench, Zap,
};

export const iconNames = Object.keys(icons);

export function getIcon(name?: string | null): LucideIcon {
  return (name && icons[name]) || Sparkles;
}
