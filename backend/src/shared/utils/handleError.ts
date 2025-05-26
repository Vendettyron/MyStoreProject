import { AppError } from "src/shared/utils/appError";
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
import type { FastifyReply } from "fastify";

export function handleError(error: unknown, reply: FastifyReply) {
	let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR_500;
	let technicalMessage = "Error interno del servidor";
	let friendlyMessage = "Ocurrió un error inesperado";

	if (error instanceof AppError) {
		statusCode = error.statusCode;
		friendlyMessage = error.userMessage;
		technicalMessage = error.internalMessage;
	} else if (error instanceof Error) {
		technicalMessage = error.message;
	} else if (typeof error === "string") {
		technicalMessage = error;
	} else {
		technicalMessage = JSON.stringify(error);
	}

	reply.status(statusCode).send({
		success: false,
		message: friendlyMessage,
		error: technicalMessage,
	});
}
