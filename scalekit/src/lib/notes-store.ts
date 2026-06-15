import fs from "fs/promises";
import path from "path";

export interface Note {
  readonly id: string;
  readonly content: string;
  readonly createdAt: string;
}

interface NotesFile {
  readonly [userId: string]: readonly Note[];
}

const DATA_DIR = path.join(process.cwd(), ".data");
const NOTES_PATH = path.join(DATA_DIR, "notes.json");
const NOTES_TMP_PATH = `${NOTES_PATH}.tmp`;

function isNote(value: unknown): value is Note {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;
  return (
    typeof record.id === "string" &&
    typeof record.content === "string" &&
    typeof record.createdAt === "string"
  );
}

function isNotesFile(value: unknown): value is NotesFile {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every(
    (notes) => Array.isArray(notes) && notes.every(isNote)
  );
}

async function readStore(): Promise<NotesFile> {
  try {
    const raw = await fs.readFile(NOTES_PATH, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return isNotesFile(parsed) ? parsed : {};
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return {};
    }

    return {};
  }
}

async function writeStore(store: NotesFile): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(NOTES_TMP_PATH, JSON.stringify(store, null, 2), "utf8");
  await fs.rename(NOTES_TMP_PATH, NOTES_PATH);
}

export async function listNotes(userId: string): Promise<readonly Note[]> {
  const store = await readStore();
  return store[userId] ?? [];
}

export async function saveNote(userId: string, content: string): Promise<Note> {
  const store = await readStore();
  const note: Note = {
    id: crypto.randomUUID(),
    content,
    createdAt: new Date().toISOString(),
  };

  const existing = store[userId] ?? [];
  await writeStore({
    ...store,
    [userId]: [...existing, note],
  });

  return note;
}