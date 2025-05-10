import { Type } from "@sinclair/typebox";

export const basicResponseSchema = Type.Object({
	success: Type.Boolean(),
	message: Type.Optional(Type.String()),
	error: Type.Optional(Type.String()),
	data: Type.Optional(Type.Unknown()), // Opcional para respuestas con datos
});
