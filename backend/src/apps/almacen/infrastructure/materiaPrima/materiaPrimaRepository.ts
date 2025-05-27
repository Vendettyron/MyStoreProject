import { AppError } from "src/shared/utils/appError";
import { IMateriaPrimaRepository } from "../../domain/repositories/materia_prima/materiaPrimaRepository";
import { MateriaPrima } from "../../shared/schemas/materiaPrima.schema";
import supabaseConnection from "../db/supabaseConection";
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";



export class MateriaPrimaRepository implements IMateriaPrimaRepository {
    async crearMateriaPrima(
        data: MateriaPrima,
    ): Promise<{ success: boolean; message: string}> {
        const {
            nombre,
            descripcion,
            unidad_medida,
            stock_actual,
            stock_minimo,
            fecha_creacion,
        } = data;

        const { error: spError, data: spData } = await supabaseConnection.rpc(
            "fn_insert_materia_prima",
            {
                p_nombre: nombre,
                p_descripcion: descripcion,
                p_unidad_medida: unidad_medida,
                p_stock_actual: stock_actual,
                p_stock_minimo: stock_minimo,
                p_fecha_creacion: fecha_creacion,
            },
        );

        if (spError) {
            throw new AppError(
                "Error al registrar materia prima",
                HttpStatus.INTERNAL_SERVER_ERROR_500,
                spError.message,
            );
        }

        return {
            success: spData?.success ?? false,
            message: spData?.message ?? "Error desconocido",
            // id: spData?.id,
        };
    }
}


// Así luce la estructura de la entidad MateriaPrima en el dominio, que se usa en el repositorio:
/*
export class MateriaPrima {
    constructor(
        public readonly nombre: string,
        public readonly descripcion: string | null,
        public readonly unidad_medida: string,
        public readonly stock_actual: number,
        public readonly stock_minimo: number,
        public readonly fecha_creacion?: Date,
    ) 
        */
