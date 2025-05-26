import type { FastifyInstance } from "fastify";
import { registroSchema } from "../../../shared/schemas/registroSchema";
import { basicResponseSchema } from "src/shared/schemas/messageResponseSchema";
import { registerEmployeeController } from "../controllers/authController";
import { loginSchema } from "../../../shared/schemas/loginSchema";
import { loginEmployeeController } from "../controllers/authController";

export default async function fabricaAuthRoutes(app: FastifyInstance) {
	app.post("/register", {
		schema: {
			body: registroSchema,
			response: {
				201: basicResponseSchema,
				500: basicResponseSchema,
			},
		},
		handler: registerEmployeeController,
	});

	app.post("/login", {
		schema: {
			body: loginSchema,
			response: {
				200: basicResponseSchema,
				500: basicResponseSchema,
			},
		},
		handler: loginEmployeeController,
	});
}
