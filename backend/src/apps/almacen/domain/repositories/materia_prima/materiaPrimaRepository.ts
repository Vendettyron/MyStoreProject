import type { MateriaPrima } from "./materiaPrimaEntity";

export interface IMateriaPrimaRepository {
    crearMateriaPrima(data: MateriaPrima): Promise<{ success: boolean; message: string}>;
    obtenerMateriasPrimas(): Promise<{
        success: boolean;
        message: string;
        data?: object;
    }>;
}

