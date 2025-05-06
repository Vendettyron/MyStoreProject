import * as dotenv from "dotenv";
dotenv.config();

export const env = {
	PORT: process.env.PORT || 3000,
	nodeEnv: process.env.NODE_ENV || "development",
	supbaseJwtSecret: process.env.SUPABASE_JWT_SECRET,
	supabaseUrl: process.env.SUPABASE_URL,
};
