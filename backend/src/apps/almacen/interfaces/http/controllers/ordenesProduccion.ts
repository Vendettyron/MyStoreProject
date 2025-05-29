import type { FastifyRequest, FastifyReply } from "fastify";
import type { planificarProducionSchemaDTO } from "src/apps/almacen/shared/schemas/ordenProduccion/planificarProduccion.schema";
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
import { handleError } from "../../../../../shared/utils/handleError";
import { ordenProduccionRepository } from "../../../infrastructure/ordenProduccion/ordenProduccionRepository";
import { planificarOrdenProduccionUseCase } from "../../../application/use-cases/ordenPoduccion/ordenProduccionUseCases";

export const planificarOrdenProduccionController = async (
	request: FastifyRequest<{ Body: planificarProducionSchemaDTO }>,
	reply: FastifyReply,
) => {
	try {
		console.log("Entrando al controlador de planificar orden de produccion");

		const repository = new ordenProduccionRepository();
		if (!request.user) {
			return reply
				.status(HttpStatus.UNAUTHORIZED_401)
				.send({ message: "Usuario no autenticado" });
		}

		const result = await planificarOrdenProduccionUseCase(
			request.body,
			repository,
			request.user,
		);

		if (!result.success) {
			return reply.status(HttpStatus.BAD_REQUEST_400).send({
				success: result.success,
				message: result.message,
			});
		}

		return reply.status(HttpStatus.CREATED_201).send({
			success: result.success,
			message: result.message,
		});
	} catch (error) {
		return handleError(error, reply);
	}
};
