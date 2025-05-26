import { Type } from "@sinclair/typebox";

export const getPermissionByIdSchema = Type.Object({
	success: Type.Boolean(),
	message: Type.String(),
	data: Type.Object({
		id: Type.Integer(),
		name: Type.String(),
		description: Type.String(),
		id_module: Type.Integer(),
		creation_date: Type.String(),
	}),
});

export default getPermissionByIdSchema;
