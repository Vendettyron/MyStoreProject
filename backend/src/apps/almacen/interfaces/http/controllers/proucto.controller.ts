import type { FastifyRequest, FastifyReply } from "fastify";
import type { ProductoSchemaDTO } from "../../../shared/schemas/producto.schema";
import { createProductoUseCase } from "../../../application/use-cases/producto/crearProducto";
import { handleError } from "../../../../../shared/utils/handleError";
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";

export const createProductoController = async (
	request: FastifyRequest<{ Body: ProductoSchemaDTO }>,
	reply: FastifyReply,
) => {
	try {
		const result = await createProductoUseCase(request.body);
		return reply.status(HttpStatus.CREATED_201).send(result);
	} catch (error) {
		return handleError(error, reply);
	}
};
