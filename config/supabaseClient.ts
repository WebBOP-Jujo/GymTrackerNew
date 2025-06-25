
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../constants';

if (!SUPABASE_URL || SUPABASE_URL === "YOUR_SUPABASE_URL") {
  console.warn("Supabase URL is not configured. Please set REACT_APP_SUPABASE_URL environment variable.");
}
if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === "YOUR_SUPABASE_ANON_KEY") {
  console.warn("Supabase Anon Key is not configured. Please set REACT_APP_SUPABASE_ANON_KEY environment variable.");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
