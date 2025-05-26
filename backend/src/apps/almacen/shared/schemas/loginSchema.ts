import { Type } from "@sinclair/typebox";
import type { Static } from "@sinclair/typebox";

export const loginSchema = Type.Object({
	correo: Type.String({ format: "email" }),
	password: Type.String({ minLength: 1, maxLength: 64 }),
});
export type LoginSchemaDTO = Static<typeof loginSchema>;
