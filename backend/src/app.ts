import Fastify from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import Cors from "./config/cors";
import Helmet from "./config/helmet";
import v1Routes from "./shared/routes/v1/index";

const app = Fastify().withTypeProvider<TypeBoxTypeProvider>();

(async () => {
	await app.register(Helmet);
	await app.register(Cors);
})();

app.register(v1Routes, { prefix: "/api/v1" });

export default app;
