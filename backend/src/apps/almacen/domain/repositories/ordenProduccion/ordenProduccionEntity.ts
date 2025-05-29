export class OrdenProduccion {
	constructor(
		public readonly codigoOrden: string,

		public readonly idProducto: number,
		public readonly fechaInicioPlaneada: Date,
		public readonly fechaFinPlaneada: Date,
		public readonly idEstado?: number,
		public readonly fechaInicioReal?: Date,
		public readonly fechaFinReal?: Date,
		public readonly fechaCreacion?: Date,
		public readonly id?: number,
	) {
		if (!codigoOrden || codigoOrden.trim().length === 0) {
			throw new Error("El código de la orden de producción es obligatorio.");
		}

		if (idProducto <= 0) {
			throw new Error(
				"El producto asociado a la orden de producción es inválido.",
			);
		}

		if (!fechaInicioPlaneada || Number.isNaN(fechaInicioPlaneada.getTime())) {
			throw new Error("La fecha de inicio planeada es inválida.");
		}

		if (!fechaFinPlaneada || Number.isNaN(fechaFinPlaneada.getTime())) {
			throw new Error("La fecha de fin planeada es inválida.");
		}

		if (fechaInicioReal && Number.isNaN(fechaInicioReal.getTime())) {
			throw new Error("La fecha de inicio real es inválida.");
		}

		if (fechaFinReal && Number.isNaN(fechaFinReal.getTime())) {
			throw new Error("La fecha de fin real es inválida.");
		}

		if (fechaCreacion && Number.isNaN(fechaCreacion.getTime())) {
			throw new Error("La fecha de creación es inválida.");
		}
	}
}
