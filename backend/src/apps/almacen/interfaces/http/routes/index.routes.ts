import type { FastifyInstance } from "fastify";
import fabricaAuthRoutes from "./authRoutes";
import productoRoutes from "./producto.routes";
import materiaPrimaRoutes from "./materiaPrima.routes";
import ordenesProduccionRoutes from "./ordenesPruduccion.routes";

export default async function fabricaRoutes(app: FastifyInstance) {
	app.register(fabricaAuthRoutes, { prefix: "/auth" });
	app.register(productoRoutes, { prefix: "/producto" });
	app.register(materiaPrimaRoutes, { prefix: "/materia-prima" });
	app.register(ordenesProduccionRoutes, { prefix: "/ordenes-produccion" });
}
