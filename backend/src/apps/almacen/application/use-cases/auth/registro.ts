import type { RegistroSchemaDTO } from "../../../shared/schemas/registroSchema";
import { SupabaseAuthRepository } from "../../../infrastructure/auth/registroRepository";

export async function registerEmployeeUseCase(data: RegistroSchemaDTO) {
	const authRepo = new SupabaseAuthRepository();
	return await authRepo.register(data);
}
