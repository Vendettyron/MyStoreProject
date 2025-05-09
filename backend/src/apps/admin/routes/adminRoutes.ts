import type{ FastifyInstance } from "fastify";


export default async function adminRoutes(app: FastifyInstance) {
    // Middleware to check if the request is authenticated
    




    app.get("/", async (request, reply) => {
        return reply.status(200).send({ message: "Admin API is running" });
    });
}