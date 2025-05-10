import type { FastifyInstance } from "fastify";
import { Role } from "src/shared/dictionaries/simpleRoleDictionary";
import { roleMiddleware } from "src/shared/middlewares/roleMiddleware";
import {
	getPermissions,
	getPermissionById,
} from "../controllers/permission.controller";
import { getPermissionsSchema } from "../schemas/getPermissions.schema";
import { basicResponseSchema } from "src/shared/schemas/messageResponseSchema";
import { idSchema } from "src/shared/schemas/id.schema";

export default async function permissionRoutes(app: FastifyInstance) {
	app.get("/", {
		schema: {
			response: {
				200: getPermissionsSchema,
				500: basicResponseSchema,
			},
		},
		preHandler: roleMiddleware(Role.ADMIN),
		handler: getPermissions,
	});

	app.get("/:id", {
		schema: {
			params: idSchema,
			response: {
				200: getPermissionsSchema,
				500: basicResponseSchema,
			},
		},
		preHandler: roleMiddleware(Role.ADMIN),
		handler: getPermissionById,
	});
}
