import type { FastifyInstance } from "fastify";
import adminAuthRoutes from "src/apps/admin/modules/auth/routes";

export default async function v1Routes(app: FastifyInstance) {
	app.register(adminAuthRoutes, { prefix: "/auth" });
}
