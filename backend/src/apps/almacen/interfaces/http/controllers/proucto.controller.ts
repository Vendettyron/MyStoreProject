import type { FastifyRequest, FastifyReply } from "fastify";
import type { ProductoSchemaDTO } from "../../../shared/schemas/productos/producto.schema";
import type { NombreSchemaDTO } from "src/apps/almacen/shared/schemas/nombre.schema";
import type { ProductoModificarSchemaDTO } from "src/apps/almacen/shared/schemas/productos/crearProducto.schema";
import type { idSchemaDTO } from "src/shared/schemas/id.schema";
import {
    createProductoUseCase,
    obtenerProductosUseCase,
    obtenerProductoPorNombreUseCase,
    modificarProductoUseCase,
} from "../../../application/use-cases/producto/productoUseCases";
import { handleError } from "../../../../../shared/utils/handleError";
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
import { ProductoRepository } from "src/apps/almacen/infrastructure/producto/productoRepository";

/**
 * Controladores HTTP para productos.
 *
 * Este archivo representa la capa de Interfaces (adaptadores primarios) en Clean Architecture.
 * Su función es recibir las peticiones HTTP, extraer y validar los datos necesarios,
 * y delegar la lógica de negocio a los casos de uso correspondientes.
 * Los controladores no contienen lógica de negocio, solo orquestan el flujo entre la interfaz web y la aplicación.
 * Además, gestionan las respuestas HTTP y el manejo centralizado de errores.
 *
 * Cumple con Clean Architecture porque separa la lógica de presentación (HTTP) de la lógica de aplicación (casos de uso)
 * y del dominio, permitiendo que los cambios en la interfaz no afecten la lógica central del sistema.
 */

export const createProductoController = async (
    request: FastifyRequest<{ Body: ProductoSchemaDTO }>,
    reply: FastifyReply,
) => {
    try {
        const repository = new ProductoRepository();
        if (!request.user) {
            return reply
                .status(HttpStatus.UNAUTHORIZED_401)
                .send({ message: "Usuario no autenticado" });
        }
        const result = await createProductoUseCase(
            request.body,
            repository,
            request.user,
        );
        return reply.status(HttpStatus.CREATED_201).send(result);
    } catch (error) {
        return handleError(error, reply);
    }
};

export const obtenerProductosController = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    try {
        const repository = new ProductoRepository();
        const result = await obtenerProductosUseCase(repository);
        return reply.status(HttpStatus.OK_200).send({
            success: result.success,
            message: result.message,
            data: result.data,
        });
    } catch (error) {
        return handleError(error, reply);
    }
};

export const obtenerProductoPorNombreController = async (
    request: FastifyRequest<{ Params: NombreSchemaDTO }>,
    reply: FastifyReply,
) => {
    try {
        console.log("etrando al controlador de obtener producto por nombre");
        const repository = new ProductoRepository();
        const result = await repository.obtenerProductoPorNombre(
            request.params.nombre_producto,
        );
        if (!result) {
            return reply
                .status(HttpStatus.NOT_FOUND_404)
                .send({ message: "Producto no encontrado" });
        }
        return reply.status(HttpStatus.OK_200).send({
            success: true,
            message: "Producto encontrado",
            data: result.data,
        });
    } catch (error) {
        return handleError(error, reply);
    }
};

export const modificarProductoController = async (
    request: FastifyRequest<{ Body: ProductoModificarSchemaDTO }>,
    reply: FastifyReply,
) => {
    try {
        const repository = new ProductoRepository();
        console.log("Entrando al controlador de modificar producto");

        if (!request.user) {
            return reply
                .status(HttpStatus.UNAUTHORIZED_401)
                .send({ message: "Usuario no autenticado" });
        }

        const result = await modificarProductoUseCase(
            request.body,
            repository,
            request.user,
        );

        return reply.status(HttpStatus.CREATED_201).send({
            success: result.success,
            message: result.message,
            data: result.data,
        });
    } catch (error) {
        return handleError(error, reply);
    }
};
