import type { FastifyRequest, FastifyReply } from "fastify";
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
import supabase from "src/config/supabase";
import { handleError } from "../utils/handleError";
import { AppError } from "../utils/appError";

export const permissionMiddleware =
	(requiredPermission: number) =>
	async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const user = request.user;
			if (!user || !user.id) {
				throw new AppError(
					"No se ha encontrado el usuario autenticado",
					HttpStatus.UNAUTHORIZED_401,
				);
			}

			const { data: spData, error: spError } = await supabase.rpc(
				"sp_permission_verification",
				{
					p_uuid: user.id,
					p_permission_id: requiredPermission,
				},
			);

			const result = spData?.[0];

			if (spError) {
				throw new AppError(
					"Error al verificar el permiso",
					HttpStatus.INTERNAL_SERVER_ERROR_500,
					spError.message,
				);
			}

			if (!result || !result.success) {
				throw new AppError(
					result?.message || "Permiso denegado",
					HttpStatus.FORBIDDEN_403,
				);
			}
		} catch (err) {
			handleError(err, reply);
		}
	};
