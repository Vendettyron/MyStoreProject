import type { FastifyRequest, FastifyReply } from "fastify";
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
import { AppError } from "../utils/appError";
import { handleError } from "../utils/handleError";

export const roleMiddleware =
	(expectedRole: string | number) =>
	async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const user = request.user;
			if (!user || !user.appRole) {
				throw new AppError(
					"Rol no encontrado en el usuario",
					HttpStatus.FORBIDDEN_403,
				);
			}
			if (user.appRole !== expectedRole) {
				throw new AppError(
					"Permisos insuficientes (rol)",
					HttpStatus.FORBIDDEN_403,
				);
			}
		} catch (err) {
			handleError(err, reply);
		}
	};
