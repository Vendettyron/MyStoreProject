import { Type } from "@sinclair/typebox";

export const idSchema = Type.Object({
	id: Type.String(),
});

export type idSchemaDTO = typeof idSchema;
