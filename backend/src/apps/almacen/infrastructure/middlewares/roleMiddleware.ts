import type { FastifyRequest, FastifyReply } from "fastify";
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
import { handleError } from "../../../../shared/utils/handleError";
import { AppError } from "../../../../shared/utils/appError";

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
