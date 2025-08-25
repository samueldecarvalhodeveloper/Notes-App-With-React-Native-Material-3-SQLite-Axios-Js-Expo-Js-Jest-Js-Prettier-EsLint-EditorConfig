import NoteDataTransferObject from "../infrastructure/data_transfer_objects/note_data_transfer_object";
import NoteEntity from "../infrastructure/entities/note_entity";
import Note from "../infrastructure/models/note";
import { USER_ID } from "./user_constants";

export const NOTE_DATABASE_TABLE_NAME = "notes";

export const NOTE_DATABASE_CREATION_QUERY = `
CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL,
  userId INTEGER NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
);`;

export const FETCHING_LIST_OF_NOTES_QUERY = `SELECT * FROM ${NOTE_DATABASE_TABLE_NAME}`;

export const FETCHING_NOTE_QUERY = `SELECT * FROM ${NOTE_DATABASE_TABLE_NAME} WHERE id = ?`;

export const CREATING_NOTE_QUERY = `INSERT INTO ${NOTE_DATABASE_TABLE_NAME} (id, title, body, createdAt, updatedAt, userId) VALUES (?, ?, ?, ?, ?, ?)`;

export const UPDATING_NOTE_QUERY = `UPDATE ${NOTE_DATABASE_TABLE_NAME} SET id = ?, title = ?, body = ?, createdAt = ?, updatedAt = ?, userId = ? WHERE id = ?`;

export const DELETING_NOTE_QUERY = `DELETE FROM ${NOTE_DATABASE_TABLE_NAME} WHERE id = ?`;

export const NOTE_BASE_ROUTE = "/notes";

export const NOTE_ID = 20;

export const NOTE_TITLE = "Title";

export const NOTE_BODY = "Body";

export const NOTE_CREATED_AT = 0;

export const NOTE_UPDATED_AT = 0;

export const NOTE_ENTITY_OBJECT = new NoteEntity(
  NOTE_ID,
  NOTE_TITLE,
  NOTE_BODY,
  NOTE_CREATED_AT,
  NOTE_UPDATED_AT,
  USER_ID,
);

export const NOTE_ENTITY_WITH_WRONG_DATA_OBJECT = new NoteEntity(
  NOTE_ID,
  "",
  "",
  NOTE_CREATED_AT,
  NOTE_UPDATED_AT,
  USER_ID,
);

export const NOTE_MODEL_OBJECT = new Note(
  NOTE_ID,
  NOTE_TITLE,
  NOTE_BODY,
  NOTE_CREATED_AT,
  NOTE_UPDATED_AT,
  USER_ID,
);

export const NOTE_DATA_TRANSFER_OBJECT_OBJECT = new NoteDataTransferObject(
  NOTE_TITLE,
  NOTE_BODY,
);
