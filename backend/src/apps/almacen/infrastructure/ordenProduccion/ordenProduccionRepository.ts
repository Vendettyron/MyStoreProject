import supabaseConnection from "../db/supabaseConection";
import type { Producto } from "../../domain/repositories/producto/productoEntity";
import { AppError } from "../../../../shared/utils/appError";
import { HttpStatus } from "../../../../shared/dictionaries/httpStatusDictionary";
import type { IProductoRepository } from "../../domain/repositories/producto/productoRepository";
import type { IOrdenPoduccionRepository } from "../../domain/repositories/ordenProduccion/ordenProduccionRepository";
import type { OrdenProduccion } from "../../domain/repositories/ordenProduccion/ordenProduccionEntity";

export class ordenProduccionRepository implements IOrdenPoduccionRepository {
	async planificarOrdenProduccion(
		data: OrdenProduccion,
		user: { id: string },
	): Promise<{ success: boolean; message: string }> {
		const {
			codigoOrden,
			idEstado,
			idProducto,
			fechaInicioPlaneada,
			fechaCreacion,
			fechaFinPlaneada,
			fechaInicioReal,
			fechaFinReal,
		} = data;
		console.log("info usuario en planificar orden produccion", user);

		const { data: spData, error: spError } = await supabaseConnection.rpc(
			"fn_insert_orden_produccion",
			{
				p_codigo_orden: codigoOrden,
				p_id_estado: idEstado,
				p_id_producto: idProducto,
				p_fecha_inicio_planeada: fechaInicioPlaneada,
				p_fecha_fin_planeada: fechaFinPlaneada,
				p_fecha_inicio_real: fechaInicioReal || null,
				p_fecha_fin_real: fechaFinReal || null,
				p_uuid_empleado: user.id,
			},
		);
		if (spError) {
			throw new AppError(
				"Error al planificar orden de producción",
				HttpStatus.INTERNAL_SERVER_ERROR_500,
				spError.message,
			);
		}

		return {
			success: true,
			message: "Orden de producción planificada exitosamente",
		};
	}
}
