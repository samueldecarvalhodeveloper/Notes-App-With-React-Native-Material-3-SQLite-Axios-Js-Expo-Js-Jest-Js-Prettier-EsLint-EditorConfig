import { describe, test, expect } from "@jest/globals";
import NoteDataTransferObject from "../../../../infrastructure/data_transfer_objects/note_data_transfer_object";
import { NOTE_BODY, NOTE_TITLE } from "../../../../constants/note_constants";

describe("Test Data Transfer Object Note", () => {
  test("Test If Data Transfer Object Describes How Note Data Transfer Object Should Be Handled By The System", () => {
    const instance = new NoteDataTransferObject(NOTE_TITLE, NOTE_BODY);

    expect(instance.title).toEqual(NOTE_TITLE);
    expect(instance.body).toEqual(NOTE_BODY);
  });
});
