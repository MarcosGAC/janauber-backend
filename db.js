import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://flrexkoorpxajykqiirg.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

export const db = createClient(supabaseUrl, supabaseKey);
