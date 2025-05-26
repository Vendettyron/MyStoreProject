import { Type } from "@sinclair/typebox";

export const getPermissionsSchema = Type.Object({
	success: Type.Boolean(),
	message: Type.String(),
	data: Type.Array(
		Type.Object({
			id: Type.Integer(),
			name: Type.String(),
			description: Type.String(),
			id_module: Type.Integer(),
			creation_date: Type.String(),
		}),
	),
});

export default getPermissionsSchema;
