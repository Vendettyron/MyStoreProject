import type { FastifyInstance } from "fastify";
import adminAuthRoutes from "src/apps/admin/modules/auth/routes/adminAuthRoutes";
import clientAuthRoutes from "src/apps/store/modules/auth/routes/authClientRoutes";

export default async function v1Routes(app: FastifyInstance) {
	app.register(adminAuthRoutes, { prefix: "/authAdmin" });
	app.register(clientAuthRoutes, { prefix: "/authClient" });
}
