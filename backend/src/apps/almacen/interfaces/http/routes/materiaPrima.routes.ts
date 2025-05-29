import { permisoMiddleware } from "src/apps/almacen/infrastructure/middlewares/permissionMiddlware";
import { permiso } from "src/apps/almacen/shared/diccionario/permisosDiccionario";
import { rol } from "src/apps/almacen/shared/diccionario/rolDiccionario";
import { productoSchema } from "src/apps/almacen/shared/schemas/productos/producto.schema";
import { authMiddleware } from "src/shared/middlewares/authMiddleware";
import { roleMiddleware } from "src/shared/middlewares/roleMiddleware";
import { basicResponseSchema } from "src/shared/schemas/messageResponseSchema";
import type { FastifyInstance } from "fastify";
import { createProductoController } from "../controllers/proucto.controller";
import { createMateriaPrimaController, modificarMateriaPrimaController, obtenerMateriasPrimasController } from "../controllers/materiaPrima.controller";
import { MateriaPrimaSchema } from "src/apps/almacen/shared/schemas/esquemas_MateriaPrima/materiaPrima.schema";
import { obtenerMateriasPrimasSchema } from "src/apps/almacen/shared/schemas/esquemas_MateriaPrima/obtenerMateriasPrimas.schema";
import { ModificarMateriaPrimaSchema } from "src/apps/almacen/shared/schemas/esquemas_MateriaPrima/modificarMateriaPrima.schema";

export default async function materiaPrimaRoutes(app: FastifyInstance) {
	app.post("/crear-materia-prima", {
		schema: {
			body: MateriaPrimaSchema,
			response: {
				201: basicResponseSchema,
				500: basicResponseSchema,
			},
		},
		preHandler: [
			authMiddleware(),
			roleMiddleware(rol.ADMIN),
			permisoMiddleware(permiso.CREAR_PRODUCTO), // CAMBIAR A PERMISO CORRESPONDIENTE
			// permisoMiddleware(permiso.CREAR_MATERIA_PRIMA), // DESCOMENTAR SI SE CREA UN NUEVO PERMISO
		],
		handler: createMateriaPrimaController,
	});

	app.get("/all", {
		schema: {
			response: {
				200: obtenerMateriasPrimasSchema,
				500: basicResponseSchema,
			},
		},
		preHandler: [
			authMiddleware(),
			roleMiddleware(rol.ADMIN),
			permisoMiddleware(permiso.VER_PRODUCTO), // CAMBIAR A PERMISO CORRESPONDIENTE
			// permisoMiddleware(permiso.VER_MATERIA_PRIMA), // DESCOMENTAR SI SE CREA UN NUEVO PERMISO
		],
		handler: obtenerMateriasPrimasController, // DEBE SER EL CONTROLADOR CORRESPONDIENTE
	});

	app.put("/modificar-materia-prima", {
		schema: {
			body: ModificarMateriaPrimaSchema,
			response: {
				200: basicResponseSchema,
				500: basicResponseSchema,
			},
		},
		preHandler: [
			authMiddleware(),
			roleMiddleware(rol.ADMIN),
			permisoMiddleware(permiso.CREAR_MATERIA_PRIMA), // CAMBIAR A PERMISO CORRESPONDIENTE
			// permisoMiddleware(permiso.MODIFICAR_MATERIA_PRIMA), // DESCOMENTAR SI SE CREA UN NUEVO PERMISO
		],
		handler: modificarMateriaPrimaController
	});

}
