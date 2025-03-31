import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ogsdcngjzoihattsvykl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nc2Rjbmdqem9paGF0dHN2eWtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3ODk3MTIsImV4cCI6MjA1NzM2NTcxMn0.YuzyMInCuLjv9u0g4coRT3YRoxrsub-8XuWyaYHUwxQ";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
