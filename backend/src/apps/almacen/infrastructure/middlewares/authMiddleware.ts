// Importación de tipos de Fastify para tipar correctamente las funciones de middleware
import type { FastifyRequest, FastifyReply } from "fastify";
// Importación de la conexión a la base de datos (Supabase) para validar el token
import supabaseConnection from "../db/supabaseConection";
// Diccionario de códigos de estado HTTP personalizados
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
// Utilidad para lanzar errores personalizados de aplicación
import { AppError } from "../../../../shared/utils/appError";
// Utilidad para manejar y responder errores de forma centralizada
import { handleError } from "../../../../shared/utils/handleError";

/**
 * Extensión del tipo FastifyRequest para incluir la propiedad 'user'.
 * Esto permite que los controladores y casos de uso accedan al usuario autenticado
 * a lo largo de todo el flujo de la petición.
 */
declare module "fastify" {
	interface FastifyRequest {
		user?: {
			id: string;
			appRole: number;
		};
	}
}

/**
 * Middleware de autenticación.
 *
 * - Extrae y valida el token JWT enviado en el header Authorization.
 * - Si el token es válido, agrega la información del usuario autenticado a request.user.
 * - Si el token es inválido o no está presente, lanza un error de autenticación.
 *
 * Este middleware pertenece a la capa de infraestructura en Clean Architecture,
 * y se utiliza como preHandler en las rutas que requieren autenticación.
 */
export const authMiddleware =
	() => async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const authHeader = request.headers.authorization;

			console.log("Authorization header en fabrica:", authHeader);

			// Verifica que el header Authorization tenga el formato correcto
			if (!authHeader?.startsWith("Bearer ")) {
				throw new AppError(
					"Token no proporcionado",
					HttpStatus.UNAUTHORIZED_401,
				);
			}

			// Extrae el token del header
			const token = authHeader.split(" ")[1];
			// Valida el token usando Supabase Auth
			const { data, error } = await supabaseConnection.auth.getUser(token);

			if (error || !data.user) {
				throw new AppError("Token inválido", HttpStatus.UNAUTHORIZED_401);
			}

			const user = data.user;

			console.log("User data:", user);

			// Agrega la información del usuario autenticado al request
			request.user = {
				id: user.id,
				appRole: user.user_metadata.app_role,
			};
		} catch (err) {
			// Maneja cualquier error de autenticación
			handleError(err, reply);
		}
	};
