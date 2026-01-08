import { z } from "zod";
import type { InferSchema, ToolMetadata } from "xmcp";
import { getSession } from "@xmcp-dev/workos";

export const schema = {
  name: z.string().describe("The name of the user to greet"),
};

export const metadata: ToolMetadata = {
  name: "greet",
  description: "Greet the user with their WorkOS identity",
  annotations: {
    title: "Greet User",
  },
};

export default async function greet({ name }: InferSchema<typeof schema>): Promise<string> {
  const session = getSession();
  return `Hello, ${name}! Your WorkOS user ID is ${session.userId}`;
}
