import { z } from "zod";
import { type InferSchema, type ToolMetadata } from "xmcp";
import { getSession } from "@xmcp-dev/scalekit";
import { saveNote } from "../lib/notes-store";
import { hasPermission, missingPermissionMessage } from "../lib/permissions";

export const schema = {
  content: z.string().min(1).describe("Note text to save for the current user"),
};

export const metadata: ToolMetadata = {
  name: "save_note",
  description:
    "Save a note for the authenticated user. Notes are scoped to the JWT sub claim.",
};

export default async function saveNoteTool({
  content,
}: InferSchema<typeof schema>): Promise<string> {
  const session = getSession();
  if (!hasPermission(session, "notes:write")) {
    return missingPermissionMessage("notes:write");
  }

  const note = await saveNote(session.userId, content);

  return JSON.stringify(
    {
      userId: session.userId,
      note,
    },
    null,
    2
  );
}