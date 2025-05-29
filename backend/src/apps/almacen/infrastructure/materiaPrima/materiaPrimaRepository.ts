import { AppError } from "src/shared/utils/appError";
import type { IMateriaPrimaRepository } from "../../domain/repositories/materia_prima/materiaPrimaRepository";
import type { MateriaPrima } from "../../domain/repositories/materia_prima/materiaPrimaEntity";
import supabaseConnection from "../db/supabaseConection";
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";

export class MateriaPrimaRepository implements IMateriaPrimaRepository {
	async crearMateriaPrima(
		data: MateriaPrima,
	): Promise<{ success: boolean; message: string }> {
		const {
			nombre,
			descripcion,
			unidad_medida,
			stock_actual,
			stock_minimo,
			// fecha_creacion,
		} = data;

		const { error: spError, data: spData } = await supabaseConnection.rpc(
			"fn_insert_materia_prima",
			{
				p_nombre: nombre,
				p_descripcion: descripcion,
				p_unidad_medida: unidad_medida,
				p_stock_actual: stock_actual,
				p_stock_minimo: stock_minimo,
				// p_fecha_creacion: fecha_creacion,
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

	async obtenerMateriasPrimas(): Promise<{
		success: boolean;
		message: string;
		data?: object;
	}> {
		const { error: spError, data: spData } = await supabaseConnection.rpc(
			"fn_get_materia_prima_all",
		);

		if (spError) {
			throw new AppError(
				"Error al obtener materias primas",
				HttpStatus.INTERNAL_SERVER_ERROR_500,
				spError.message,
			);
		}

		return {
			success: true,
			message: "Materias primas obtenidas exitosamente",
			data: spData,
		};
	}

	async modificarMateriaPrima(
		data: MateriaPrima,
		user: { id: string; appRole: number },
	): Promise<{ success: boolean; message: string; data?: object }> {
		const {
			id,
			nombre,
			descripcion,
			unidad_medida,
			stock_actual,
			stock_minimo,
		} = data;
		console.log("info usuario en modificar materia prima", user);

		console.log("info materia prima en modificar", data);

		const { error: spError, data: spData } = await supabaseConnection.rpc(
			"fn_update_materia_prima",
			{
				p_id: id,
				p_nombre: nombre,
				p_descripcion: descripcion,
				p_unidad_medida: unidad_medida,
				p_stock_actual: stock_actual,
				p_stock_minimo: stock_minimo,
			},
		);

		console.log("Resultado de la modificación de materia prima:", spData);
		console.log("Error de la modificación de materia prima:", spError);

		if (spError) {
			throw new AppError(
				"Error al modificar materia prima",
				HttpStatus.INTERNAL_SERVER_ERROR_500,
				spError.message,
			);
		}

		if (!spData?.success) {
			throw new AppError(
				"Error al modificar materia prima",
				HttpStatus.INTERNAL_SERVER_ERROR_500,
				spData?.message ?? "Error desconocido",
			);
		}

		return {
			success: true,
			message: "Materia prima modificada exitosamente",
			
		};
	}

}
