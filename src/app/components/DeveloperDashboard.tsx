import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import { useContent } from "../content/ContentContext";
import { getIcon } from "../lib/icons";
import type { ReactNode } from "react";

// Shape of the activity curve (relative, 0–1) — illustrative build momentum over time.
const activity = [0.18, 0.22, 0.2, 0.3, 0.28, 0.38, 0.35, 0.46, 0.52, 0.49, 0.6, 0.66, 0.62, 0.74, 0.82, 0.78, 0.9];
const months = ["2023", "2024", "2025", "2026"];

function buildPath(values: number[], w: number, h: number) {
  const step = w / (values.length - 1);
  const pts = values.map((v, i) => [i * step, h - v * h * 0.85 - 4] as const);
  // Smooth with simple cubic midpoints
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
  }
  return { line: d, area: `${d} L ${w} ${h} L 0 ${h} Z`, last: pts[pts.length - 1] };
}

const CHART_W = 320;
const CHART_H = 120;
const chart = buildPath(activity, CHART_W, CHART_H);

function Float({
  children,
  className = "",
  delay = 0,
  amplitude = 8,
  duration = 7,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amplitude?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -amplitude, 0] }}
      transition={{
        opacity: { duration: 1, delay },
        y: reduce
          ? { duration: 1, delay }
          : { duration, delay, repeat: Infinity, ease: "easeInOut" },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function DeveloperDashboard() {
  const { settings, stats } = useContent();
  const { dashboard, contact } = settings;
  const kpis = stats.filter((s) => s.in_dashboard).slice(0, 3);
  const stack = dashboard.stack.filter((s) => s.name);
  return (
    <div className="relative w-full max-w-[560px] mx-auto">
      {/* Ambient glows behind the panel */}
      <div className="absolute -inset-10 -z-10">
        <div className="bg-glow w-72 h-72 bg-accent-blue/25 top-0 right-0 animate-pulse-glow" />
        <div className="bg-glow w-64 h-64 bg-accent-purple/20 bottom-0 left-0 animate-pulse-glow [animation-delay:3s]" />
      </div>

      {/* ── Main panel ─────────────────────────────── */}
      <Float delay={0.6} amplitude={6} duration={9}>
        <div className="glass rounded-2xl p-4 sm:p-5 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px hairline" />

          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-silver/30 to-accent-blue/20 border border-border flex items-center justify-center text-[11px] font-bold tracking-wider">
                GR
              </div>
              <div>
                <p className="text-sm font-semibold leading-none">Developer Overview</p>
                <p className="text-[11px] text-text-muted mt-1">{dashboard.subtitle}</p>
              </div>
            </div>
            {contact.available && (
            <span className="pill">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-70 animate-ping" />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-accent-teal" />
              </span>
              Available
            </span>
            )}
          </div>

          {/* KPI row */}
          {kpis.length > 0 && (
          <div className={`grid gap-2 sm:gap-3 mb-3 ${["grid-cols-1", "grid-cols-2", "grid-cols-3"][kpis.length - 1]}`}>
            {kpis.map((k) => {
              const Icon = getIcon(k.icon);
              return (
              <div key={k.id} className="rounded-xl border border-border bg-surface p-2.5 sm:p-3">
                <div className="flex items-center gap-1.5 text-text-muted">
                  <Icon className="w-3 h-3 shrink-0" />
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.12em] truncate">{k.label}</span>
                </div>
                <p className="font-heading text-xl sm:text-2xl font-semibold mt-2 text-gradient">{k.value}</p>
                <p className="text-[9px] sm:text-[10px] text-text-muted mt-0.5 truncate">{k.dashboard_note}</p>
              </div>
              );
            })}
          </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {/* Activity chart */}
            <div className="sm:col-span-3 rounded-xl border border-border bg-surface p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-medium text-fg/80">Commit activity</p>
                <span className="inline-flex items-center gap-1 text-[10px] text-accent-teal">
                  <ArrowUpRight className="w-3 h-3" /> Trending up
                </span>
              </div>
              <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="w-full h-24 sm:h-28 overflow-visible">
                <defs>
                  <linearGradient id="dash-area" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#7aa2ff" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#7aa2ff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="dash-line" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#a29bfe" />
                    <stop offset="100%" stopColor="#c9d3e3" />
                  </linearGradient>
                </defs>
                {[0.25, 0.5, 0.75].map((g) => (
                  <line key={g} x1="0" x2={CHART_W} y1={CHART_H * g} y2={CHART_H * g} stroke="rgba(170,190,230,0.07)" strokeDasharray="3 4" />
                ))}
                <motion.path
                  d={chart.area}
                  fill="url(#dash-area)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1.4 }}
                />
                <motion.path
                  d={chart.line}
                  fill="none"
                  stroke="url(#dash-line)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.9, ease: "easeInOut" }}
                />
                <motion.circle
                  cx={chart.last[0]}
                  cy={chart.last[1]}
                  r="4"
                  fill="#c9d3e3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.8 }}
                  style={{ filter: "drop-shadow(0 0 6px rgba(122,162,255,0.9))" }}
                />
              </svg>
              <div className="flex justify-between text-[9px] text-text-muted mt-1">
                {months.map((m) => <span key={m}>{m}</span>)}
              </div>
            </div>

            {/* Stack usage */}
            <div className="sm:col-span-2 rounded-xl border border-border bg-surface p-3">
              <p className="text-[11px] font-medium text-fg/80 mb-3">Stack usage</p>
              <div className="space-y-2.5">
                {stack.map((s, i) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-fg/70 truncate">{s.name}</span>
                    </div>
                    <div className="h-1 rounded-full bg-fg/5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-silver"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, Math.max(0, Number(s.value) || 0))}%` }}
                        transition={{ duration: 1.4, delay: 1.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Float>

      {/* ── Floating: latest launch ─────────────────── */}
      {dashboard.latest_launch && (
      <Float delay={1.4} amplitude={10} duration={8} className="hidden sm:block absolute -top-8 -right-6 lg:-right-10 z-10">
        <div className="glass rounded-xl px-4 py-3 flex items-center gap-3 shadow-2xl">
          <div className="w-8 h-8 rounded-lg bg-accent-teal/10 border border-accent-teal/20 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-accent-teal" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-text-muted">Latest launch</p>
            <p className="text-sm font-semibold">{dashboard.latest_launch}</p>
          </div>
        </div>
      </Float>
      )}

      {/* ── Floating: currently building ────────────── */}
      {dashboard.building_text && (
      <Float delay={1.7} amplitude={9} duration={10} className="hidden sm:block absolute -bottom-12 -left-6 lg:-left-14 z-10">
        <div className="glass rounded-xl p-4 w-60 shadow-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-accent-purple" />
            <p className="text-[10px] uppercase tracking-[0.15em] text-text-muted">{dashboard.building_title}</p>
          </div>
          <p className="text-sm font-medium leading-snug">{dashboard.building_text}</p>
          <div className="mt-3 h-1 rounded-full bg-fg/5 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-2/3 rounded-full bg-gradient-to-r from-accent-purple/70 to-accent-blue/70" />
            <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>
        </div>
      </Float>
      )}
    </div>
  );
}
