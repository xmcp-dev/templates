import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class McpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(McpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    this.logger.error(
      "MCP request failed",
      exception instanceof Error ? exception.stack : String(exception)
    );

    if (!response.headersSent) {
      response.status(500).json({
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: "Internal server error",
        },
        id: null,
      });
    }
  }
}
