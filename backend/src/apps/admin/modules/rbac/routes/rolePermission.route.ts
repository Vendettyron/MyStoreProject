import type { FastifyInstance } from "fastify";

export default async function rolePermissionRoutes(app: FastifyInstance) {
	app.get("/", async (request, reply) => {
		return reply.status(200).send({ message: "Role Permission list" });
	});
}
