import type { FastifyRequest, FastifyReply } from "fastify";
import type { planificarProducionSchemaDTO } from "src/apps/almacen/shared/schemas/ordenProduccion/planificarProduccion.schema";
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
import { handleError } from "../../../../../shared/utils/handleError";

export const createProductoController = async (
	request: FastifyRequest<{ Body: planificarProducionSchemaDTO }>,
	reply: FastifyReply,
) => {
	try {
		const repository = new ordenProduccionRepository();
		if (!request.user) {
			return reply
				.status(HttpStatus.UNAUTHORIZED_401)
				.send({ message: "Usuario no autenticado" });
		}

		return reply.status(HttpStatus.CREATED_201).send(result);
	} catch (error) {
		return handleError(error, reply);
	}
};
