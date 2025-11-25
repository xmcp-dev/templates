import { type InferSchema, type ToolMetadata } from "xmcp";
import { z } from "zod";

// Define the schema for tool parameters
export const schema = {
  name: z.string().describe("The name of the user to greet"),
};

// Define tool metadata
export const metadata: ToolMetadata = {
  name: "greet",
  description: "Greet the user",
  annotations: {
    title: "Greet the user",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

// Tool implementation
export default function greet({ name }: InferSchema<typeof schema>) {
  return `Hello, ${name}!!`;
}
