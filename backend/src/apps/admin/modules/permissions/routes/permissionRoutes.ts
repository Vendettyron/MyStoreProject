import type { FastifyInstance } from "fastify";
import { Role } from "src/shared/dictionaries/simpleRoleDictionary";
import { roleMiddleware } from "src/shared/middlewares/roleMiddleware";

export default async function permissionRoutes(app: FastifyInstance) {
	app.get("/", {
		preHandler: roleMiddleware(Role.ADMIN),
		handler: (request, reply) => {
			return reply.status(200).send({ request: request.user });
		},
	});

	app.post("/permissions", async (request, reply) => {
		return reply.status(201).send({ message: "Permission created" });
	});

	app.put("/permissions/:id", async (request, reply) => {
		return reply.status(200).send({ message: "Permission updated" });
	});

	app.delete("/permissions/:id", async (request, reply) => {
		return reply.status(200).send({ message: "Permission deleted" });
	});
}
