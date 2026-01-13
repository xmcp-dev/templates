import type { ToolMetadata } from "xmcp";
import { getSession, getUser } from "@xmcp-dev/clerk";

export const metadata: ToolMetadata = {
  name: "whoami",
  description: "Returns the full Clerk user session and account information",
  annotations: {
    title: "Who Am I",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function whoami(): Promise<string> {
  const session = getSession();
  const user = await getUser();

  const userInfo = {
    session: {
      userId: session.userId,
      sessionId: session.sessionId || "N/A",
      organizationId: session.organizationId || "N/A",
      organizationRole: session.organizationRole || "N/A",
      organizationPermissions: session.organizationPermissions || [],
      expiresAt: session.expiresAt.toISOString(),
      issuedAt: session.issuedAt.toISOString(),
    },
    user: {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || "N/A",
      firstName: user.firstName || "N/A",
      lastName: user.lastName || "N/A",
      imageUrl: user.imageUrl || "N/A",
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };

  return JSON.stringify(userInfo, null, 2);
}
