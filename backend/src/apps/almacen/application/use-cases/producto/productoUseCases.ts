import type { ProductoSchemaDTO } from "../../../shared/schemas/producto.schema";
import { ProductoRepository } from "../../../infrastructure/producto/productoRepository";
import type { IProductoRepository } from "src/apps/almacen/domain/repositories/producto/productoRepository";
import { Producto } from "../../../domain/repositories/producto/productoEntity";

export async function createProductoUseCase(
	data: ProductoSchemaDTO,
	repository: IProductoRepository,
) {
	const producto = new Producto(
		data.nombre,
		data.descripcion ?? null,
		data.unidades,
	);
	return await repository.crearProducto(producto);
}

export async function obtenerProductosUseCase(repository: IProductoRepository) {
	return await repository.obtenerProductos();
}
