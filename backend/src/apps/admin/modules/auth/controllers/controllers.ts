import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
import type { FastifyReply, FastifyRequest } from "fastify";
import { registerEmployeeService } from "../services/services";
import type { RegisterSchemaDTO } from "../schemas/schemas";
import { handleControllerError } from "src/shared/utils/handleControllerError";

export const registerEmployee = async (
	request: FastifyRequest<{ Body: RegisterSchemaDTO }>,
	reply: FastifyReply,
) => {
	try {
		const result = await registerEmployeeService(request.body);
		reply.status(HttpStatus.CREATED_201).send({ success:true, message: result.message });
	} catch (error) {
		handleControllerError(error, reply);
	}
};
