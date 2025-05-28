import { Type } from "@sinclair/typebox";
import type { Static } from "@sinclair/typebox";

export const productoModificarSchema = Type.Object({
	id: Type.Integer(),
	nombre: Type.String({ minLength: 1 }),
	descripcion: Type.Optional(Type.String()),
	unidades: Type.Integer({}),
});

export type ProductoModificarSchemaDTO = Static<typeof productoModificarSchema>;
