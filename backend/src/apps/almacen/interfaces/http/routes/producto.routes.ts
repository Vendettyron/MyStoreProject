import type { FastifyInstance } from "fastify";
import { productoSchema } from "../../../shared/schemas/producto.schema";
import { basicResponseSchema } from "src/shared/schemas/messageResponseSchema";
import { obtenerProductosSchema } from "src/apps/almacen/shared/schemas/productos/obtenerProductos.schema";
import { authMiddleware } from "src/apps/almacen/infrastructure/middlewares/authMiddleware";
import { roleMiddleware } from "src/apps/almacen/infrastructure/middlewares/roleMiddleware";
import { permisoMiddleware } from "src/apps/almacen/infrastructure/middlewares/permissionMiddlware";
import { rol } from "src/apps/almacen/shared/diccionario/rolDiccionario";
import { permiso } from "src/apps/almacen/shared/diccionario/permisosDiccionario";

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
		preHandler: [
			authMiddleware(),
			roleMiddleware(rol.ADMIN),
			permisoMiddleware(permiso.CREAR_PRODUCTO),
		],
		handler: createProductoController,
	});

	app.get("/all", {
		schema: {
			response: {
				200: obtenerProductosSchema,
				500: basicResponseSchema,
			},
		},
		preHandler: [
			authMiddleware(),
			roleMiddleware(rol.ADMIN),
			permisoMiddleware(permiso.VER_PRODUCTO),
		],
		handler: obtenerProductosController,
	});

	app.get("/:id", async (request, reply) => {
		return reply.status(200).send({ message: "Test endpoint is working!" });
	});

	app.put("/modificar", async (request, reply) => {
		return reply.status(200).send({ message: "Update endpoint is working!" });
	});
}
