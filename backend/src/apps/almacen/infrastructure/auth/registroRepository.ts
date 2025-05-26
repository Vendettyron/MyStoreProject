import { AppError } from "../../../../shared/utils/appError";
import { HttpStatus } from "../../../../shared/dictionaries/httpStatusDictionary";
import supabaseConnection from "../db/supabaseConection";
import { rol } from "../../shared/diccionario/rolDiccionario";
import type { RegistroSchemaDTO } from "../../shared/schemas/registroSchema";
import type { IAuthRepository } from "../../domain/repositories/auth/IAuthRepository";
import { Estado } from "../../shared/diccionario/estadoDiccionario";

export class SupabaseAuthRepository implements IAuthRepository {
	async register(data: RegistroSchemaDTO) {
		const { nombre, correo, password } = data;

		const { data: authUser, error: authError } =
			await supabaseConnection.auth.admin.createUser({
				email: correo,
				password: password,
				user_metadata: {
					app_role: rol.ADMIN,
				},
				email_confirm: false,
			});

		if (authError)
			throw new AppError(
				"Error al crear usuario",
				HttpStatus.INTERNAL_SERVER_ERROR_500,
				authError.message,
			);

		const { data: spResult, error: spError } = await supabaseConnection.rpc(
			"fn_register_empleado2",
			{
				p_nombre: nombre,
				p_correo: correo,
				p_estado: Estado.Activo,
				p_uuid: authUser.user.id,
			},
		);

		const { success: resultstatus, message: resultmessage } = spResult || {};

		if (spError || !resultstatus) {
			throw new AppError(
				"Error en función SQL",
				HttpStatus.INTERNAL_SERVER_ERROR_500,
			);
		}

		return { success: true, message: resultmessage };
	}
}
