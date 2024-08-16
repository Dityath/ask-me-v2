import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseCLient = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseCLient) {
  throw new Error('Supabase credentials are missing');
}

const supabase = createClient(supabaseUrl, supabaseCLient);

export default supabase;
