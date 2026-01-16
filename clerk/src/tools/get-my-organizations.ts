import type { ToolMetadata } from "xmcp";
import { getSession, getClient } from "@xmcp-dev/clerk";

export const metadata: ToolMetadata = {
  name: "get-my-organizations",
  description:
    "Returns the user's organization memberships using the Clerk SDK directly",
};

export default async function getMyOrganizations(): Promise<string> {
  const session = getSession();
  const clerk = getClient();

  const memberships = await clerk.users.getOrganizationMembershipList({
    userId: session.userId,
  });

  if (memberships.data.length === 0) {
    return "You are not a member of any organizations.";
  }

  const formattedMemberships = memberships.data.map((membership) => ({
    id: membership.id,
    organizationId: membership.organization.id,
    organizationName: membership.organization.name,
    role: membership.role,
    createdAt: membership.createdAt,
  }));

  return JSON.stringify(
    {
      userId: session.userId,
      membershipCount: memberships.data.length,
      memberships: formattedMemberships,
    },
    null,
    2,
  );
}
