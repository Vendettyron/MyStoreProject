import { Type } from "@sinclair/typebox";

export const InsertPermissionSchema = Type.Object({
	name: Type.String({
		minLength: 1,
		maxLength: 50,
	}),
	description: Type.String({
		minLength: 1,
		maxLength: 255,
	}),
	id_module: Type.Number(),
});

export type InsertPermissionSchemaDTO = typeof InsertPermissionSchema;
