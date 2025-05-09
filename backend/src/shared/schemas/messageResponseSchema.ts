import { Type } from "@sinclair/typebox";

export const successResponseSchema = Type.Object({
	success: Type.Boolean(),
	message: Type.String(),
	data: Type.Optional(Type.Any()),
	userId: Type.Optional(Type.String()),
});
