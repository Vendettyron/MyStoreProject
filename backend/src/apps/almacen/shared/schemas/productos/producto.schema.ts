// Importación de utilidades de TypeBox para definir y tipar esquemas de validación
import { Type } from "@sinclair/typebox";
import type { Static } from "@sinclair/typebox";

/**
 * Esquema de validación para la entidad Producto.
 * Define la estructura y los tipos de datos esperados en las operaciones HTTP relacionadas con productos.
 * 
 * Esta definición se utiliza en la capa de Interfaces/HTTP para validar las peticiones y respuestas,
 * asegurando que los datos cumplen con los requisitos del dominio antes de llegar a los casos de uso.
 */
export const productoSchema = Type.Object({
    success: Type.Optional(Type.Boolean()), // Indica si la operación fue exitosa
    message: Type.Optional(Type.String()),  // Mensaje de respuesta
    data: Type.Object({
        id: Type.Integer(),                  // Identificador único del producto
        nombre: Type.String({ minLength: 1 }), // Nombre del producto (obligatorio)
        descripcion: Type.Optional(Type.String()), // Descripción (opcional)
        unidades: Type.Integer({}),          // Cantidad de unidades disponibles
        fecha_creacion: Type.Optional(Type.String({ format: "date-time" })), // Fecha de creación (opcional)
    }),
});

/**
 * Tipo TypeScript generado a partir del esquema de validación.
 * Permite tipar correctamente los datos en el resto de la aplicación.
 */
export type ProductoSchemaDTO = Static<typeof productoSchema>;
