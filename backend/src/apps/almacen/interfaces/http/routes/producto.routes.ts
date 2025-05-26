import type { FastifyInstance } from "fastify";
import { productoSchema } from "../../../shared/schemas/producto.schema";
import { basicResponseSchema } from "src/shared/schemas/messageResponseSchema";
import { createProductoController } from "../controllers/proucto.controller";

export default async function productoRoutes(app: FastifyInstance) {
	app.post("/producto", {
		schema: {
			body: productoSchema,
			response: {
				201: basicResponseSchema,
				500: basicResponseSchema,
			},
		},
		handler: createProductoController,
	});
}
