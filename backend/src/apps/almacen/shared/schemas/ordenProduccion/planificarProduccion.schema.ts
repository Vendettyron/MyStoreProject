import { Type } from "@sinclair/typebox";
import type { Static } from "@sinclair/typebox";

export const planificarProducionSchema = Type.Object({
	codigo_orden: Type.String({ minLength: 1 }),
	id_producto: Type.Integer(),
	fecha_inicio_planeada: Type.String({ format: "date-time" }),
	fecha_fin_planeada: Type.String({ format: "date-time" }),
	fecha_inicio_real: Type.Optional(Type.String({ format: "date-time" })),
	fecha_fin_real: Type.Optional(Type.String({ format: "date-time" })),
	fecha_creacion: Type.Optional(Type.String({ format: "date-time" })),
});

export type planificarProducionSchemaDTO = Static<
	typeof planificarProducionSchema
>;
