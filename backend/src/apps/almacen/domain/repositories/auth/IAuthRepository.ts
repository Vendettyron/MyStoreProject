import type { RegistroSchemaDTO } from "../../../shared/schemas/registroSchema";

export interface IAuthRepository {
	register(
		data: RegistroSchemaDTO,
	): Promise<{ success: boolean; message: string }>;
}
