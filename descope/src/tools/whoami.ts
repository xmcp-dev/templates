import type { ToolMetadata } from "xmcp";
import { getSession } from "@xmcp-dev/descope";

export const metadata: ToolMetadata = {
  name: "whoami",
  description: "Returns the full Descope user session and account information",
};

export default function whoami(): string {
  const session = getSession();

  const userInfo = {
    user: {
      id: session.userId,
      email: session.email || "N/A",
      loginIds: session.loginIds,
    },
    tenants: session.tenants,
    permissions: session.permissions,
    roles: session.roles,
    token: {
      issuedAt: session.issuedAt.toISOString(),
      expiresAt: session.expiresAt.toISOString(),
    },
  };

  return JSON.stringify(userInfo, null, 2);
}
