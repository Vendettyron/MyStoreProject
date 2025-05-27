
export class MateriaPrima {
    constructor(
        public readonly nombre: string,
        public readonly descripcion: string,
        public readonly unidad_medida: string,
        public readonly stock_actual: number,
        public readonly stock_minimo: number,
        public readonly fecha_creacion?: Date,
    ) {
        if (!nombre || nombre.trim().length === 0) {
            throw new Error("El nombre de la materia prima es obligatorio.");
        }

        if (!unidad_medida || unidad_medida.trim().length === 0) {
            throw new Error("La unidad de medida es obligatoria.");
        }

        if (stock_actual < 0) {
            throw new Error("El stock actual no puede ser negativo.");
        }

        if (stock_minimo < 0) {
            throw new Error("El stock mínimo no puede ser negativo.");
        }
    }
}

