import type { MateriaPrima } from "./materiaPrimaEntity";

export interface IMateriaPrimaRepository {
	crearMateriaPrima(
		data: MateriaPrima,
		user: { id: string; appRole: number },
	): Promise<{ success: boolean; message: string }>;
	obtenerMateriasPrimas(): Promise<{
		success: boolean;
		message: string;
		data?: object;
	}>;
}
