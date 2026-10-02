import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "./config";

// Full client — used by the admin panel only. The public site talks to the
// REST API directly (see rest.ts) so visitors don't download this library.
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export { STORAGE_BUCKET } from "./config";
