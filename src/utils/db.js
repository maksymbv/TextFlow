import { openDB } from "idb";

const DB_NAME = "notesDB";
const STORE_NAME = "notes";

export const openDatabase = async () => {
  return openDB(DB_NAME, 2, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("createdAt", "createdAt", { unique: false });
      }
    },
  });
};

export const saveNoteToDB = async (note) => {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  const existingNote = await store.get(note.id);

  const rawNote = JSON.parse(JSON.stringify(note)); // Removing the reactivity

  // If the note already exists, save the old createdAt
  if (existingNote) {
    rawNote.createdAt = existingNote.createdAt;
  } else {
    rawNote.createdAt = Date.now(); // If a new note - set createdAt
  }

  await store.put(rawNote);
  await tx.done;
};

export const getNotesFromDB = async () => {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const notes = await store.getAll();

  return notes.sort((a, b) => {
    const aFav = Boolean(a.isFavorite);
    const bFav = Boolean(b.isFavorite);

    if (aFav !== bFav) {
      // Favorites first
      return aFav ? -1 : 1;
    }

    // Then by creation date (new on top)
    return b.createdAt - a.createdAt;
  });
};

export const deleteNoteFromDB = async (id) => {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.delete(id);
  await tx.done;
};
