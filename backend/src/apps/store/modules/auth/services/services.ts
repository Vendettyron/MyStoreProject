import { AppError } from "src/shared/utils/appError";
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
import { Status } from "src/shared/dictionaries/statusDictionary";
import { Role } from "src/shared/dictionaries/roles&permissionsDictionary";
import type { RegisterClientSchemaDTO } from "../schemas/registerClientSchema";
import supabase from "src/config/supabase";

export async function registerClientService(data: RegisterClientSchemaDTO) {
	const { first_name, last_name, user_name, email, phone, password } = data;

	const { data: authUser, error: authError } =
		await supabase.auth.admin.createUser({
			email: email,
			password: password,
			user_metadata: {
				app_role: Role.CLIENT,
			},
			email_confirm: false,
		});

	if (authError)
		throw new AppError(
			"Error al crear al crear tu usuario, vuelve a intentarlo",
			HttpStatus.INTERNAL_SERVER_ERROR_500,
		);

	const { data: spResult, error: spError } = await supabase.rpc(
		"fn_client_register",
		{
			first_name,
			last_name,
			user_name,
			email,
			phone,
			id_status: Status.ACTIVE,
			uuid: authUser.user.id,
		},
	);

	if (spError)
		throw new AppError(
			"Error al crear al crear tu usuario, vuelve a intentarlo",
			HttpStatus.INTERNAL_SERVER_ERROR_500,
		);

	const [{ result_status, result_message }] = spResult;
	console.log(result_status);

	if (!result_status) {
		throw new AppError(result_message, HttpStatus.INTERNAL_SERVER_ERROR_500);
	}

	return {
		success: true,
		message: result_message,
	};
}
