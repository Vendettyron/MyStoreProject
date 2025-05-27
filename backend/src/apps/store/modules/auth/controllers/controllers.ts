import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { RegisterClientSchemaDTO } from "../schemas/registerClientSchema";
import { registerClientService } from "../services/services";
import { handleError } from "src/shared/utils/handleError";

// import { handleControllerError } from "src/shared/utils/handleError";

export const registerClient = async (
	request: FastifyRequest<{ Body: RegisterClientSchemaDTO }>,
	reply: FastifyReply,
) => {
	try {
		const result = await registerClientService(request.body);
		reply
			.status(
				result.success ? HttpStatus.CREATED_201 : HttpStatus.BAD_REQUEST_400,
			)
			.send({ success: true, message: result.message });
	} catch (error) {
		// handleControllerError(error, reply);
		handleError(error, reply);
	}
};
