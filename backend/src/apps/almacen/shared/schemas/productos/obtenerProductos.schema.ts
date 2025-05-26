import { Type } from "@sinclair/typebox";

export const obtenerProductosSchema = Type.Object({
	success: Type.Boolean(),
	message: Type.String(),
	data: Type.Array(
		Type.Object({
			id: Type.Integer(),
			nombre: Type.String({ minLength: 1 }),
			descripcion: Type.Optional(Type.String()),
			unidades: Type.Integer({}),
			fecha_creacion: Type.Optional(Type.String({ format: "date-time" })),
		}),
	),
});
