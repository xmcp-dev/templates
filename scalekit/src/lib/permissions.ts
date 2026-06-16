import type { Session } from "@xmcp-dev/scalekit";

/**
 * Returns true when the session includes the permission.
 * If the token has no permissions claim (RBAC not configured), authenticated
 * users are allowed so per-user isolation demos still work out of the box.
 */
export function hasPermission(session: Session, permission: string): boolean {
  const permissions = session.permissions;
  if (!permissions || permissions.length === 0) {
    return true;
  }
  return permissions.includes(permission);
}

export function missingPermissionMessage(permission: string): string {
  return `Missing ${permission} permission. Assign a role that includes this permission in Scalekit, then reconnect your MCP client.`;
}
