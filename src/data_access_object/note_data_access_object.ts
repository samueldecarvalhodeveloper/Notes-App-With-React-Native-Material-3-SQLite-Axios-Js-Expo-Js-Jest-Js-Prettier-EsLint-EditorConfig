import { SQLiteDatabase } from "expo-sqlite";
import NoteEntity from "../infrastructure/entities/note_entity";
import {
  CREATING_NOTE_QUERY,
  DELETING_NOTE_QUERY,
  FETCHING_LIST_OF_NOTES_QUERY,
  FETCHING_NOTE_QUERY,
  UPDATING_NOTE_QUERY,
} from "../constants/note_constants";

class NoteDataAccessObject {
  private databaseDriver: SQLiteDatabase;

  constructor(databaseDriver: SQLiteDatabase) {
    this.databaseDriver = databaseDriver;
  }

  public async getNotes(): Promise<Array<NoteEntity>> {
    const queryResponse = await this.databaseDriver.getAllAsync<NoteEntity>(
      FETCHING_LIST_OF_NOTES_QUERY,
    );

    return queryResponse;
  }

  public async getNote(id: number): Promise<NoteEntity> {
    const queryResponse = await this.databaseDriver.getFirstAsync<NoteEntity>(
      FETCHING_NOTE_QUERY,
      [id],
    );

    return queryResponse as NoteEntity;
  }

  public async createNote(note: NoteEntity): Promise<void> {
    await this.databaseDriver.runAsync(CREATING_NOTE_QUERY, [
      note.id,
      note.title,
      note.body,
      note.createdAt,
      note.updatedAt,
      note.userId,
    ]);
  }

  public async updateNote(note: NoteEntity): Promise<void> {
    await this.databaseDriver.runAsync(UPDATING_NOTE_QUERY, [
      note.id,
      note.title,
      note.body,
      note.createdAt,
      note.updatedAt,
      note.userId,
      note.id,
    ]);
  }

  public async deleteNote(id: number): Promise<void> {
    await this.databaseDriver.runAsync(DELETING_NOTE_QUERY, [id]);
  }
}

export default NoteDataAccessObject;
