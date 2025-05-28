import supabaseConnection from "../db/supabaseConection";
import type { Producto } from "../../domain/repositories/producto/productoEntity";
import { AppError } from "../../../../shared/utils/appError";
import { HttpStatus } from "../../../../shared/dictionaries/httpStatusDictionary";
import type { IProductoRepository } from "../../domain/repositories/producto/productoRepository";
export class ProductoRepository implements IProductoRepository {
	async crearProducto(
		data: Producto,
		user: { id: string; appRole: number },
	): Promise<{ success: boolean; message: string }> {
		const { nombre, descripcion, unidades } = data;
		console.log("info usuario en crrear producto", user);

		const { data: spData, error: spError } = await supabaseConnection.rpc(
			"fn_insert_productos",
			{
				p_nombre: nombre,
				p_descripcion: descripcion,
				p_unidades: unidades,
				p_uuid_empleado: user.id,
			},
		);

		if (spError) {
			throw new AppError(
				"Error al registrar producto",
				HttpStatus.INTERNAL_SERVER_ERROR_500,
				spError.message,
			);
		}

		if (!spData.success) {
			throw new AppError(
				"Error al registrar producto",
				HttpStatus.INTERNAL_SERVER_ERROR_500,
				spData.message || "Error desconocido",
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
			message: "Productos obtenidos exitosamente",
			data: spData,
		};
	}

	async obtenerProductoPorNombre(nombre: string): Promise<{
		success: boolean;
		message: string;
		data?: object;
	}> {
		const { error: spError, data: spData } = await supabaseConnection.rpc(
			"fn_get_productos_nombre",
			{ p_nombre: nombre },
		);

		if (spError) {
			throw new AppError(
				"Error al obtener producto por nombre",
				HttpStatus.INTERNAL_SERVER_ERROR_500,
				spError.message,
			);
		}

		return {
			success: true,
			message: "Producto encontrado exitosamente",
			data: spData,
		};
	}

	async modificarProducto(
		data: Producto,
		user: { id: string; appRole: number },
	): Promise<{ success: boolean; message: string; data?: object }> {
		const { id, nombre, descripcion, unidades } = data;
		console.log("info usuario en modificar producto", user);

		console.log(
			"Datos a modificar producto",
			`ID: ${id}, Nombre: ${nombre}, Descripción: ${descripcion}, Unidades: ${unidades}`,
		);

		const { error: spError, data: spData } = await supabaseConnection.rpc(
			"fn_update_productos",
			{
				p_id: id,
				p_nombre: nombre,
				p_descripcion: descripcion,
				p_unidades: unidades,
				p_uuid_empleado: user.id,
			},
		);

		if (spError) {
			throw new AppError(
				"Error al modificar producto",
				HttpStatus.INTERNAL_SERVER_ERROR_500,
				spError.message,
			);
		}

		if (!spData.success) {
			throw new AppError(
				"Error al modificar producto",
				HttpStatus.INTERNAL_SERVER_ERROR_500,
				spData.message || "Error desconocido",
			);
		}

		return {
			success: true,
			message: "Producto modificado exitosamente",
		};
	}
}
