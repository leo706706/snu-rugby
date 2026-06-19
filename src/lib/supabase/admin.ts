import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client for operations the cookie-bound server client can't do
 * (inviting/deleting auth users). Never expose this to the browser.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
