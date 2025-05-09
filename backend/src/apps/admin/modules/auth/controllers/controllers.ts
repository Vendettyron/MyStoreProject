import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { RegisterSchemaDTO } from "../schemas/schemas";
import { handleControllerError } from "src/shared/utils/handleControllerError";
import type { LoginSchemaDTO } from "src/shared/schemas/loginShema";
import { registerEmployeeService,loginService } from "../services/services";

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

export const login = async (
	request: FastifyRequest<{ Body: LoginSchemaDTO }>,
	reply: FastifyReply,
) => {
	try {
		const result = await loginService(request.body);
		reply.status(HttpStatus.ACCEPTED_202).send({ success:true, message: result.message });
	} catch (error) {
		handleControllerError(error, reply);
	}
}

