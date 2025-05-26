import type { FastifyInstance } from "fastify";
import { role } from "src/shared/dictionaries/roles&permissionsDictionary";
import { roleMiddleware } from "src/shared/middlewares/roleMiddleware";
import { permissionMiddleware } from "src/shared/middlewares/permissionMiddlware";
import { authMiddleware } from "src/shared/middlewares/authMiddleware";
import { permission } from "src/shared/dictionaries/roles&permissionsDictionary";
import {
	getPermissions,
	getPermissionById,
	createPermission,
} from "../controllers/permission.controller";
import { getPermissionByIdSchema } from "../schemas/getPermissionByID.schema";
import { getPermissionsSchema } from "../schemas/getPermissions.schema";
import { basicResponseSchema } from "src/shared/schemas/messageResponseSchema";
import { idSchema } from "src/shared/schemas/id.schema";
import { InsertPermissionSchema } from "../schemas/insertPermission.shema";

export default async function permissionRoutes(app: FastifyInstance) {
	app.get("/", {
		schema: {
			response: {
				200: getPermissionsSchema,
				500: basicResponseSchema,
			},
		},
		preHandler: [authMiddleware(), roleMiddleware(role.ADMIN)],
		handler: getPermissions,
	});

	app.get("/:id", {
		schema: {
			params: idSchema,
			response: {
				200: getPermissionByIdSchema,
				500: basicResponseSchema,
			},
		},
		preHandler: [authMiddleware(), roleMiddleware(role.ADMIN)],
		handler: getPermissionById,
	});

	app.post("/nuevo-permiso", {
		schema: {
			body: InsertPermissionSchema,
			response: {
				200: basicResponseSchema,
				500: basicResponseSchema,
			},
		},
		preHandler: [
			authMiddleware(),
			roleMiddleware(role.ADMIN),
			permissionMiddleware(permission.INSERT_PERMISSION),
		],
		handler: createPermission,
	});
}
