import type { FastifyRequest, FastifyReply } from "fastify";
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
import supabaseConnection from "../db/supabaseConection";
import { handleError } from "../../../../shared/utils/handleError";
import { AppError } from "../../../../shared/utils/appError";

export const permisoMiddleware =
	(permisoRequerido: number) =>
	async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const user = request.user;

			
			if (!user || !user.id) {
				throw new AppError(
					"No se ha encontrado el usuario autenticado",
					HttpStatus.UNAUTHORIZED_401,
				);
			}

			const { data: spData, error: spError } = await supabaseConnection.rpc(
				"fn_verificar_permiso",
				{
					p_uuid: user.id,
					p_permiso_id: permisoRequerido,
				},
			);

			console.log("Resultado de la verificación de permiso:", spData);

			console.log("Error de verificación de permiso:", spError);

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
