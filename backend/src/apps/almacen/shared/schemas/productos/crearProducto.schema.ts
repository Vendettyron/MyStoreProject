import { Type } from "@sinclair/typebox";
import type { Static } from "@sinclair/typebox";

export const crearProductoSchema = Type.Object({
    nombre: Type.String({ minLength: 1 }),
    descripcion: Type.Optional(Type.String()),
    unidades: Type.Integer({}),
});

export type CrearProductoSchemaDTO = Static<typeof crearProductoSchema>;
