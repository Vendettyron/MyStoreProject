import { AppError } from "../../../../shared/utils/appError";
import { HttpStatus } from "../../../../shared/dictionaries/httpStatusDictionary";
import supabaseConnection from "../db/supabaseConection";
import type { ILoginRepository } from "../../domain/repositories/auth/iLoginRepository";
import type { LoginSchemaDTO } from "../../shared/schemas/loginSchema";

export class LoginRepository implements ILoginRepository {
	async login(data: LoginSchemaDTO) {
		const { correo, password } = data;

		const { data: authUser, error: authError } =
			await supabaseConnection.auth.signInWithPassword({
				email: correo,
				password: password,
			});

		if (authError || !authUser.session) {
			throw new AppError(
				"Usuario o contraseña incorrectos",
				HttpStatus.UNAUTHORIZED_401,
				authError?.message,
			);
		}

		return {
			success: true,
			message: "Login exitoso",
		};
	}
}
