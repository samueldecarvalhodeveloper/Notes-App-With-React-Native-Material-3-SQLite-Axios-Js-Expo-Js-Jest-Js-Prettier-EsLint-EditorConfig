import { jest, describe, beforeAll, test, expect } from "@jest/globals";
import axios from "axios";
import { USER_ID } from "../../../../constants/user_constants";
import {
  NOTE_BODY,
  NOTE_CREATED_AT,
  NOTE_DATA_TRANSFER_OBJECT_OBJECT,
  NOTE_ID,
  NOTE_MODEL_OBJECT,
  NOTE_TITLE,
  NOTE_UPDATED_AT,
} from "../../../../constants/note_constants";
import NoteGateway from "../../../../data/remote_data/data_gateways/note_gateway";

jest.mock("axios");

describe("Test Class NoteGateway", () => {
  let noteGateway: NoteGateway;

  beforeAll(() => {
    noteGateway = new NoteGateway(axios);
  });

  test('Test If Method "getNotes" Returns List Of Notes From Service', async () => {
    (axios as jest.Mocked<typeof axios>).get.mockResolvedValueOnce({
      data: [],
    });

    const listOfNotesFromService = await noteGateway.getNotes(USER_ID);

    expect(listOfNotesFromService).toEqual([]);
  });

  test('Test If Method "getCreatedNote" Returns Created Note On Service', async () => {
    (axios as jest.Mocked<typeof axios>).post.mockResolvedValueOnce({
      data: NOTE_MODEL_OBJECT,
    });

    const createdNote = await noteGateway.getCreatedNote(
      USER_ID,
      NOTE_DATA_TRANSFER_OBJECT_OBJECT,
    );

    expect(createdNote.id).toEqual(NOTE_ID);
    expect(createdNote.title).toEqual(NOTE_TITLE);
    expect(createdNote.body).toEqual(NOTE_BODY);
    expect(createdNote.createdAt).toEqual(NOTE_CREATED_AT);
    expect(createdNote.updatedAt).toEqual(NOTE_UPDATED_AT);
    expect(createdNote.userId).toEqual(USER_ID);
  });

  test('Test If Method "getUpdatedNote" Returns Updated Note On Service', async () => {
    (axios as jest.Mocked<typeof axios>).patch.mockResolvedValueOnce({
      data: NOTE_MODEL_OBJECT,
    });

    const updatedNote = await noteGateway.getUpdatedNote(
      USER_ID,
      NOTE_ID,
      NOTE_DATA_TRANSFER_OBJECT_OBJECT,
    );

    expect(updatedNote.id).toEqual(NOTE_ID);
    expect(updatedNote.title).toEqual(NOTE_TITLE);
    expect(updatedNote.body).toEqual(NOTE_BODY);
    expect(updatedNote.createdAt).toEqual(NOTE_CREATED_AT);
    expect(updatedNote.updatedAt).toEqual(NOTE_UPDATED_AT);
    expect(updatedNote.userId).toEqual(USER_ID);
  });

  test('Test If Method "deleteNote" Deletes Note On Service', async () => {
    (axios as jest.Mocked<typeof axios>).delete.mockResolvedValueOnce({
      data: "",
    });

    await noteGateway.deleteNote(NOTE_ID, USER_ID);

    expect(axios.delete).toHaveBeenCalled();
  });
});
