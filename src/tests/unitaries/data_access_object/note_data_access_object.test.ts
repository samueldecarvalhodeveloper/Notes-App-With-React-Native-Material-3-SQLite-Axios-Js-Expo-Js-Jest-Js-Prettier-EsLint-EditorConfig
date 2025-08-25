import { describe, test, expect } from "@jest/globals";
import { SQLiteDatabase } from "expo-sqlite";
import { USER_ID } from "../../../constants/user_constants";
import NoteDataAccessObject from "../../../data_access_object/note_data_access_object";
import {
  NOTE_BODY,
  NOTE_CREATED_AT,
  NOTE_ENTITY_OBJECT,
  NOTE_ID,
  NOTE_TITLE,
  NOTE_UPDATED_AT,
} from "../../../constants/note_constants";

describe("Test Class NoteDataAccessObject", () => {
  let databaseDriver: SQLiteDatabase;
  let noteDataAccessObject: NoteDataAccessObject;

  test('Test If Method "getNotes" Returns List Of Notes From Database', async () => {
    databaseDriver = {
      getAllAsync: async () => [NOTE_ENTITY_OBJECT],
    } as unknown as SQLiteDatabase;

    noteDataAccessObject = new NoteDataAccessObject(databaseDriver);

    const listOfNotesFromDatabase = await noteDataAccessObject.getNotes();

    expect(listOfNotesFromDatabase[0].id).toEqual(NOTE_ID);
    expect(listOfNotesFromDatabase[0].title).toEqual(NOTE_TITLE);
    expect(listOfNotesFromDatabase[0].body).toEqual(NOTE_BODY);
    expect(listOfNotesFromDatabase[0].createdAt).toEqual(NOTE_CREATED_AT);
    expect(listOfNotesFromDatabase[0].updatedAt).toEqual(NOTE_UPDATED_AT);
    expect(listOfNotesFromDatabase[0].userId).toEqual(USER_ID);
  });

  test('Test If Method "getNote" Returns Note From Database', async () => {
    databaseDriver = {
      getFirstAsync: async () => NOTE_ENTITY_OBJECT,
    } as unknown as SQLiteDatabase;

    noteDataAccessObject = new NoteDataAccessObject(databaseDriver);

    const createdNoteFromDatabase = await noteDataAccessObject.getNote(NOTE_ID);

    expect(createdNoteFromDatabase.id).toEqual(NOTE_ID);
    expect(createdNoteFromDatabase.title).toEqual(NOTE_TITLE);
    expect(createdNoteFromDatabase.body).toEqual(NOTE_BODY);
    expect(createdNoteFromDatabase.createdAt).toEqual(NOTE_CREATED_AT);
    expect(createdNoteFromDatabase.updatedAt).toEqual(NOTE_UPDATED_AT);
    expect(createdNoteFromDatabase.userId).toEqual(USER_ID);
  });

  test('Test If Method "createNote" Creates Note On Database', async () => {
    databaseDriver = {
      runAsync: async () => {},
    } as unknown as SQLiteDatabase;

    noteDataAccessObject = new NoteDataAccessObject(databaseDriver);

    await noteDataAccessObject.createNote(NOTE_ENTITY_OBJECT);
  });

  test('Test If Method "updateNote" Updates Note On Database', async () => {
    databaseDriver = {
      runAsync: async () => {},
    } as unknown as SQLiteDatabase;

    noteDataAccessObject = new NoteDataAccessObject(databaseDriver);

    await noteDataAccessObject.updateNote(NOTE_ENTITY_OBJECT);
  });

  test('Test If Method "deleteNote" Deletes Note On Database', async () => {
    databaseDriver = {
      runAsync: async () => {},
    } as unknown as SQLiteDatabase;

    noteDataAccessObject = new NoteDataAccessObject(databaseDriver);

    await noteDataAccessObject.deleteNote(NOTE_ID);
  });
});
