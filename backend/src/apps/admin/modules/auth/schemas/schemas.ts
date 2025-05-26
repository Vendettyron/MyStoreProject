import { Type } from "@sinclair/typebox";
import type { Static } from "@sinclair/typebox";

export const registerSchema = Type.Object({
	first_name: Type.String({ minLength: 1, maxLength: 50 }),
	middle_name: Type.Optional(Type.String({ minLength: 1, maxLength: 50 })),
	last_name: Type.String({ minLength: 1, maxLength: 50 }),
	second_last_name: Type.Optional(Type.String({ minLength: 1, maxLength: 50 })),
	address: Type.String({ minLength: 1, maxLength: 100 }),
	phone: Type.String({ maxLength: 15 }),
	email_work: Type.String({ format: "email", minLength: 5, maxLength: 100 }),
	email_personal: Type.Optional(
		Type.String({ format: "email", minLength: 5, maxLength: 100 }),
	),
	password: Type.String({ minLength: 8, maxLength: 64 }),
	id_role: Type.Integer(),
	id_position: Type.Integer(),
	id_department: Type.Integer(),
	id_branch: Type.Integer(),
	salary: Type.Number(),
});

export type RegisterSchemaDTO = Static<typeof registerSchema>;
