import type { Producto } from "./productoEntity";

export interface IProductoRepository {
	crearProducto(
		data: Producto,
		user: { id: string; appRole: number },
	): Promise<{ success: boolean; message: string }>;
	obtenerProductos(): Promise<{
		success: boolean;
		message: string;
		data?: object;
	}>;
}
