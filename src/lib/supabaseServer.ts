import { createClient } from '@supabase/supabase-js';

// Ce client utilise la SERVICE_ROLE_KEY pour outrepasser RLS 
// ⚠️ NE JAMAIS UTILISER DANS UN CLIENT COMPONENT ('use client')
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ [SUPABASE-ADMIN] Missing server-side credentials. Check your Vercel Environment Variables.');
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseKey);
