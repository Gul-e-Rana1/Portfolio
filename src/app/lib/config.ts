// The publishable key is designed to be public — row-level security in
// supabase/schema.sql is what protects the data. Env vars override these if set.
export const SUPABASE_URL: string =
  import.meta.env.VITE_SUPABASE_URL ?? "https://pzebkjbkjoucrqjblmlc.supabase.co";
export const SUPABASE_KEY: string =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_xNhgKK5KCaBwTtxZrvjwfg_f4U96BzT";

export const STORAGE_BUCKET = "portfolio";
