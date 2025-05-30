// Importación del tipo principal de Fastify para definir el servidor
import type { FastifyInstance } from "fastify";

// Importación de los módulos de rutas de cada contexto de la aplicación
import fabricaAuthRoutes from "./authRoutes";
import productoRoutes from "./producto.routes";
import materiaPrimaRoutes from "./materiaPrima.routes";
import ordenesProduccionRoutes from "./ordenesPruduccion.routes";

/**
 * Función principal para registrar todas las rutas del microservicio de almacén.
 * Cada grupo de rutas representa un contexto o módulo funcional de la aplicación.
 * 
 * Esta función actúa como adaptador primario (entrada) en la Clean Architecture,
 * conectando el framework web (Fastify) con los controladores de cada módulo.
 */
export default async function fabricaRoutes(app: FastifyInstance) {
    // Registro de rutas de autenticación bajo el prefijo /auth
    app.register(fabricaAuthRoutes, { prefix: "/auth" });

    // Registro de rutas de productos bajo el prefijo /producto
    app.register(productoRoutes, { prefix: "/producto" });

    // Registro de rutas de materia prima bajo el prefijo /materia-prima
    app.register(materiaPrimaRoutes, { prefix: "/materia-prima" });

    // Registro de rutas de órdenes de producción bajo el prefijo /ordenes-produccion
    app.register(ordenesProduccionRoutes, { prefix: "/ordenes-produccion" });
}

/*
 * Clean Architecture aplicada:
 * - Este archivo representa la capa de Interfaces/HTTP/Routes (adaptador primario).
 * - Se encarga de agrupar y registrar los distintos módulos de rutas de la aplicación.
 * - Cada módulo de rutas conecta con sus respectivos controladores y casos de uso.
 */
