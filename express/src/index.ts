import express from "express";
import { xmcpHandler } from "@xmcp/adapter";

const app = express();
const port = Number(process.env.PORT ?? 3000);
const handleMcp = xmcpHandler as unknown as express.RequestHandler;

app.use(express.json({ limit: "10mb" }));
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
app.get("/mcp", handleMcp);
app.post("/mcp", handleMcp);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
