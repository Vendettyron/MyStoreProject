import { Type } from "@sinclair/typebox";
import type { Static } from "@sinclair/typebox";

export const registerSchema = Type.Object({
	firstName: Type.String({ minLength: 1, maxLength: 50 }),
	middleName: Type.Optional(Type.String({ minLength: 1, maxLength: 50 })),
	lastName: Type.String({ minLength: 1, maxLength: 50 }),
	secondLastName: Type.Optional(Type.String({ minLength: 1, maxLength: 50 })),
	address: Type.String({ minLength: 1, maxLength: 100 }),
	phone: Type.String({ minLength: 10, maxLength: 15 }),
	emailWork: Type.String({ format: "email", minLength: 5, maxLength: 100 }),
	emailPersonal: Type.Optional(
		Type.String({ format: "email", minLength: 5, maxLength: 100 }),
	),
	password: Type.String({ minLength: 8, maxLength: 64 }),
	passwordConfirmation: Type.String({ minLength: 8, maxLength: 64 }),
	id_role: Type.Integer(),
	id_position: Type.Integer(),
	id_department: Type.Integer(),
	id_branch: Type.Integer(),
	salary: Type.Number(),
});

export type RegisterSchemaDTO = Static<typeof registerSchema>;
