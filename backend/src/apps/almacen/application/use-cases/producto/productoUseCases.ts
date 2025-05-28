import type { ProductoSchemaDTO } from "../../../shared/schemas/productos/producto.schema";
import type { ProductoModificarSchemaDTO } from "src/apps/almacen/shared/schemas/productos/crearProducto.schema";
import { ProductoRepository } from "../../../infrastructure/producto/productoRepository";
import type { NombreSchemaDTO } from "src/apps/almacen/shared/schemas/nombre.schema";
import type { IProductoRepository } from "src/apps/almacen/domain/repositories/producto/productoRepository";
import { Producto } from "../../../domain/repositories/producto/productoEntity";

export async function createProductoUseCase(
	data: ProductoSchemaDTO,
	repository: IProductoRepository,
	user: { id: string; appRole: number },
) {
	const producto = new Producto(
		data.data.nombre,
		data.data.descripcion ?? null,
		data.data.unidades,
	);
	return await repository.crearProducto(producto, user);
}

export async function obtenerProductosUseCase(repository: IProductoRepository) {
	return await repository.obtenerProductos();
}

export async function obtenerProductoPorNombreUseCase(
	data: NombreSchemaDTO,
	repository: IProductoRepository,
) {
	return await repository.obtenerProductoPorNombre(data.nombre_producto);
}

export async function modificarProductoUseCase(
	data: ProductoModificarSchemaDTO,
	repository: IProductoRepository,
	user: { id: string; appRole: number },
) {
	const producto = new Producto(
		data.nombre,
		data.descripcion ?? null,
		data.unidades,
		data.id,
	);
	return await repository.modificarProducto(producto, user);
}
