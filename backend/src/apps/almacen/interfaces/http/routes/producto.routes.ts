// Importación de tipos y esquemas de validación para las rutas HTTP
import type { FastifyInstance } from "fastify";
import { productoSchema } from "../../../shared/schemas/productos/producto.schema";
import { productoModificarSchema } from "src/apps/almacen/shared/schemas/productos/crearProducto.schema";
import { basicResponseSchema } from "src/shared/schemas/messageResponseSchema";
import { obtenerProductosSchema } from "src/apps/almacen/shared/schemas/productos/obtenerProductos.schema";
import { authMiddleware } from "src/apps/almacen/infrastructure/middlewares/authMiddleware";
import { roleMiddleware } from "src/apps/almacen/infrastructure/middlewares/roleMiddleware";
import { permisoMiddleware } from "src/apps/almacen/infrastructure/middlewares/permissionMiddlware";
import { rol } from "src/apps/almacen/shared/diccionario/rolDiccionario";
import { permiso } from "src/apps/almacen/shared/diccionario/permisosDiccionario";
import { nombreSchema } from "src/apps/almacen/shared/schemas/nombre.schema";

// Importación de los controladores (adaptadores de entrada) que conectan las rutas HTTP con los casos de uso del dominio
import {
    createProductoController,
    obtenerProductosController,
    obtenerProductoPorNombreController,
    modificarProductoController,
} from "../controllers/proucto.controller";

/**
 * Definición de las rutas relacionadas con productos.
 * Esta función actúa como adaptador primario (entrada) en la Clean Architecture,
 * conectando el framework web (Fastify) con los controladores de la aplicación.
 */
export default async function productoRoutes(app: FastifyInstance) {
    // Ruta para crear un producto
    app.post("/crear-producto", {
        // Validación de la petición y respuesta usando esquemas (capa de validación)
        schema: {
            body: productoSchema,
            response: {
                201: basicResponseSchema,
                500: basicResponseSchema,
            },
        },
        // Middlewares de autenticación, autorización por rol y permisos (capa de infraestructura)
        preHandler: [
            authMiddleware(),
            roleMiddleware(rol.ADMIN),
            permisoMiddleware(permiso.CREAR_PRODUCTO),
        ],
        // Controlador que maneja la lógica de la petición (adaptador de entrada)
        handler: createProductoController,
    });

    // Ruta para obtener todos los productos
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

    // Ruta para buscar un producto por nombre
    app.get("/buscar-por-nombre/:nombre_producto", {
        schema: {
            params: nombreSchema,
            response: {
                200: productoSchema,
                404: basicResponseSchema,
                500: basicResponseSchema,
            },
        },
        preHandler: [
            authMiddleware(),
            roleMiddleware(rol.ADMIN),
            permisoMiddleware(permiso.VER_PRODUCTO),
        ],
        handler: obtenerProductoPorNombreController,
    });

    // Ruta para modificar un producto existente
    app.put("/modificar-producto", {
        schema: {
            body: productoModificarSchema,
            response: {
                200: basicResponseSchema,
                404: basicResponseSchema,
                500: basicResponseSchema,
            },
        },
        preHandler: [
            authMiddleware(),
            roleMiddleware(rol.ADMIN),
            permisoMiddleware(permiso.MODIFICAR_PRODUCTO),
        ],
        handler: modificarProductoController,
    });
}

/*
 * Estructura Clean Architecture aplicada:
 * - Interfaces/HTTP/Routes: Adaptador primario, define las rutas y conecta con los controladores.
 * - Controllers: Adaptadores de entrada, reciben la petición y llaman a los casos de uso.
 * - Use Cases: Lógica de aplicación, orquesta la interacción entre entidades y repositorios.
 * - Domain: Entidades y lógica de negocio central.
 * - Infrastructure: Implementaciones concretas (repositorios, middlewares, etc).
 */
