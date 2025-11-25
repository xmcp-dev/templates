// Re-export dependencies for single source of truth
export { z } from "zod";
export type { ZodSchema, ZodType, ZodObject } from "zod";

// Re-export xmcp types
export type { ToolMetadata } from "xmcp";

// Shared utilities
export const defaultToolAnnotations = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
} as const;
