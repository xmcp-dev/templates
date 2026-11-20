import { z } from "zod";
import { type InferSchema, type ToolMetadata } from "xmcp";
import { paid } from "@xmcp-dev/x402";

export const schema = {
  text: z.string().min(1, "Text is required").describe("The text to count"),
};

export const metadata: ToolMetadata = {
  name: "word-count",
  description: "Count the words in a text (paid tool - 0.002 XNO)",
};

export default paid(
  { network: "nano", price: 0.002 },
  async function wordCount({ text }: InferSchema<typeof schema>) {
    const words = text.trim().split(/\s+/).filter(Boolean);

    return words.length.toString();
  }
);
