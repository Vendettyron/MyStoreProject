import type { FastifyInstance } from "fastify";
import rbacRoutes from "src/apps/admin/modules/rbac/routes/index.route";

export default async function adminRoutes(app: FastifyInstance) {
	app.register(rbacRoutes, { prefix: "/rbca" });
}
