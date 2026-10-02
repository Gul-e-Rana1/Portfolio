import { useEffect, useState, type ReactNode } from "react";
import { ChevronDown, Plus, Save, Trash2 } from "lucide-react";
import { supabase } from "../app/lib/supabase";
import { mergeSettings } from "../app/content/ContentContext";
import type { SectionKey, Settings } from "../app/data/types";
import { Button, Card, FileUploadInput, Label, PageHeader, Spinner, TextArea, TextInput, Toggle, toast } from "./ui";

const sectionNames: Record<SectionKey, string> = {
  why: "Why work with me",
  work: "Selected work",
  skills: "Skills / Capabilities",
  experience: "Experience",
  education: "Education & certifications",
  process: "Process",
  contact: "Final call-to-action",
};

function Group({ title, description, children, defaultOpen = true }: { title: string; description?: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Card className="overflow-hidden">
      <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
        <div>
          <h2 className="font-semibold">{title}</h2>
          {description && <p className="text-xs text-text-muted mt-1">{description}</p>}
        </div>
        <ChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-6 pb-6 pt-1 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">{children}</div>}
    </Card>
  );
}

function F({ label, help, full, children }: { label: string; help?: string; full?: boolean; children: ReactNode }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <Label help={help}>{label}</Label>
      {children}
    </div>
  );
}

export function SettingsEditor() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("data")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) toast(`Couldn't load settings: ${error.message}`, "error");
        setSettings(mergeSettings(data?.data as Partial<Settings> | undefined));
      });
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  if (!settings) return <div className="py-20 flex justify-center"><Spinner /></div>;

  const patch = <K extends keyof Settings>(key: K, value: Partial<Settings[K]> | Settings[K]) => {
    setDirty(true);
    setSettings((s) => {
      const current = s![key];
      const next = typeof current === "object" && !Array.isArray(current) ? { ...current, ...(value as object) } : value;
      return { ...s!, [key]: next };
    });
  };

  const patchSection = (key: SectionKey, field: string, value: string) =>
    patch("sections", { ...settings.sections, [key]: { ...settings.sections[key], [field]: value } });

  const stack = settings.dashboard.stack;
  const setStack = (next: Settings["dashboard"]["stack"]) => patch("dashboard", { stack: next });

  const save = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .upsert({ id: 1, data: settings, updated_at: new Date().toISOString() });
    setSaving(false);
    if (error) return toast(`Save failed: ${error.message}`, "error");
    setDirty(false);
    toast("Site content saved — live on the website now");
  };

  const { hero, contact, dashboard } = settings;

  return (
    <div>
      <PageHeader
        title="Site content"
        description="Headlines, hero, contact details and the hero dashboard."
        actions={
          <Button variant="primary" onClick={save} loading={saving} disabled={!dirty && !saving}>
            {!saving && <Save className="w-4 h-4" />} {dirty ? "Save changes" : "Saved"}
          </Button>
        }
      />

      <div className="space-y-4">
        <Group title="Hero" description="The first thing visitors see.">
          <F label="Small label above headline" full>
            <TextInput value={hero.eyebrow} onChange={(e) => patch("hero", { eyebrow: e.target.value })} />
          </F>
          <F label="Headline" help="Press Enter for a line break.">
            <TextArea rows={2} className="!min-h-[72px]" value={hero.title} onChange={(e) => patch("hero", { title: e.target.value })} />
          </F>
          <F label="Highlighted words" help="Shown after the headline in the silver-blue gradient.">
            <TextInput value={hero.highlight} onChange={(e) => patch("hero", { highlight: e.target.value })} />
          </F>
          <F label="Intro paragraph" full>
            <TextArea value={hero.description} onChange={(e) => patch("hero", { description: e.target.value })} />
          </F>
          <F label="Main button text">
            <TextInput value={hero.primary_cta} onChange={(e) => patch("hero", { primary_cta: e.target.value })} />
          </F>
          <F label="Second button text">
            <TextInput value={hero.secondary_cta} onChange={(e) => patch("hero", { secondary_cta: e.target.value })} />
          </F>
        </Group>

        <Group title="Contact & availability" description="Used by every button and link on the site.">
          <div className="sm:col-span-2">
            <Toggle checked={contact.available} onChange={(v) => patch("contact", { available: v })} label="Show “Available” badge on the hero dashboard" />
          </div>
          <F label="Email">
            <TextInput type="email" value={contact.email} onChange={(e) => patch("contact", { email: e.target.value })} />
          </F>
          <F label="LinkedIn URL">
            <TextInput type="url" value={contact.linkedin} onChange={(e) => patch("contact", { linkedin: e.target.value })} />
          </F>
          <F label="GitHub URL" full>
            <TextInput type="url" value={contact.github} onChange={(e) => patch("contact", { github: e.target.value })} />
          </F>
          <F label="Resume (PDF)" help="Upload a new PDF or paste a link." full>
            <FileUploadInput value={contact.resume_url} onChange={(v) => patch("contact", { resume_url: v })} accept="application/pdf" folder="resume" maxMb={10} />
          </F>
        </Group>

        <Group title="Hero dashboard" description="Cards on the floating dashboard. Its three numbers come from Stats marked “Show in hero dashboard”.">
          <F label="Subtitle under “Developer Overview”" full>
            <TextInput value={dashboard.subtitle} onChange={(e) => patch("dashboard", { subtitle: e.target.value })} />
          </F>
          <F label="Latest launch card" help="Leave empty to hide the card." full>
            <TextInput value={dashboard.latest_launch} onChange={(e) => patch("dashboard", { latest_launch: e.target.value })} />
          </F>
          <F label="“Currently building” label">
            <TextInput value={dashboard.building_title} onChange={(e) => patch("dashboard", { building_title: e.target.value })} />
          </F>
          <F label="“Currently building” text" help="Leave empty to hide the card.">
            <TextInput value={dashboard.building_text} onChange={(e) => patch("dashboard", { building_text: e.target.value })} />
          </F>
          <div className="sm:col-span-2">
            <Label help="Bar length from 0 to 100.">Stack usage bars</Label>
            <div className="space-y-2">
              {stack.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <TextInput
                    value={s.name}
                    placeholder="React / Next.js"
                    onChange={(e) => setStack(stack.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))}
                  />
                  <TextInput
                    type="number"
                    min={0}
                    max={100}
                    className="!w-24 shrink-0"
                    value={s.value}
                    onChange={(e) => setStack(stack.map((x, j) => (j === i ? { ...x, value: Number(e.target.value) } : x)))}
                  />
                  <button
                    type="button"
                    aria-label="Remove bar"
                    onClick={() => setStack(stack.filter((_, j) => j !== i))}
                    className="p-2.5 rounded-xl text-text-muted hover:text-red-300 hover:bg-red-400/5 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <Button type="button" variant="subtle" onClick={() => setStack([...stack, { name: "", value: 70 }])}>
                <Plus className="w-4 h-4" /> Add bar
              </Button>
            </div>
          </div>
        </Group>

        <Group title="About paragraph" description="Shown beside the “Why work with me” heading." defaultOpen={false}>
          <div className="sm:col-span-2">
            <TextArea value={settings.about_intro} onChange={(e) => patch("about_intro", e.target.value)} />
          </div>
        </Group>

        <Group title="Section headings" description="Label, headline and intro for every section." defaultOpen={false}>
          {(Object.keys(sectionNames) as SectionKey[]).map((key) => {
            const copy = settings.sections[key];
            return (
              <div key={key} className="sm:col-span-2 rounded-xl border border-border p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                <p className="sm:col-span-2 text-xs uppercase tracking-[0.15em] text-accent-blue/90">{sectionNames[key]}</p>
                <F label="Small label">
                  <TextInput value={copy.eyebrow} onChange={(e) => patchSection(key, "eyebrow", e.target.value)} />
                </F>
                <F label="Headline" help="Enter = line break">
                  <TextArea rows={1} className="!min-h-[44px]" value={copy.title} onChange={(e) => patchSection(key, "title", e.target.value)} />
                </F>
                <F label="Highlighted words">
                  <TextInput value={copy.highlight} onChange={(e) => patchSection(key, "highlight", e.target.value)} />
                </F>
                <F label="Intro text">
                  <TextInput value={copy.description} onChange={(e) => patchSection(key, "description", e.target.value)} />
                </F>
              </div>
            );
          })}
        </Group>
      </div>

      {dirty && (
        <div className="sticky bottom-6 mt-6 flex justify-end">
          <div className="glass bg-dark-2/90 rounded-xl pl-4 pr-1.5 py-1.5 flex items-center gap-3">
            <span className="text-sm text-text-muted">Unsaved changes</span>
            <Button variant="primary" onClick={save} loading={saving}>Save</Button>
          </div>
        </div>
      )}
    </div>
  );
}
