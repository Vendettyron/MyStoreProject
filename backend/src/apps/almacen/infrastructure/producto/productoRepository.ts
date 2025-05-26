import supabaseConnection from "../db/supabaseConection";
import type { ProductoSchemaDTO } from "../../shared/schemas/producto.schema";
import { AppError } from "../../../../shared/utils/appError";
import { HttpStatus } from "../../../../shared/dictionaries/httpStatusDictionary";
import type { ICrearProuctoRepository } from "../../domain/repositories/prroducto/crearRepository";

export class CrearProductoRepository implements ICrearProuctoRepository {
	async crearProducto(
		data: ProductoSchemaDTO,
	): Promise<{ success: boolean; message: string }> {
		const { nombre, descripcion, unidad } = data;

		const { error } = await supabaseConnection.from("productos").insert({
			nombre,
			descripcion,
			unidad,
			fecha_creacion: new Date().toISOString(),
		});

		if (error) {
			throw new AppError(
				"Error al registrar producto",
				HttpStatus.INTERNAL_SERVER_ERROR_500,
				error.message,
			);
		}

		return {
			success: true,
			message: "Producto registrado exitosamente",
		};
	}
}
