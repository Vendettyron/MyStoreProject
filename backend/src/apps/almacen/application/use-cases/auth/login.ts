import type { LoginSchemaDTO } from "../../../shared/schemas/loginSchema";
import { LoginRepository } from "../../../infrastructure/auth/loginRepository";

export async function loginEmployeeUseCase(data: LoginSchemaDTO) {
	const authRepo = new LoginRepository();
	return await authRepo.login(data);
}
