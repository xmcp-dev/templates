import Fastify from "fastify";
import { xmcpHandler } from "@xmcp/adapter";

const app = Fastify({ logger: true });
const port = Number(process.env.PORT ?? 3000);

app.get("/health", async () => ({ status: "ok" }));
app.post("/mcp", xmcpHandler);
app.get("/mcp", xmcpHandler);

app.listen({ port }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  app.log.info(`Server running at ${address}`);
});

export default app;
