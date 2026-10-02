import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUp, Eye, EyeOff, Pencil, Plus, Trash2, X } from "lucide-react";
import { supabase } from "../app/lib/supabase";
import { getIcon } from "../app/lib/icons";
import type { Collection } from "./schemas";
import { Button, Card, FieldInput, Label, PageHeader, Spinner, toast } from "./ui";

type Row = Record<string, unknown> & { id?: string; sort_order?: number; visible?: boolean };

export function CollectionEditor({ collection }: { collection: Collection }) {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Row | null>(null);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase.from(collection.table).select("*").order("sort_order").order("created_at");
    if (error) toast(`Couldn't load ${collection.label}: ${error.message}`, "error");
    setItems((data as Row[]) ?? []);
    setLoading(false);
  }, [collection]);

  useEffect(() => {
    setLoading(true);
    setDraft(null);
    load();
  }, [load]);

  const save = async () => {
    if (!draft) return;
    const missing = collection.fields.filter((f) => f.required && !String(draft[f.name] ?? "").trim());
    if (missing.length) {
      toast(`Please fill in: ${missing.map((f) => f.label).join(", ")}`, "error");
      return;
    }
    setSaving(true);
    const { id, created_at: _created, ...fields } = draft;
    const res = id
      ? await supabase.from(collection.table).update(fields).eq("id", id)
      : await supabase.from(collection.table).insert({
          ...fields,
          sort_order: items.reduce((m, r) => Math.max(m, Number(r.sort_order ?? 0)), -1) + 1,
        });
    setSaving(false);
    if (res.error) {
      toast(`Save failed: ${res.error.message}`, "error");
      return;
    }
    toast(id ? "Changes saved" : `New ${collection.singular} added`);
    setDraft(null);
    load();
  };

  const remove = async (row: Row) => {
    const name = String(row[collection.titleField] || collection.singular);
    if (!confirm(`Delete "${name}"? This can't be undone.`)) return;
    setBusyId(row.id!);
    const { error } = await supabase.from(collection.table).delete().eq("id", row.id!);
    setBusyId(null);
    if (error) return toast(`Delete failed: ${error.message}`, "error");
    toast("Deleted");
    load();
  };

  const toggleVisible = async (row: Row) => {
    setBusyId(row.id!);
    const { error } = await supabase.from(collection.table).update({ visible: !row.visible }).eq("id", row.id!);
    setBusyId(null);
    if (error) return toast(error.message, "error");
    toast(row.visible ? "Hidden from site" : "Visible on site");
    load();
  };

  const move = async (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
    // Persist the new order for every row whose position changed
    const updates = next
      .map((row, i) => ({ row, i }))
      .filter(({ row, i }) => row.sort_order !== i)
      .map(({ row, i }) => supabase.from(collection.table).update({ sort_order: i }).eq("id", row.id!));
    const results = await Promise.all(updates);
    const failed = results.find((r) => r.error);
    if (failed?.error) toast(`Reorder failed: ${failed.error.message}`, "error");
    load();
  };

  return (
    <div>
      <PageHeader
        title={collection.label}
        description={collection.description}
        actions={
          <Button variant="primary" onClick={() => setDraft({ ...collection.blank })}>
            <Plus className="w-4 h-4" /> Add {collection.singular}
          </Button>
        }
      />

      {loading ? (
        <div className="py-20 flex justify-center"><Spinner /></div>
      ) : items.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-text-muted">No {collection.label.toLowerCase()} yet.</p>
          <Button className="mt-5" onClick={() => setDraft({ ...collection.blank })}>
            <Plus className="w-4 h-4" /> Add the first {collection.singular}
          </Button>
        </Card>
      ) : (
        <div className="space-y-2.5">
          {items.map((row, i) => {
            const Icon = collection.iconField ? getIcon(row[collection.iconField] as string) : null;
            const img = collection.imageField ? (row[collection.imageField] as string) : "";
            return (
              <Card key={row.id} className={`p-3 sm:p-4 flex items-center gap-3 sm:gap-4 ${row.visible === false ? "opacity-55" : ""}`}>
                <div className="flex flex-col">
                  <button aria-label="Move up" disabled={i === 0} onClick={() => move(i, -1)} className="p-1 rounded text-text-muted hover:text-fg disabled:opacity-20">
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button aria-label="Move down" disabled={i === items.length - 1} onClick={() => move(i, 1)} className="p-1 rounded text-text-muted hover:text-fg disabled:opacity-20">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {collection.imageField && (
                  <div className="w-16 h-11 sm:w-20 sm:h-12 rounded-lg border border-border bg-dark/60 overflow-hidden shrink-0">
                    {img && <img src={img} alt="" className="w-full h-full object-cover" />}
                  </div>
                )}
                {Icon && (
                  <div className="w-10 h-10 rounded-lg border border-border bg-surface flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-accent-silver" />
                  </div>
                )}

                <button className="flex-1 min-w-0 text-left" onClick={() => setDraft({ ...row })}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium truncate">{String(row[collection.titleField] || "Untitled")}</span>
                    {collection.badges?.filter((b) => row[b.field]).map((b) => (
                      <span key={b.field} className="pill !py-0.5 text-[10px]">{b.label}</span>
                    ))}
                    {row.visible === false && <span className="pill !py-0.5 text-[10px]">Hidden</span>}
                  </div>
                  {collection.subtitleField && (
                    <p className="text-xs text-text-muted truncate mt-0.5">{String(row[collection.subtitleField] ?? "")}</p>
                  )}
                </button>

                <div className="flex items-center gap-0.5 shrink-0">
                  {busyId === row.id ? (
                    <Spinner className="w-4 h-4 mx-2" />
                  ) : (
                    <>
                      <button aria-label={row.visible === false ? "Show on site" : "Hide from site"} title={row.visible === false ? "Show on site" : "Hide from site"} onClick={() => toggleVisible(row)} className="p-2 rounded-lg text-text-muted hover:text-fg hover:bg-surface">
                        {row.visible === false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button aria-label="Edit" title="Edit" onClick={() => setDraft({ ...row })} className="p-2 rounded-lg text-text-muted hover:text-fg hover:bg-surface">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button aria-label="Delete" title="Delete" onClick={() => remove(row)} className="p-2 rounded-lg text-text-muted hover:text-red-300 hover:bg-red-400/5">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* ── Edit drawer ─────────────────────────────── */}
      <AnimatePresence>
        {draft && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !saving && setDraft(null)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xl bg-dark-2 border-l border-border flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                <h2 className="text-lg font-semibold">
                  {draft.id ? `Edit ${collection.singular}` : `New ${collection.singular}`}
                </h2>
                <button aria-label="Close" onClick={() => setDraft(null)} className="p-2 rounded-lg text-text-muted hover:text-fg hover:bg-surface">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                className="flex-1 overflow-y-auto px-6 py-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  save();
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
                  {collection.fields.map((f) => (
                    <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
                      {f.type !== "boolean" && (
                        <Label help={f.help}>
                          {f.label}
                          {f.required && <span className="text-accent-blue"> *</span>}
                        </Label>
                      )}
                      <FieldInput field={f} value={draft[f.name]} onChange={(v) => setDraft((d) => ({ ...d!, [f.name]: v }))} />
                      {f.type === "boolean" && f.help && <p className="text-[11px] text-text-muted">{f.help}</p>}
                    </div>
                  ))}
                  <div className="sm:col-span-2 pt-2 border-t border-border">
                    <FieldInput
                      field={{ name: "visible", label: "Visible on the website", type: "boolean" }}
                      value={draft.visible !== false}
                      onChange={(v) => setDraft((d) => ({ ...d!, visible: v as boolean }))}
                    />
                  </div>
                </div>
                <button type="submit" hidden />
              </form>

              <div className="px-6 py-4 border-t border-border flex justify-end gap-2">
                <Button variant="subtle" onClick={() => setDraft(null)} disabled={saving}>Cancel</Button>
                <Button variant="primary" onClick={save} loading={saving}>
                  {draft.id ? "Save changes" : `Add ${collection.singular}`}
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
