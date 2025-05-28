import { create } from "domain";
import { FastifyReply, FastifyRequest } from "fastify";
import { createMateriaPrimaUseCase } from "src/apps/almacen/application/use-cases/materiaPrima/materiaPrimaUseCases";
import { MateriaPrimaRepository } from "src/apps/almacen/infrastructure/materiaPrima/materiaPrimaRepository";
import { MateriaPrimaSchemaDTO } from "src/apps/almacen/shared/schemas/esquemas_MateriaPrima/materiaPrima.schema";
import { HttpStatus } from "src/shared/dictionaries/httpStatusDictionary";
import { handleError } from "src/shared/utils/handleError";


export const createMateriaPrimaController = async (
    request: FastifyRequest<{ Body: MateriaPrimaSchemaDTO }>,
    reply: FastifyReply,
) => {
    try {
        const repository = new MateriaPrimaRepository();
        if (!request.user) {
            return reply.status(HttpStatus.UNAUTHORIZED_401).send({ message: "Usuario no autenticado" });
        }
        const result = await createMateriaPrimaUseCase(
            request.body,
            repository,
            request.user,
        );
        return reply.status(HttpStatus.CREATED_201).send(result);
    } catch (error) {
        return handleError(error, reply);
    }
}

