import type { FastifyRequest, FastifyReply } from "fastify";
import supabase from "src/config/supabase";
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
import { AppError } from "../../../../shared/utils/appError";
import { handleError } from "../../../../shared/utils/handleError";

declare module "fastify" {
	interface FastifyRequest {
		user?: {
			id: string;
			appRole: number;
		};
	}
}

export const authMiddleware =
	() => async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const authHeader = request.headers.authorization;

			console.log("Authorization header:", authHeader);

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

			console.log("User data:", user);

			request.user = {
				id: user.id,
				appRole: user.user_metadata.app_role,
			};
		} catch (err) {
			handleError(err, reply);
		}
	};
