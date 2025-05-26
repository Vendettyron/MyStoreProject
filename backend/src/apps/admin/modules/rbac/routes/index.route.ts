import type { FastifyInstance } from "fastify";
import permissionRoutes from "./permission.route";
import moduleRoutes from "./module.route";
import roleRoutes from "./role.route";
import rolePermissionRoutes from "./rolePermission.route";
import customPermissionRoutes from "./customPermission.route";

export default async function rbacRoutes(app: FastifyInstance) {
	app.register(permissionRoutes, { prefix: "/permissions" });
	app.register(moduleRoutes, { prefix: "/modules" });
	app.register(roleRoutes, { prefix: "/roles" });
	app.register(rolePermissionRoutes, { prefix: "/role-permissions" });
	app.register(customPermissionRoutes, { prefix: "/custom-permissions" });
}
