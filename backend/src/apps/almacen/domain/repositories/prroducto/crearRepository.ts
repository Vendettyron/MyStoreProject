import type { ProductoSchemaDTO } from "../../../shared/schemas/producto.schema";

export interface ICrearProuctoRepository {
	crearProducto(
		data: ProductoSchemaDTO,
	): Promise<{ success: boolean; message: string }>;
}
