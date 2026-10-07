import { z } from "zod";
import type { InferSchema, ToolMetadata } from "xmcp";
import { getSession } from "@xmcp-dev/descope";

// Define the schema for tool parameters
export const schema = {
  name: z.string().optional().describe("The name of the user to greet"),
};

// Define tool metadata
export const metadata: ToolMetadata = {
  name: "greet",
  description: "Greet the user with their Descope identity",
};

// Tool implementation with session-based identity
export default function greet({ name }: InferSchema<typeof schema>): string {
  const session = getSession();
  const displayName =
    (session.claims.name as string | undefined) || session.email || name || "there";
  return `Hello, ${displayName}! Your Descope user ID is ${session.userId}`;
}
