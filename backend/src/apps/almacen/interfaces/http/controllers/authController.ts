import type { FastifyReply, FastifyRequest } from "fastify";
import type { RegistroSchemaDTO } from "../../../shared/schemas/registroSchema";
import { registerEmployeeUseCase } from "../../../application/use-cases/auth/registro";
import { handleError } from "../../../../../shared/utils/handleError";
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
import type { LoginSchemaDTO } from "../../../shared/schemas/loginSchema";
import { loginEmployeeUseCase } from "../../../application/use-cases/auth/login";

export const registerEmployeeController = async (
	request: FastifyRequest<{ Body: RegistroSchemaDTO }>,
	reply: FastifyReply,
) => {
	try {
		const result = await registerEmployeeUseCase(request.body);
		reply
			.status(HttpStatus.CREATED_201)
			.send({ success: true, message: result.message });
	} catch (error) {
		handleError(error, reply);
	}
};

export const loginEmployeeController = async (
	request: FastifyRequest<{ Body: LoginSchemaDTO }>,
	reply: FastifyReply,
) => {
	try {
		const result = await loginEmployeeUseCase(request.body);
		reply.status(HttpStatus.OK_200).send(result);
	} catch (error) {
		handleError(error, reply);
	}
};
