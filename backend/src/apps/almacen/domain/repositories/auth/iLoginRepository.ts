import type { LoginSchemaDTO } from "../../../shared/schemas/loginSchema";

export interface ILoginRepository {
	login(data: LoginSchemaDTO): Promise<{ success: boolean; message: string }>;
}
