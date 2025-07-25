import { describe, test, expect } from "@jest/globals";
import { USER_ID } from "../../../../constants/user_constants";
import Note from "../../../../infrastructure/models/note";
import {
  NOTE_BODY,
  NOTE_CREATED_AT,
  NOTE_ID,
  NOTE_TITLE,
  NOTE_UPDATED_AT,
} from "../../../../constants/note_constants";

describe("Test Model Note", () => {
  test("Test If Model Describes How Note Model Should Be Handled By The System", () => {
    const instance = new Note(
      NOTE_ID,
      NOTE_TITLE,
      NOTE_BODY,
      NOTE_CREATED_AT,
      NOTE_UPDATED_AT,
      USER_ID,
    );

    expect(instance.id).toEqual(NOTE_ID);
    expect(instance.title).toEqual(NOTE_TITLE);
    expect(instance.body).toEqual(NOTE_BODY);
    expect(instance.createdAt).toEqual(NOTE_CREATED_AT);
    expect(instance.updatedAt).toEqual(NOTE_UPDATED_AT);
    expect(instance.userId).toEqual(USER_ID);
  });
});
