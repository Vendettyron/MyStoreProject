import type { ProductoSchemaDTO } from "../../../shared/schemas/productos/producto.schema";
import type { ProductoModificarSchemaDTO } from "src/apps/almacen/shared/schemas/productos/modificarProducto.schema";
import { ProductoRepository } from "../../../infrastructure/producto/productoRepository";
import type { NombreSchemaDTO } from "src/apps/almacen/shared/schemas/nombre.schema";
import type { IProductoRepository } from "src/apps/almacen/domain/repositories/producto/productoRepository";
import { Producto } from "../../../domain/repositories/producto/productoEntity";
import { CrearProductoSchemaDTO } from "src/apps/almacen/shared/schemas/productos/crearProducto.schema";

/**
 * Casos de uso para productos.
 *
 * Este archivo representa la capa de Application (casos de uso) en Clean Architecture.
 * Su función es orquestar la lógica de aplicación, coordinando la interacción entre entidades,
 * repositorios y otros servicios del dominio.
 * 
 * Se comporta como un orquestador: recibe datos de los controladores (adaptadores primarios),
 * transforma y valida la información, y delega las operaciones a los repositorios o entidades del dominio.
 *
 * Cumple con Clean Architecture porque separa la lógica de aplicación de la lógica de presentación (controladores)
 * y de la infraestructura (repositorios concretos), permitiendo que los cambios en la infraestructura
 * o en la interfaz no afecten la lógica central del sistema.
 */

export async function createProductoUseCase(
	data: CrearProductoSchemaDTO,
	repository: IProductoRepository,
	user: { id: string; appRole: number },
) {
	const producto = new Producto(
		data.nombre,
		data.descripcion ?? null,
		data.unidades,
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
