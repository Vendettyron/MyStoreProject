import type { FastifyInstance } from "fastify";
import { planificarProducionSchema } from "src/apps/almacen/shared/schemas/ordenProduccion/planificarProduccion.schema";
import { basicResponseSchema } from "src/shared/schemas/messageResponseSchema";
import { rol } from "src/apps/almacen/shared/diccionario/rolDiccionario";
import { permiso } from "src/apps/almacen/shared/diccionario/permisosDiccionario";
import { authMiddleware } from "src/apps/almacen/infrastructure/middlewares/authMiddleware";
import { roleMiddleware } from "src/apps/almacen/infrastructure/middlewares/roleMiddleware";
import { permisoMiddleware } from "src/apps/almacen/infrastructure/middlewares/permissionMiddlware";

export default async function ordenesProduccionRoutes(app: FastifyInstance) {
	app.post("/planificar-orden-produccion", {
		schema: {
			body: planificarProducionSchema,
			response: {
				201: basicResponseSchema,
				500: basicResponseSchema,
			},
		},
		preHandler: [
			authMiddleware(),
			roleMiddleware(rol.ADMIN),
			permisoMiddleware(permiso.PLANIFICAR_ORDEN_PRODUCCION),
		],
		handler: 
	});
}
