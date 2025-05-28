/*
import { permisoMiddleware } from 'src/apps/almacen/infrastructure/middlewares/permissionMiddlware';
import { permiso } from 'src/apps/almacen/shared/diccionario/permisosDiccionario';
import { rol } from 'src/apps/almacen/shared/diccionario/rolDiccionario';
import { productoSchema } from 'src/apps/almacen/shared/schemas/producto.schema';
import { authMiddleware } from 'src/shared/middlewares/authMiddleware';
import { roleMiddleware } from 'src/shared/middlewares/roleMiddleware';
import { basicResponseSchema } from 'src/shared/schemas/messageResponseSchema';
import { FastifyInstance } from 'fastify';
import { createProductoController } from '../controllers/proucto.controller';

import { crearMateriaPrima } from '../controllers/materiaPrima.controller';

export default async function materiaPrimaRoutes(app: FastifyInstance) {
    app.post("/crear-materia-prima", {
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

}
    */