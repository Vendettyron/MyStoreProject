import type { FastifyInstance } from "fastify";

export default async function customPermissionRoutes(app: FastifyInstance) {
	app.get("/", async (request, reply) => {
		return reply.status(200).send({ message: "Custom Permission list" });
	});
}
