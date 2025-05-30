/**
 * Entidad Producto.
 * 
 * Este archivo representa la capa de dominio en Clean Architecture.
 * Define la entidad central del dominio "Producto" y sus reglas de negocio.
 * 
 * Cumple con Clean Architecture porque encapsula la lógica y validaciones propias del dominio,
 * asegurando que los datos sean siempre válidos y consistentes, independientemente de la infraestructura o la interfaz.
 */

export class Producto {
    constructor(
        public readonly nombre: string,
        public readonly descripcion: string | null,
        public readonly unidades: number,
        public readonly id?: number,
        public readonly fechaCreacion?: Date,
    ) {
        if (!nombre || nombre.trim().length === 0) {
            throw new Error("El nombre del producto es obligatorio.");
        }

        if (unidades < 0) {
            throw new Error("Las unidades no pueden ser negativas.");
        }
    }
}
