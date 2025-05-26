import { AppError } from "src/shared/utils/appError";
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
import type { LoginSchemaDTO } from "src/shared/schemas/loginShema";
import type { RegisterSchemaDTO } from "../schemas/schemas";
import { Status } from "src/shared/dictionaries/statusDictionary";
import { role } from "src/shared/dictionaries/roles&permissionsDictionary";
import supabase from "src/config/supabase";

export async function registerEmployeeService(data: RegisterSchemaDTO) {
	const {
		first_name,
		middle_name,
		last_name,
		second_last_name,
		address,
		phone,
		email_work,
		email_personal,
		password,
		id_role,
		id_position,
		id_department,
		id_branch,
		salary,
	} = data;

	const { data: authUser, error: authError } =
		await supabase.auth.admin.createUser({
			email: email_work,
			password: password,
			user_metadata: {
				app_role: role.ADMIN,
			},
			email_confirm: false,
		});

	if (authError)
		throw new AppError(
			"Error al crear el usuario en Auth si aqui",
			HttpStatus.INTERNAL_SERVER_ERROR_500,
			authError.message,
		);

	const { data: spResult, error: spError } = await supabase.rpc(
		"fn_employee_register",
		{
			first_name,
			middle_name,
			last_name,
			second_last_name,
			address,
			phone,
			email_work,
			email_personal,
			id_role,
			id_position,
			id_department,
			id_status: Status.ACTIVE,
			id_branch,
			salary,
			uuid: authUser.user.id,
		},
	);

	const [{ resultstatus, resultmessage }] = spResult;

	if (!resultstatus) {
		throw new AppError(
			"Error en el function desde la base de datos",
			HttpStatus.INTERNAL_SERVER_ERROR_500,
		);
	}

	if (spError) {
		throw new AppError(
			resultmessage || "Error al crear el usuario en la base de datos",
			HttpStatus.INTERNAL_SERVER_ERROR_500,
		);
	}

	return {
		success: true,
		message: resultmessage,
	};
}

export async function loginService(data: LoginSchemaDTO) {
	const { email, password } = data;

	const { data: authUser, error: authError } =
		await supabase.auth.signInWithPassword({
			email,
			password,
		});

	if (authError)
		throw new AppError(
			"Correo o contrasena invalidos",
			HttpStatus.UNAUTHORIZED_401,
		);

	if (!authUser.user)
		throw new AppError("Usuario no encontrado", HttpStatus.UNAUTHORIZED_401);

	return {
		success: true,
		message: authUser.session?.access_token,
	};
}
