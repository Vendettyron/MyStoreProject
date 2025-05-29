import { MateriaPrima } from "src/apps/almacen/domain/repositories/materia_prima/materiaPrimaEntity";
import type { MateriaPrimaSchemaDTO } from "../../../shared/schemas/esquemas_MateriaPrima/materiaPrima.schema";
import type { IMateriaPrimaRepository } from "src/apps/almacen/domain/repositories/materia_prima/materiaPrimaRepository";


export async function createMateriaPrimaUseCase(
    data: MateriaPrimaSchemaDTO,
    repository: IMateriaPrimaRepository,
    user: { id: string; appRole: number },
) {
    const materiaPrima = new MateriaPrima(
        data.nombre,
        data.descripcion ?? null,
        data.unidad_medida,
        data.stock_actual,
        data.stock_minimo,
        data.fecha_creacion ? new Date(data.fecha_creacion) : undefined
    );
    return await repository.crearMateriaPrima(materiaPrima, user);
}

export async function obtenerMateriasPrimasUseCase(repository: IMateriaPrimaRepository,) {
    return await repository.obtenerMateriasPrimas();
}