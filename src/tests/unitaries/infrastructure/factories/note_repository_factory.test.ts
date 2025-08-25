import { jest, describe, beforeAll, test, expect } from "@jest/globals";
import { SQLiteDatabase } from "expo-sqlite";
import * as DatabaseDriver from "expo-sqlite";
import NoteRepositoryFactory from "../../../../infrastructure/factories/note_repository_factory";
import {
  NOTE_BODY,
  NOTE_CREATED_AT,
  NOTE_ENTITY_OBJECT,
  NOTE_ID,
  NOTE_TITLE,
  NOTE_UPDATED_AT,
} from "../../../../constants/note_constants";
import { USER_ID } from "../../../../constants/user_constants";

jest.mock("expo-sqlite");

describe("Test Class NoteRepositoryFactory", () => {
  beforeAll(() => {
    (
      DatabaseDriver as jest.Mocked<typeof DatabaseDriver>
    ).openDatabaseSync.mockReturnValue({
      getAllAsync: async () => [NOTE_ENTITY_OBJECT],
    } as unknown as SQLiteDatabase);
  });

  test('Test If Method "getInstance" Returns An Instance Of NoteRepository', async () => {
    const instance = NoteRepositoryFactory.getInstance();

    const listOfNotesFromDatabase = await instance.getNotes();

    expect(listOfNotesFromDatabase[0].id).toEqual(NOTE_ID);
    expect(listOfNotesFromDatabase[0].title).toEqual(NOTE_TITLE);
    expect(listOfNotesFromDatabase[0].body).toEqual(NOTE_BODY);
    expect(listOfNotesFromDatabase[0].createdAt).toEqual(NOTE_CREATED_AT);
    expect(listOfNotesFromDatabase[0].updatedAt).toEqual(NOTE_UPDATED_AT);
    expect(listOfNotesFromDatabase[0].userId).toEqual(USER_ID);
  });
});
