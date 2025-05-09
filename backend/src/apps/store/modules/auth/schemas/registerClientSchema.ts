import { Type } from "@sinclair/typebox";
import type { Static } from "@sinclair/typebox";

export const registerClientSchema = Type.Object({
    first_name: Type.Optional(Type.String({ minLength: 1, maxLength: 50 })),
    last_name: Type.Optional(Type.String({ minLength: 1, maxLength: 50 })),
    user_name: Type.String({ minLength: 1, maxLength: 50 }),
    email: Type.String({ format: "email", minLength: 5, maxLength: 100 }),
    phone: Type.String({ minLength: 1, maxLength: 12 }),
    password: Type.String({ minLength: 8, maxLength: 64 }),
});

export type RegisterClientSchemaDTO = Static<typeof registerClientSchema>;