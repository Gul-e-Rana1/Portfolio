import { SUPABASE_KEY, SUPABASE_URL } from "./config";

// Minimal Supabase REST helpers for the public site (anonymous role only).
const headers = { apikey: SUPABASE_KEY };

export async function restSelect<T>(query: string): Promise<T[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${query}`, { headers });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
}

export function restInsert(table: string, row: Record<string, unknown>) {
  return fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify(row),
    keepalive: true,
  }).catch(() => {
    /* analytics must never break the page */
  });
}
