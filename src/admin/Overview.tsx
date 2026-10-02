import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DatabaseZap, Eye, MousePointerClick, Monitor, Globe, Users, CalendarDays, Infinity as InfinityIcon } from "lucide-react";
import { supabase } from "../app/lib/supabase";
import { defaultContent } from "../app/data/defaults";
import { contentTables } from "../app/data/types";
import { collections } from "./schemas";
import { Button, Card, PageHeader, Spinner, toast } from "./ui";

type Analytics = {
  views: number;
  visitors: number;
  today: number;
  all_time: number;
  daily: { day: string; views: number; visitors: number }[];
  referrers: { label: string; count: number }[];
  devices: { label: string; count: number }[];
  clicks: { label: string; count: number }[];
};

const ranges = [7, 30, 90] as const;

function formatDay(day: string) {
  return new Date(day + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

const contentKeys = Object.keys(contentTables) as (keyof typeof contentTables)[];

/** Names of sections whose table has no rows yet (plus "Site content" if settings are missing). */
async function findEmptySections(): Promise<string[]> {
  const empty: string[] = [];
  const { data: settings } = await supabase.from("site_settings").select("id").eq("id", 1).maybeSingle();
  if (!settings) empty.push("Site content");
  const counts = await Promise.all(
    contentKeys.map((k) => supabase.from(contentTables[k]).select("id", { count: "exact", head: true })),
  );
  counts.forEach((res, i) => {
    if (!res.error && !res.count) empty.push(collections[contentKeys[i]].label);
  });
  return empty;
}

/**
 * Copies the built-in content into empty tables only — existing rows and
 * already-saved site settings are never overwritten.
 */
async function importDefaults() {
  for (const key of contentKeys) {
    const table = contentTables[key];
    const { count, error: countErr } = await supabase.from(table).select("id", { count: "exact", head: true });
    if (countErr) throw countErr;
    if (count) continue;
    const rows = (defaultContent[key] as { id: string }[]).map(({ id: _id, ...row }, i) => ({ ...row, sort_order: i, visible: true }));
    const { error } = await supabase.from(table).insert(rows);
    if (error) throw new Error(`${table}: ${error.message}`);
  }
  const { data: existing } = await supabase.from("site_settings").select("id").eq("id", 1).maybeSingle();
  if (!existing) {
    const { error } = await supabase
      .from("site_settings")
      .insert({ id: 1, data: defaultContent.settings, updated_at: new Date().toISOString() });
    if (error) throw error;
  }
}

function Kpi({ icon: Icon, label, value }: { icon: typeof Eye; label: string; value: number | string }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 text-text-muted">
        <Icon className="w-4 h-4" />
        <span className="text-xs uppercase tracking-[0.12em]">{label}</span>
      </div>
      <p className="font-heading text-3xl md:text-4xl font-semibold mt-3 text-gradient">{value}</p>
    </Card>
  );
}

function BarList({ icon: Icon, title, rows, empty }: { icon: typeof Eye; title: string; rows: { label: string; count: number }[]; empty: string }) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 text-accent-silver" />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-text-muted py-4">{empty}</p>
      ) : (
        <ul className="space-y-2.5">
          {rows.map((r) => (
            <li key={r.label} title={`${r.label}: ${r.count}`}>
              <div className="flex justify-between gap-3 text-xs mb-1">
                <span className="truncate text-fg/85">{r.label}</span>
                <span className="text-text-muted tabular-nums">{r.count}</span>
              </div>
              <div className="h-1.5 rounded-full bg-fg/5 overflow-hidden">
                <div className="h-full rounded-full bg-accent-blue/80" style={{ width: `${(r.count / max) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function ChartTooltip({ active, payload }: { active?: boolean; payload?: { payload: Analytics["daily"][number] }[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="glass bg-dark-2/95 rounded-lg px-3 py-2 text-xs">
      <p className="text-text-muted mb-1">{formatDay(d.day)}</p>
      <p><span className="text-fg font-semibold tabular-nums">{d.views}</span> <span className="text-text-muted">views</span></p>
      <p><span className="text-fg font-semibold tabular-nums">{d.visitors}</span> <span className="text-text-muted">visitors</span></p>
    </div>
  );
}

export function Overview() {
  const [days, setDays] = useState<(typeof ranges)[number]>(30);
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [emptySections, setEmptySections] = useState<string[]>([]);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    findEmptySections().then(setEmptySections);
  }, []);

  useEffect(() => {
    setLoading(true);
    supabase.rpc("get_analytics", { days }).then(({ data, error }) => {
      if (error) toast(`Analytics: ${error.message}`, "error");
      setData((data as Analytics) ?? null);
      setLoading(false);
    });
  }, [days]);

  const runImport = async () => {
    if (!confirm(`Fill these empty sections with the built-in content?\n\n${emptySections.join(", ")}\n\nNothing you have already saved will be changed.`)) return;
    setImporting(true);
    try {
      await importDefaults();
      setEmptySections(await findEmptySections());
      toast("Content imported — you can now edit everything from the sidebar");
    } catch (err) {
      toast(`Import failed: ${(err as Error).message}`, "error");
    } finally {
      setImporting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Overview"
        description="How visitors find and use your portfolio. Your own visits (this browser) and localhost are not counted."
        actions={
          <div className="flex rounded-xl border border-border bg-surface p-1">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setDays(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  days === r ? "bg-fg text-dark" : "text-text-muted hover:text-fg"
                }`}
              >
                {r} days
              </button>
            ))}
          </div>
        }
      />

      {emptySections.length > 0 && (
        <Card className="p-6 mb-6 border-accent-blue/30 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-11 h-11 rounded-xl bg-accent-blue/10 border border-accent-blue/25 flex items-center justify-center shrink-0">
            <DatabaseZap className="w-5 h-5 text-accent-blue" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold">Import built-in content</h2>
            <p className="text-sm text-text-muted mt-1">
              These sections are empty on your website: <span className="text-fg/90">{emptySections.join(", ")}</span>.
              Import the built-in content to fill them — anything you've already saved stays as it is.
            </p>
          </div>
          <Button variant="primary" onClick={runImport} loading={importing}>Import content</Button>
        </Card>
      )}

      {loading && !data ? (
        <div className="py-20 flex justify-center"><Spinner /></div>
      ) : !data ? (
        <Card className="p-10 text-center text-text-muted">Analytics couldn't be loaded. Make sure supabase/schema.sql has been run.</Card>
      ) : (
        <div className={`space-y-4 transition-opacity ${loading ? "opacity-60" : ""}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Kpi icon={Eye} label={`Views · ${days}d`} value={data.views} />
            <Kpi icon={Users} label={`Visitors · ${days}d`} value={data.visitors} />
            <Kpi icon={CalendarDays} label="Views today" value={data.today} />
            <Kpi icon={InfinityIcon} label="All-time views" value={data.all_time} />
          </div>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Page views per day</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.daily} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="viewsFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#7aa2ff" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#7aa2ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="rgba(170,190,230,0.08)" />
                  <XAxis
                    dataKey="day"
                    tickFormatter={formatDay}
                    tick={{ fill: "rgba(214,222,240,0.5)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    minTickGap={24}
                  />
                  <YAxis allowDecimals={false} tick={{ fill: "rgba(214,222,240,0.5)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(201,211,227,0.3)" }} />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#7aa2ff"
                    strokeWidth={2}
                    fill="url(#viewsFill)"
                    activeDot={{ r: 5, fill: "#c9d3e3", stroke: "#05070d", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <BarList icon={Globe} title="Top sources" rows={data.referrers} empty="No visits yet." />
            <BarList icon={Monitor} title="Devices" rows={data.devices} empty="No visits yet." />
            <BarList icon={MousePointerClick} title="Most clicked" rows={data.clicks} empty="No clicks recorded yet." />
          </div>
        </div>
      )}
    </div>
  );
}
