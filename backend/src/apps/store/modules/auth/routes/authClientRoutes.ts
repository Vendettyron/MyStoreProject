import type { FastifyInstance } from "fastify";
import { registerClientSchema } from "../schemas/registerClientSchema";
import { basicResponseSchema } from "src/shared/schemas/messageResponseSchema";
import { registerClient } from "../controllers/controllers";

export default async function authClientRoutes(app: FastifyInstance) {
	app.get("/authClient", async (request, reply) => {
		return { message: "Hello from authClient!" };
	});

	app.post("/register", {
		schema: {
			body: registerClientSchema,
			response: {
				201: basicResponseSchema,
				500: basicResponseSchema,
			},
		},
		handler: registerClient,
	});
}
