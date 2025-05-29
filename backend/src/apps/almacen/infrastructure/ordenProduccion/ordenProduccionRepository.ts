import supabaseConnection from "../db/supabaseConection";
import { AppError } from "../../../../shared/utils/appError";
import { HttpStatus } from "../../../../shared/dictionaries/httpStatusDictionary";
import type { IOrdenPoduccionRepository } from "../../domain/repositories/ordenProduccion/ordenProduccionRepository";
import type { OrdenProduccion } from "../../domain/repositories/ordenProduccion/ordenProduccionEntity";
import { Estado } from "../../shared/diccionario/estadoDiccionario";

export class ordenProduccionRepository implements IOrdenPoduccionRepository {
	async planificarOrdenProduccion(
		data: OrdenProduccion,
		user: { id: string },
	): Promise<{ success: boolean; message: string }> {
		const {
			codigoOrden,
			idProducto,
			fechaInicioPlaneada,
			fechaFinPlaneada,
			fechaInicioReal,
			fechaFinReal,
			fechaCreacion,
		} = data;

		const { data: spData, error: spError } = await supabaseConnection.rpc(
			"fn_insert_ordenes_produccion",
			{
				p_codigo_orden: codigoOrden,
				p_id_estado: Estado.EN_PROCESO,
				p_id_producto: idProducto,
				p_fecha_inicio_planeada: new Date(fechaInicioPlaneada),
				p_fecha_fin_planeada: new Date(fechaFinPlaneada),
				p_fecha_inicio_real: fechaInicioReal ? new Date(fechaInicioReal) : null,
				p_fecha_fin_real: fechaFinReal ? new Date(fechaFinReal) : null,
				p_fecha_creacion: fechaCreacion ? new Date(fechaCreacion) : null,
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

		if (!spData.success) {
			throw new AppError(
				"Error al planificar orden de producción",
				HttpStatus.BAD_REQUEST_400,
				spData.message ||
					"Error desconocido al planificar la orden de producción",
			);
		}

		return {
			success: spData.success,
			message:
				spData.message || "Orden de producción planificada correctamente",
		};
	}
}
