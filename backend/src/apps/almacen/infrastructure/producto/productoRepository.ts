import supabaseConnection from "../db/supabaseConection";
import type { Producto } from "../../domain/repositories/producto/productoEntity";
import { AppError } from "../../../../shared/utils/appError";
import { HttpStatus } from "../../../../shared/dictionaries/httpStatusDictionary";
import type { IProductoRepository } from "../../domain/repositories/producto/productoRepository";

export class ProductoRepository implements IProductoRepository {
	async crearProducto(
		data: Producto,
	): Promise<{ success: boolean; message: string }> {
		const { nombre, descripcion, unidades } = data;

		const { error: spError } = await supabaseConnection.rpc(
			"fn_insert_productos",
			{
				p_nombre: nombre,
				p_descripcion: descripcion,
				p_unidades: unidades,
			},
		);

		if (spError) {
			throw new AppError(
				"Error al registrar producto",
				HttpStatus.INTERNAL_SERVER_ERROR_500,
				spError.message,
			);
		}

		return {
			success: true,
			message: "Producto registrado exitosamente",
		};
	}

	async obtenerProductos(): Promise<{
		success: boolean;
		message: string;
		data?: object;
	}> {
		console.log("Obteniendo productos desde la base de datos...");
		const { error: spError, data: spData } = await supabaseConnection.rpc(
			"fn_get_productos_all",
		);

		if (spError) {
			throw new AppError(
				"Error al obtener productos",
				HttpStatus.INTERNAL_SERVER_ERROR_500,
				spError.message,
			);
		}

		return {
			success: true,
			message: "Producto registrado exitosamente",
			data: spData,
		};
	}
}
