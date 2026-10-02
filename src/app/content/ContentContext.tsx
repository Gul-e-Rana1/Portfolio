import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { restSelect } from "../lib/rest";
import { defaultContent } from "../data/defaults";
import { contentTables, type Content, type Settings } from "../data/types";

const CACHE_KEY = "pf_content_v1";
// First-time visitors wait at most this long for live content before defaults show.
const FIRST_LOAD_TIMEOUT = 1500;

type Ctx = { content: Content; ready: boolean };
const ContentContext = createContext<Ctx>({ content: defaultContent, ready: true });

function readCache(): Content | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as Content;
    return { ...defaultContent, ...cached, settings: mergeSettings(cached.settings) };
  } catch {
    return null;
  }
}

function clearCache() {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {
    /* ignore */
  }
}

function writeCache(content: Content) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(content));
  } catch {
    /* storage full or blocked — not critical */
  }
}

// Fill any settings keys missing from the database with defaults (e.g. fields added later).
export function mergeSettings(data: Partial<Settings> | null | undefined): Settings {
  const d = defaultContent.settings;
  if (!data) return d;
  return {
    ...d,
    ...data,
    hero: { ...d.hero, ...data.hero },
    contact: { ...d.contact, ...data.contact },
    dashboard: { ...d.dashboard, ...data.dashboard },
    sections: Object.fromEntries(
      Object.entries(d.sections).map(([k, v]) => [k, { ...v, ...data.sections?.[k as keyof Settings["sections"]] }]),
    ) as Settings["sections"],
  };
}

export async function fetchContent(): Promise<Content | null> {
  const keys = Object.keys(contentTables) as (keyof typeof contentTables)[];
  const [settingsRows, ...lists] = await Promise.all([
    restSelect<{ data: Partial<Settings> }>("site_settings?select=data&id=eq.1"),
    ...keys.map((k) => restSelect<{ visible?: boolean }>(`${contentTables[k]}?select=*&visible=eq.true&order=sort_order.asc,created_at.asc`)),
  ]);
  // No settings row yet → database hasn't been filled; keep using the built-in content.
  if (!settingsRows.length) return null;

  const content = { settings: mergeSettings(settingsRows[0].data) } as Content;
  keys.forEach((k, i) => {
    (content as Record<string, unknown>)[k] = lists[i];
  });
  return content;
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [cached] = useState(readCache);
  const [content, setContent] = useState<Content>(cached ?? defaultContent);
  const [ready, setReady] = useState(!!cached);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => setReady(true), FIRST_LOAD_TIMEOUT);

    fetchContent()
      .then((live) => {
        if (cancelled) return;
        const next = live ?? defaultContent;
        setContent(next);
        if (live) writeCache(live);
        else clearCache();
      })
      .catch((err) => console.warn("Using built-in content:", err?.message ?? err))
      .finally(() => {
        if (cancelled) return;
        clearTimeout(timer);
        setReady(true);
      });

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return <ContentContext.Provider value={{ content, ready }}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext).content;
}

export function useContentReady() {
  return useContext(ContentContext).ready;
}
