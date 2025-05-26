import { Type } from "@sinclair/typebox";
import type { Static } from "@sinclair/typebox";

export const expectedRoleSchema = Type.Object({
	expectedRole: Type.Integer(),
});
export type ExpectedRoleSchemaDTO = Static<typeof expectedRoleSchema>;
