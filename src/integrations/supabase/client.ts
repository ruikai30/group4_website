// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hfodtsmwaswvslkhjawp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmb2R0c213YXN3dnNsa2hqYXdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5OTg4MTEsImV4cCI6MjA2MzU3NDgxMX0.EFsAKCO2ZYOEfEn-8ZsSZ3_E63sVzRhT9vKvkZZm8Gw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);