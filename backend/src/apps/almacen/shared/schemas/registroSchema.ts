import { Type } from "@sinclair/typebox";
import type { Static } from "@sinclair/typebox";

export const registroSchema = Type.Object({
	nombre: Type.String({ minLength: 1, maxLength: 100 }),
	correo: Type.String({ format: "email" }),
	password: Type.String({ minLength: 6, maxLength: 64 }),
});

export type RegistroSchemaDTO = Static<typeof registroSchema>;
