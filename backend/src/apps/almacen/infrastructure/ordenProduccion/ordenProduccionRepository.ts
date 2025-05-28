import supabaseConnection from "../db/supabaseConection";
import type { Producto } from "../../domain/repositories/producto/productoEntity";
import { AppError } from "../../../../shared/utils/appError";
import { HttpStatus } from "../../../../shared/dictionaries/httpStatusDictionary";
import type { IProductoRepository } from "../../domain/repositories/producto/productoRepository";
import { IOrdenPoduccionRepository } from "../../domain/repositories/ordenProduccion/ordenProduccionRepository";
import { OrdenProduccion } from "../../domain/repositories/ordenProduccion/ordenProduccionEntity";

export class OrdenProduccion implements IOrdenPoduccionRepository {
	planificarOrdenProduccion(
		data: OrdenProduccion,
		user: { id: string },
	): Promise<{ success: boolean; message: string }> {
		const { producto, cantidad, fecha_inicio, fecha_fin } = data;
		console.log("info usuario en planificar orden produccion", user);
	}
}
