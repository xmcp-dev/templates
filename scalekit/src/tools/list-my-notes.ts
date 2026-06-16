import { type ToolMetadata } from "xmcp";
import { getSession } from "@xmcp-dev/scalekit";
import { listNotes } from "../lib/notes-store";
import { hasPermission, missingPermissionMessage } from "../lib/permissions";

export const metadata: ToolMetadata = {
  name: "list_my_notes",
  description:
    "List notes saved by the authenticated user. Each user only sees their own notes.",
};

export default async function listMyNotes(): Promise<string> {
  const session = getSession();
  if (!hasPermission(session, "notes:read")) {
    return missingPermissionMessage("notes:read");
  }

  const notes = await listNotes(session.userId);

  return JSON.stringify(
    {
      userId: session.userId,
      count: notes.length,
      notes,
    },
    null,
    2
  );
}