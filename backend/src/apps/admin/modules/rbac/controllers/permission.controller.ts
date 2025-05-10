import type { FastifyReply, FastifyRequest } from "fastify";
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
import { handleError } from "src/shared/utils/handleError";
import type { idSchemaDTO } from "src/shared/schemas/id.schema";
import {
	getPermissionByIdService,
	getPermissionsService,
} from "../services/permission.service";

export const getPermissions = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		const data = await getPermissionsService();
		reply.status(HttpStatus.OK_200).send({
			success: true,
			message: "Permisos obtenidos correctamente",
			data,
		});
	} catch (error) {
		handleError(error, reply);
	}
};

export const getPermissionById = async (
	request: FastifyRequest<{ Params: idSchemaDTO }>,
	reply: FastifyReply,
) => {
	try {
		const { id } = request.params;
		const data = await getPermissionByIdService(id);
		console.log("data obtenido:", data);
		reply.status(HttpStatus.OK_200).send({
			success: true,
			message: "Permiso obtenido correctamente",
			data,
		});
	} catch (error) {
		handleError(error, reply);
	}
};
