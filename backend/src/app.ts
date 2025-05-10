import Fastify from "fastify";
import { handleError } from "./shared/utils/handleError";
import { AppError } from "./shared/utils/appError";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import Cors from "./config/cors";
import Helmet from "./config/helmet";
import v1Routes from "./shared/routes/v1/index";

const app = Fastify({
	ajv: {
		customOptions: {
			allErrors: true,
			removeAdditional: "all",
			coerceTypes: false,
		},
	},
	logger: {
		level: "info",
		serializers: {
			req(req) {
				return {
					method: req.method,
					url: req.url,
				};
			},
			res(res) {
				return {
					statusCode: res.statusCode,
					payload: (res.raw as { payload?: string }).payload,
				};
			},
		},
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "SYS:standard",
				ignore: "pid,hostname,reqId",
				messageFormat:
					"{req.method} {req.url} - {res.statusCode} - {responseTime}ms",
			},
		},
		formatters: {
			level(label) {
				return { level: label.toUpperCase() };
			},
		},
	},
}).withTypeProvider<TypeBoxTypeProvider>();

app.addHook("onSend", async (request, reply, payload) => {
	(reply.raw as { payload?: string }).payload =
		typeof payload === "string" ? payload : JSON.stringify(payload);
	return payload;
});

(async () => {
	await app.register(Helmet);
	await app.register(Cors);
})();

app.register(v1Routes, { prefix: "/api/v1" });

app.setErrorHandler((error, request, reply) => {
	app.log.error(error);

	if (error instanceof AppError) {
		return reply.status(error.statusCode).send({
			success: false,
			message: error.message,
		});
	}

	return reply.status(500).send({
		success: false,
		message: "Ocurrió un error inesperado",
		error: error.message,
	});
});
export default app;
