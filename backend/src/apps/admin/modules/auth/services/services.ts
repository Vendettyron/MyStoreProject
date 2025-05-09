import { AppError } from "src/shared/utils/appError";
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
import type { RegisterSchemaDTO } from "../schemas/schemas";
import supabase from "src/config/supabase";
import bcrypt from "bcrypt";

export async function registerEmployeeService(data: RegisterSchemaDTO) {
	const {
		firstName,
		middleName,
		lastName,
		secondLastName,
		address,
		phone,
		emailWork,
		emailPersonal,
		password,
		id_role,
		id_position,
		id_department,
		id_branch,
		salary,
	} =data

	const hashedPassword = await bcrypt.hash(password, 10);

	const { data: authUser, error: authError } =
		await supabase.auth.admin.createUser({
			email: emailWork,
			password: hashedPassword,
			email_confirm: false,
		});

	if (authError) throw new AppError("Error al crear el usuario en Auth", HttpStatus.INTERNAL_SERVER_ERROR_500);

	const { data: spResult, error: spError } = await supabase.rpc(
		"fn_employee_register",
		{
			first_name: firstName,
			middle_name: middleName,
			last_name: lastName,
			second_last_name: secondLastName,
			address,
			phone,
			email_work: emailWork,
			email_personal: emailPersonal,
			id_role,
			id_position,
			id_department,
			id_status: 1,
			id_branch,
			salary,
			uuid: authUser.user.id,
		},
	);

	const [{ resultstatus, resultmessage }] = spResult;

	if (!resultstatus) {
		throw new AppError("Error en el function desde la base de datos", HttpStatus.INTERNAL_SERVER_ERROR_500);
	}

	if (spError){
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
