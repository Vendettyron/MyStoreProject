import type { ProductoSchemaDTO } from "../../../shared/schemas/productos/producto.schema";
import type { ProductoModificarSchemaDTO } from "src/apps/almacen/shared/schemas/productos/crearProducto.schema";
import { ProductoRepository } from "../../../infrastructure/producto/productoRepository";
import type { NombreSchemaDTO } from "src/apps/almacen/shared/schemas/nombre.schema";
import type { IProductoRepository } from "src/apps/almacen/domain/repositories/producto/productoRepository";
import { Producto } from "../../../domain/repositories/producto/productoEntity";
import type { planificarProducionSchemaDTO } from "src/apps/almacen/shared/schemas/ordenProduccion/planificarProduccion.schema";
import type { IOrdenPoduccionRepository } from "src/apps/almacen/domain/repositories/ordenProduccion/ordenProduccionRepository";
import { OrdenProduccion } from "../../../domain/repositories/ordenProduccion/ordenProduccionEntity";

export async function planificarOrdenProduccionUseCase(
	data: planificarProducionSchemaDTO,
	repository: IOrdenPoduccionRepository,
	user: { id: string; appRole: number },
) {
	const ordenProduccion = new OrdenProduccion(
		data.codigo_orden,
		data.id_estado,
		data.id_producto,
		new Date(data.fecha_inicio_planeada),
		new Date(data.fecha_fin_planeada),
		data.fecha_inicio_real ? new Date(data.fecha_inicio_real) : undefined,
		data.fecha_fin_real ? new Date(data.fecha_fin_real) : undefined,
	);
	return await repository.planificarOrdenProduccion(ordenProduccion, user);
}
