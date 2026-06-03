import { type ToolMetadata } from "xmcp";
import { getUsersStore } from "../users/users.store";

export const schema = {};

export const metadata: ToolMetadata = {
  name: "list-users",
  description: "List users from the NestJS application",
  annotations: {
    title: "List users",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function listUsers() {
  const users = getUsersStore().findAll();

  return users.map((user) => `${user.name} <${user.email}>`).join("\n");
}
