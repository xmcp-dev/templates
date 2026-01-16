import type { ToolMetadata } from "xmcp";

export const metadata: ToolMetadata = {
  name: "random-number",
  description: "Generate a random number",
};

export default function randomNumber(): number {
  return Math.floor(Math.random() * 100);
}
