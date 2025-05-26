import type { FastifyInstance } from "fastify";
import { productoSchema } from "../../../shared/schemas/producto.schema";
import { basicResponseSchema } from "src/shared/schemas/messageResponseSchema";
import { obtenerProductosSchema } from "src/apps/almacen/shared/schemas/productos/obtenerProductos.schema";
import {
	createProductoController,
	obtenerProductosController,
} from "../controllers/proucto.controller";

export default async function productoRoutes(app: FastifyInstance) {
	app.post("/crear-producto", {
		schema: {
			body: productoSchema,
			response: {
				201: basicResponseSchema,
				500: basicResponseSchema,
			},
		},
		handler: createProductoController,
	});

	app.get("/all", {
		schema: {
			response: {
				200: obtenerProductosSchema,
				500: basicResponseSchema,
			},
		},
		handler: obtenerProductosController,
	});

	app.get("/:id", async (request, reply) => {
		return reply.status(200).send({ message: "Test endpoint is working!" });
	});

	app.put("/modificar", async (request, reply) => {
		return reply.status(200).send({ message: "Update endpoint is working!" });
	});
}
