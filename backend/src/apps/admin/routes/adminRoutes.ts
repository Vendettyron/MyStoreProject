import type { FastifyInstance } from "fastify";
import permissionRoutes from "src/apps/admin/modules/permissions/routes/permissionRoutes";

export default async function adminRoutes(app: FastifyInstance) {
	app.register(permissionRoutes, { prefix: "/permissions" });
}
