import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { motion } from "motion/react";
import {
  Award, BarChart3, Briefcase, ExternalLink, FileText, GraduationCap, Layers, ListOrdered, LogOut,
  Sparkles, FolderKanban, Wrench, Lock,
} from "lucide-react";
import { supabase } from "../app/lib/supabase";
import { ADMIN_FLAG_KEY } from "../app/lib/analytics";
import { collections, type CollectionKey } from "./schemas";
import { CollectionEditor } from "./CollectionEditor";
import { SettingsEditor } from "./SettingsEditor";
import { Overview } from "./Overview";
import { Button, Spinner, TextInput, Label, Toaster } from "./ui";

type View = "overview" | "content" | CollectionKey;

const nav: { id: View; label: string; icon: typeof Layers }[] = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "content", label: "Site content", icon: FileText },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "experiences", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "stats", label: "Stats", icon: Layers },
  { id: "features", label: "Why work with me", icon: Sparkles },
  { id: "process", label: "Process", icon: ListOrdered },
];

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-dark text-fg font-sans">
      <div className="atmosphere" />
      <div className="relative z-10">{children}</div>
      <Toaster />
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (error) setError(error.message === "Invalid login credentials" ? "Incorrect email or password." : error.message);
  };

  return (
    <Shell>
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass rounded-3xl p-8 sm:p-10 w-full max-w-md"
        >
          <div className="w-12 h-12 rounded-2xl border border-border bg-gradient-to-br from-accent-silver/20 to-accent-blue/10 flex items-center justify-center mb-8">
            <Lock className="w-5 h-5 text-accent-silver" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Admin sign in</h1>
          <p className="text-sm text-text-muted mt-2 mb-8">Manage your portfolio content and view visitor stats.</p>

          <div className="space-y-4">
            <div>
              <Label>Email</Label>
              <TextInput type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label>Password</Label>
              <TextInput type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          {error && <p className="text-sm text-red-300 mt-4">{error}</p>}

          <Button type="submit" variant="primary" loading={loading} className="w-full mt-8 !py-3">
            Sign in
          </Button>
          <a href="/" className="block text-center text-xs text-text-muted hover:text-fg mt-6">← Back to website</a>
        </motion.form>
      </div>
    </Shell>
  );
}

function Message({ title, text, onSignOut }: { title: string; text: string; onSignOut: () => void }) {
  return (
    <Shell>
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="glass rounded-3xl p-10 max-w-md text-center">
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="text-sm text-text-muted mt-3 leading-relaxed">{text}</p>
          <Button className="mt-8" onClick={onSignOut}><LogOut className="w-4 h-4" /> Sign out</Button>
        </div>
      </div>
    </Shell>
  );
}

function readView(): View {
  const v = location.hash.slice(1) as View;
  return nav.some((n) => n.id === v) ? v : "overview";
}

function Dashboard({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const [view, setView] = useState<View>(readView);

  useEffect(() => {
    const onHash = () => setView(readView());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (v: View) => {
    location.hash = v;
    setView(v);
    window.scrollTo({ top: 0 });
  };

  return (
    <Shell>
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col border-r border-border bg-dark-2/60 backdrop-blur-xl p-5">
        <a href="/" className="flex items-center gap-3 px-2 mb-10">
          <img src="/logo.png" alt="" className="h-9 w-9 object-contain" />
          <div>
            <p className="font-heading font-semibold leading-none">Gul-e-Rana</p>
            <p className="text-[11px] text-text-muted mt-1">Admin panel</p>
          </div>
        </a>
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                view === n.id ? "bg-surface-hover text-fg border border-border" : "text-text-muted hover:text-fg hover:bg-surface border border-transparent"
              }`}
            >
              <n.icon className="w-4 h-4" />
              {n.label}
            </button>
          ))}
        </nav>
        <div className="pt-5 border-t border-border space-y-1">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-muted hover:text-fg hover:bg-surface">
            <ExternalLink className="w-4 h-4" /> View website
          </a>
          <button onClick={onSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-muted hover:text-fg hover:bg-surface">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
          <p className="px-3 pt-2 text-[11px] text-text-muted truncate">{email}</p>
        </div>
      </aside>

      {/* Top bar (mobile) */}
      <header className="lg:hidden sticky top-0 z-40 bg-dark/85 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="" className="h-8 w-8 object-contain" />
            <span className="font-heading font-semibold">Admin</span>
          </div>
          <div className="flex items-center gap-1">
            <a href="/" target="_blank" rel="noopener noreferrer" aria-label="View website" className="p-2 rounded-lg text-text-muted hover:text-fg"><ExternalLink className="w-4 h-4" /></a>
            <button onClick={onSignOut} aria-label="Sign out" className="p-2 rounded-lg text-text-muted hover:text-fg"><LogOut className="w-4 h-4" /></button>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto hide-scrollbar px-3 pb-3">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                view === n.id ? "bg-fg text-dark font-medium" : "text-text-muted border border-border"
              }`}
            >
              {n.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="lg:pl-64">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 lg:py-12">
          {view === "overview" && <Overview />}
          {view === "content" && <SettingsEditor />}
          {view !== "overview" && view !== "content" && <CollectionEditor collection={collections[view]} />}
        </div>
      </main>
    </Shell>
  );
}

export default function AdminApp() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [access, setAccess] = useState<"checking" | "ok" | "denied" | "setup">("checking");

  useEffect(() => {
    document.documentElement.classList.add("admin");
    document.title = "Admin · Gul-e-Rana";
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    setAccess("checking");
    supabase.rpc("is_admin").then(({ data, error }) => {
      if (error) return setAccess("setup");
      if (data === true) {
        // Stop counting this browser's visits in the analytics
        try { localStorage.setItem(ADMIN_FLAG_KEY, "1"); } catch { /* ignore */ }
        setAccess("ok");
      } else {
        setAccess("denied");
      }
    });
  }, [session?.user.id]);

  const signOut = () => supabase.auth.signOut();

  if (session === undefined || (session && access === "checking")) {
    return (
      <Shell>
        <div className="min-h-screen flex items-center justify-center"><Spinner className="w-6 h-6" /></div>
      </Shell>
    );
  }
  if (!session) return <Login />;
  if (access === "setup") {
    return (
      <Message
        title="Database setup needed"
        text="The admin tables weren't found. Open Supabase → SQL Editor, paste the contents of supabase/schema.sql and click Run, then reload this page."
        onSignOut={signOut}
      />
    );
  }
  if (access === "denied") {
    return (
      <Message
        title="No admin access"
        text={`${session.user.email} isn't on the admin list. Add it to the admin_users table in supabase/schema.sql and run it again.`}
        onSignOut={signOut}
      />
    );
  }
  return <Dashboard email={session.user.email ?? ""} onSignOut={signOut} />;
}
