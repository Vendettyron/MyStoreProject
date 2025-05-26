import type { FastifyInstance } from "fastify";
import fabricaAuthRoutes from "./authRoutes";
import productoRoutes from "./producto.routes";

export default async function fabricaRoutes(app: FastifyInstance) {
	app.register(fabricaAuthRoutes, { prefix: "/auth" });
	app.register(productoRoutes, { prefix: "/producto" });
}
