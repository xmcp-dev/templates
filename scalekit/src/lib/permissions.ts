import type { Session } from "@xmcp-dev/scalekit";

/**
 * Extract permissions array from direct session (if plugin evolves) or
 * from custom claims in the Scalekit JWT. This supports optional RBAC
 * configuration in Scalekit where permissions are embedded in tokens.
 */
function getPermissions(session: Session): readonly string[] {
  const claims: any = (session as any).claims || {};
  const direct: any = (session as any).permissions;
  const raw =
    direct ??
    claims.permissions ??
    claims.perms ??
    claims.authorization?.permissions;
  if (!raw) return [];
  return Array.isArray(raw) ? raw : [raw];
}

/**
 * Returns true when the session includes the permission.
 * If the token has no permissions claim (RBAC not configured), authenticated
 * users are allowed so per-user isolation demos still work out of the box.
 */
export function hasPermission(session: Session, permission: string): boolean {
  const permissions = getPermissions(session);
  if (permissions.length === 0) {
    return true;
  }
  return permissions.includes(permission);
}

export function missingPermissionMessage(permission: string): string {
  return `Missing ${permission} permission. Assign a role that includes this permission in Scalekit, then reconnect your MCP client.`;
}