import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

const envFile =
	process.env.NODE_ENV === "production" ? ".env" : ".env.development";
config({ path: envFile });

// Configuración de Supabase
const SUPABASE_URL2 = process.env.SUPABASE_URL2 as string;
const SUPABASE_KEY2 = process.env.SUPABASE_KEY2 as string;

// Cliente de Supabase
const supabaseConnection = createClient(SUPABASE_URL2, SUPABASE_KEY2);

export default supabaseConnection;
