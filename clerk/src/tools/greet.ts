import { z } from "zod";
import type { InferSchema, ToolMetadata } from "xmcp";
import { getSession } from "@xmcp-dev/clerk";

export const schema = {
  name: z.string().describe("The name of the user to greet"),
};

export const metadata: ToolMetadata = {
  name: "greet",
  description: "Greet the user with their Clerk identity",
};

export default function greet({ name }: InferSchema<typeof schema>): string {
  const session = getSession();

  return `Hello, ${name}! Your Clerk user ID is ${session.userId}`;
}
