import helmet from "@fastify/helmet";
import type { FastifyInstance } from "fastify";

export default async function setupHelmet(app: FastifyInstance) {
	await app.register(helmet);
}
