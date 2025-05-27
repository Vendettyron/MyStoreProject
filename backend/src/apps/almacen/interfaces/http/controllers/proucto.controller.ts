import type { FastifyRequest, FastifyReply } from "fastify";
import type { ProductoSchemaDTO } from "../../../shared/schemas/producto.schema";
import {
	createProductoUseCase,
	obtenerProductosUseCase,
} from "../../../application/use-cases/producto/productoUseCases";
import { handleError } from "../../../../../shared/utils/handleError";
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
import { ProductoRepository } from "src/apps/almacen/infrastructure/producto/productoRepository";

export const createProductoController = async (
	request: FastifyRequest<{ Body: ProductoSchemaDTO }>,
	reply: FastifyReply,
) => {
	try {
		const repository = new ProductoRepository();
		if (!request.user) {
			return reply
				.status(HttpStatus.UNAUTHORIZED_401)
				.send({ message: "Userio no authenticado" });
		}
		const result = await createProductoUseCase(
			request.body,
			repository,
			request.user,
		);
		return reply.status(HttpStatus.CREATED_201).send(result);
	} catch (error) {
		return handleError(error, reply);
	}
};

export const obtenerProductosController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		const repository = new ProductoRepository();
		const result = await obtenerProductosUseCase(repository);
		return reply.status(HttpStatus.OK_200).send({
			success: result.success,
			message: result.message,
			data: result.data,
		});
	} catch (error) {
		return handleError(error, reply);
	}
};
