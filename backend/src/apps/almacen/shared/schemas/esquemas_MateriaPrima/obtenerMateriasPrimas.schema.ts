import { Type } from "@sinclair/typebox";
import type { Static } from "@sinclair/typebox";

export const obtenerMateriasPrimasSchema = Type.Object({
    success: Type.Boolean(),
    message: Type.String(),
    data: Type.Array(
        Type.Object({
            nombre: Type.String(),
            descripcion: Type.String(),
            unidad_medida: Type.String(),
            stock_actual: Type.Number(),
            stock_minimo: Type.Number(),
            fecha_creacion: Type.Optional(Type.String({ format: "date-time" })), 
        }),
    ),
});

// export type obtenerMateriaPrimaSchemaDTO = Static<typeof obtenerMateriasPrimasSchema>;