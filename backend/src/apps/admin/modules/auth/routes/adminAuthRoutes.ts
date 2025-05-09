import type { FastifyInstance } from "fastify";
import { registerSchema } from "../schemas/schemas";
import { registerEmployee, login } from "../controllers/controllers";
import { successResponseSchema } from "src/shared/schemas/messageResponseSchema";
import { loginSchema } from "src/shared/schemas/loginShema";

export default async function adminAuthRoutes(app: FastifyInstance) {

	app.post("/register", {
		schema: {
			body: registerSchema,
			response: {
				201: successResponseSchema,
				500: successResponseSchema,
			},
		},
		handler: registerEmployee,
	});

	app.post("/login", {
		schema: {
			body: loginSchema,
		},
		handler: login,
	});


}
