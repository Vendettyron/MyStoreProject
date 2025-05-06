import type { FastifyInstance } from "fastify";

export default async function adminAuthRoutes(app: FastifyInstance) {
	app.get("/get", async (request, reply) => {
		return { message: "Auth route" };
	});
}
