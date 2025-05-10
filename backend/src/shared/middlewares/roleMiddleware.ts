import type { FastifyRequest, FastifyReply } from "fastify";
import supabase from "src/config/supabase";
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
import { AppError } from "../utils/appError";
import { handleError } from "../utils/handleError";

declare module "fastify" {
	interface FastifyRequest {
		user?: string;
	}
}

export const roleMiddleware =
	(expectedRole: number) =>
	async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const authHeader = request.headers.authorization;

			if (!authHeader?.startsWith("Bearer ")) {
				throw new AppError(
					"Token no proporcionado",
					HttpStatus.UNAUTHORIZED_401,
				);
			}

			const token = authHeader.split(" ")[1];
			const { data, error } = await supabase.auth.getUser(token);

			if (error || !data.user) {
				throw new AppError("Token inválido", HttpStatus.UNAUTHORIZED_401);
			}

			const user = data.user;
			const appRole = user.user_metadata?.app_role;

			if (appRole !== expectedRole) {
				throw new AppError("Permisos insuficientes", HttpStatus.FORBIDDEN_403);
			}

			console.log("User ID:", user.id);

			request.user = user.id as string;
		} catch (err) {
			handleError(err, reply);
		}
	};
