import { Type } from "@sinclair/typebox";
import type { Static } from "@sinclair/typebox";

export const ModificarMateriaPrimaSchema = Type.Object({
    id: Type.Number(),
    nombre: Type.String(),
    descripcion: Type.String(),
    unidad_medida: Type.String(),
    stock_actual: Type.Number(),
    stock_minimo: Type.Number(),
});

export type ModificarMateriaPrimaSchemaDTO = Static<typeof ModificarMateriaPrimaSchema>;

