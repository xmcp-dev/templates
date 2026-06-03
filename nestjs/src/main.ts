import "reflect-metadata";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT ?? 3000);

  await app.listen(port);

  logger.log(`Application running on http://localhost:${port}`);
  logger.log(`MCP endpoint: http://localhost:${port}/mcp`);
}

void bootstrap();
