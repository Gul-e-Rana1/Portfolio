import { useEffect, useRef, useState, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, ChevronDown, ImagePlus, Loader2, Upload, X, XCircle } from "lucide-react";
import { supabase, STORAGE_BUCKET } from "../app/lib/supabase";
import { getIcon, iconNames } from "../app/lib/icons";
import type { Field } from "./schemas";

/* ── Toasts ─────────────────────────────────────────────────────── */

type ToastMsg = { id: number; text: string; kind: "success" | "error" };

export function toast(text: string, kind: ToastMsg["kind"] = "success") {
  window.dispatchEvent(new CustomEvent("admin-toast", { detail: { text, kind } }));
}

export function Toaster() {
  const [items, setItems] = useState<ToastMsg[]>([]);
  useEffect(() => {
    const onToast = (e: Event) => {
      const { text, kind } = (e as CustomEvent).detail;
      const id = Date.now() + Math.random();
      setItems((prev) => [...prev, { id, text, kind }]);
      setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), kind === "error" ? 6000 : 3000);
    };
    window.addEventListener("admin-toast", onToast);
    return () => window.removeEventListener("admin-toast", onToast);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {items.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6 }}
            className="glass rounded-xl px-4 py-3 flex items-start gap-3 text-sm bg-dark-2/90"
          >
            {t.kind === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-accent-teal shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-4 h-4 text-red-300 shrink-0 mt-0.5" />
            )}
            <span>{t.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ── Layout pieces ──────────────────────────────────────────────── */

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`glass rounded-2xl ${className}`}>{children}</div>;
}

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="text-sm text-text-muted mt-2 max-w-xl">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

export function Spinner({ className = "w-5 h-5" }: { className?: string }) {
  return <Loader2 className={`animate-spin text-accent-silver ${className}`} />;
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger" | "subtle";
  loading?: boolean;
};

export function Button({ variant = "ghost", loading, children, className = "", disabled, ...rest }: BtnProps) {
  const styles = {
    primary: "text-dark font-semibold bg-gradient-to-b from-white to-[#d6deec] shadow-[0_0_0_1px_rgba(255,255,255,0.3),0_8px_24px_-12px_rgba(122,162,255,0.6)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.5),0_10px_30px_-10px_rgba(122,162,255,0.8)]",
    ghost: "border border-border bg-surface hover:bg-surface-hover hover:border-accent-blue/30 text-fg",
    danger: "border border-red-400/20 bg-red-400/5 text-red-200 hover:bg-red-400/10 hover:border-red-400/40",
    subtle: "text-text-muted hover:text-fg hover:bg-surface",
  }[variant];
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all duration-300 disabled:opacity-50 ${styles} ${className}`}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-dark/60 px-3.5 py-2.5 text-sm text-fg placeholder:text-text-muted/50 outline-none transition-colors focus:border-accent-blue/50 focus:bg-dark/80";

export function Label({ children, help }: { children: ReactNode; help?: string }) {
  return (
    <div className="mb-1.5">
      <span className="text-xs font-medium text-fg/80">{children}</span>
      {help && <p className="text-[11px] text-text-muted mt-0.5">{help}</p>}
    </div>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputCls} ${props.className ?? ""}`} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={4} {...props} className={`${inputCls} resize-y min-h-[96px] leading-relaxed ${props.className ?? ""}`} />;
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 py-2 select-none">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-6 rounded-full border transition-colors duration-300 shrink-0 ${
          checked ? "bg-accent-blue/40 border-accent-blue/60" : "bg-surface border-border"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-[18px] h-[18px] rounded-full transition-transform duration-300 ${
            checked ? "translate-x-4 bg-white" : "bg-accent-silver/60"
          }`}
        />
      </button>
      <span className="text-sm text-fg/85">{label}</span>
    </label>
  );
}

export function TagsInput({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [draft, setDraft] = useState("");
  const add = (raw: string) => {
    const parts = raw.split(",").map((p) => p.trim()).filter(Boolean);
    if (!parts.length) return;
    onChange([...value, ...parts.filter((p) => !value.includes(p))]);
    setDraft("");
  };
  return (
    <div className={`${inputCls} flex flex-wrap gap-1.5 items-center py-2`}>
      {value.map((tag, i) => (
        <span key={tag + i} className="inline-flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-lg bg-accent-blue/10 border border-accent-blue/20 text-xs">
          {tag}
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            onClick={() => onChange(value.filter((_, j) => j !== i))}
            className="p-0.5 rounded hover:bg-white/10"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add(draft);
          } else if (e.key === "Backspace" && !draft && value.length) {
            onChange(value.slice(0, -1));
          }
        }}
        onBlur={() => add(draft)}
        placeholder={value.length ? "" : placeholder}
        className="flex-1 min-w-[120px] bg-transparent outline-none text-sm placeholder:text-text-muted/50 py-0.5"
      />
    </div>
  );
}

export function IconPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const Current = getIcon(value);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(!open)} className={`${inputCls} flex items-center gap-2.5 text-left`}>
        <Current className="w-4 h-4 text-accent-silver" />
        <span className="flex-1">{value || "Choose icon"}</span>
        <ChevronDown className="w-4 h-4 text-text-muted" />
      </button>
      {open && (
        <div className="absolute z-20 mt-2 w-full glass bg-dark-2/95 rounded-xl p-2 grid grid-cols-6 gap-1 max-h-60 overflow-y-auto">
          {iconNames.map((name) => {
            const Icon = getIcon(name);
            return (
              <button
                key={name}
                type="button"
                title={name}
                onClick={() => {
                  onChange(name);
                  setOpen(false);
                }}
                className={`aspect-square rounded-lg flex items-center justify-center transition-colors ${
                  name === value ? "bg-accent-blue/20 border border-accent-blue/40" : "hover:bg-surface-hover"
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── Uploads ────────────────────────────────────────────────────── */

export async function uploadFile(file: File, folder: string): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const base =
    file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "file";
  const path = `${folder}/${Date.now()}-${base}.${ext}`;
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, { cacheControl: "31536000", upsert: false, contentType: file.type || undefined });
  if (error) throw error;
  return supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

export function FileUploadInput({
  value,
  onChange,
  accept,
  folder,
  maxMb,
  preview,
}: {
  value: string;
  onChange: (v: string) => void;
  accept: string;
  folder: string;
  maxMb: number;
  preview?: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const onFile = async (file?: File) => {
    if (!file) return;
    if (file.size > maxMb * 1024 * 1024) {
      toast(`File is too large — max ${maxMb} MB.`, "error");
      return;
    }
    setUploading(true);
    try {
      onChange(await uploadFile(file, folder));
      toast("Uploaded");
    } catch (err) {
      toast(`Upload failed: ${(err as Error).message}`, "error");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2.5">
      {preview && (
        <div className="relative aspect-[16/9] max-w-sm rounded-xl border border-border bg-dark/60 overflow-hidden flex items-center justify-center">
          {value ? (
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <ImagePlus className="w-6 h-6 text-text-muted" />
          )}
        </div>
      )}
      <div className="flex gap-2">
        <TextInput value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://… or upload" />
        <input ref={fileRef} type="file" accept={accept} hidden onChange={(e) => onFile(e.target.files?.[0])} />
        <Button type="button" onClick={() => fileRef.current?.click()} loading={uploading} className="shrink-0">
          {!uploading && <Upload className="w-4 h-4" />}
          Upload
        </Button>
      </div>
    </div>
  );
}

/* ── Schema-driven field ────────────────────────────────────────── */

export function FieldInput({ field, value, onChange }: { field: Field; value: unknown; onChange: (v: unknown) => void }) {
  switch (field.type) {
    case "textarea":
      return <TextArea value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />;
    case "tags":
      return <TagsInput value={(value as string[]) ?? []} onChange={onChange} placeholder={field.placeholder} />;
    case "boolean":
      return <Toggle checked={!!value} onChange={onChange} label={field.label} />;
    case "icon":
      return <IconPicker value={(value as string) ?? ""} onChange={onChange} />;
    case "image":
      return <FileUploadInput value={(value as string) ?? ""} onChange={onChange} accept="image/*" folder="images" maxMb={5} preview />;
    case "number":
      return <TextInput type="number" value={(value as number) ?? 0} onChange={(e) => onChange(Number(e.target.value))} />;
    default:
      return (
        <TextInput
          type={field.type === "url" ? "url" : "text"}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
        />
      );
  }
}
