import { Type } from "@sinclair/typebox";
import type { Static } from "@sinclair/typebox";

export const nombreSchema = Type.Object({
	nombre_producto: Type.String({ minLength: 1 }),
});

export type NombreSchemaDTO = Static<typeof nombreSchema>;
