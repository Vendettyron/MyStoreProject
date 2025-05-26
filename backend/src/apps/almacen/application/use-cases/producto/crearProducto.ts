import type { ProductoSchemaDTO } from "../../../shared/schemas/producto.schema";
import { CrearProductoRepository } from "../../../infrastructure/producto/productoRepository";

export async function createProductoUseCase(data: ProductoSchemaDTO) {
	const repo = new CrearProductoRepository();
	return await repo.crearProducto(data);
}
