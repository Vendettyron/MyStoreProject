import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

const envFile =
	process.env.NODE_ENV === "production" ? ".env" : ".env.development";
config({ path: envFile });

// Configuración de Supabase
const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

// Cliente de Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
