import type { OrdenProduccion } from "./ordenProduccionEntity";

export interface IOrdenPoduccionRepository {
	planificarOrdenProduccion(
		data: OrdenProduccion,
		user: { id: string; appRole: number },
	): Promise<{ success: boolean; message: string }>;
}
