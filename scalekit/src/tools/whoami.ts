import { type ToolMetadata } from "xmcp";
import { getSession } from "@xmcp-dev/scalekit";

export const metadata: ToolMetadata = {
  name: "whoami",
  description:
    "Returns the authenticated MCP user session. userId is the JWT sub claim from Scalekit.",
};

function getArrayClaim(claims: any, ...keys: string[]): readonly string[] {
  for (const k of keys) {
    const v = claims?.[k];
    if (Array.isArray(v)) return v;
    if (typeof v === "string") return [v];
  }
  return [];
}

export default function whoami(): string {
  const session = getSession();
  const claims: any = session.claims || {};

  // Permissions and roles may be present as custom claims when RBAC is
  // configured for the Scalekit resource / organization. Fall back gracefully.
  const permissions =
    (session as any).permissions ||
    getArrayClaim(claims, "permissions", "perms");
  const roles =
    (session as any).roles || getArrayClaim(claims, "roles", "role");

  const info = {
    userId: session.userId,
    scopes: session.scopes,
    permissions,
    roles,
    organizationId: session.organizationId || "N/A",
    expiresAt: session.expiresAt.toISOString(),
    issuedAt: session.issuedAt.toISOString(),
    claims: session.claims,
  };

  return JSON.stringify(info, null, 2);
}