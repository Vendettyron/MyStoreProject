import cors from "@fastify/cors";
import * as dotenv from "dotenv";
import type { FastifyInstance } from "fastify";
dotenv.config();

export default async function corsConfig(fastify: FastifyInstance) {
	fastify.register(cors, {
		origin: (origin, cb) => {
			if (!origin || origin === process.env.CORS_ORIGIN) {
				cb(null, true);
			} else {
				cb(new Error("Not allowed"), false);
			}
		},
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: process.env.CORS_CREDENTIALS === "true",
	});
}
