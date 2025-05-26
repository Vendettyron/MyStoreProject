import supabase from "src/config/supabase";
import { AppError } from "src/shared/utils/appError";
import type { idSchemaDTO } from "src/shared/schemas/id.schema";
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
import type { InsertPermissionSchemaDTO } from "../schemas/insertPermission.shema";

export async function getPermissionsService() {
	const { data, error } = await supabase
		.from("permission")
		.select("*")
		.order("name", { ascending: true });

	if (error) {
		throw new AppError(
			"Error al obtener los permisos",
			HttpStatus.INTERNAL_SERVER_ERROR_500,
		);
	}

	return data;
}

export async function getPermissionByIdService(id: idSchemaDTO) {
	const { data, error } = await supabase
		.from("permission")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		throw new AppError(
			"Error al obtener el permiso",
			HttpStatus.INTERNAL_SERVER_ERROR_500,
		);
	}

	return data;
}

export async function createPermissionService(data: InsertPermissionSchemaDTO) {
	const { name, description, id_module } = data;

	const { error: spError } = await supabase.rpc("fn_insert_permission", {
		p_name: name,
		p_description: description,
		p_id_module: id_module,
	});

	if (spError) {
		throw new AppError(
			"Error al crear el permiso",
			HttpStatus.INTERNAL_SERVER_ERROR_500,
			spError.message,
		);
	}

	return {
		success: true,
		message: "Permiso creado correctamente",
	};
}
