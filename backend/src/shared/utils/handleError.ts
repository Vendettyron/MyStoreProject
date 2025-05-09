import { AppError } from "src/shared/utils/appError";
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
import type { FastifyReply } from "fastify";

export function handleError(error: unknown, reply: FastifyReply) {
	const status =
		error instanceof AppError
			? error.statusCode
			: HttpStatus.INTERNAL_SERVER_ERROR_500;

	const message =
		error instanceof AppError ? error.message : "Error interno del servidor";

	reply.status(status).send({
		success: false,
		message,
	});
}
