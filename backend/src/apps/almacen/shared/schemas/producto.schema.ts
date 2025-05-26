import { Type } from "@sinclair/typebox";
import type { Static } from "@sinclair/typebox";

export const productoSchema = Type.Object({
	nombre: Type.String({ minLength: 1 }),
	descripcion: Type.Optional(Type.String()),
	unidades: Type.Integer({}),
	fecha_creacion: Type.Optional(Type.String({ format: "date-time" })),
});

export type ProductoSchemaDTO = Static<typeof productoSchema>;
