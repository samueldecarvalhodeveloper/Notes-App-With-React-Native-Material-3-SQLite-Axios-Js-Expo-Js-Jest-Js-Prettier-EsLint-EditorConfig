import { jest, describe, beforeAll, test, expect } from "@jest/globals";
import axios from "axios";
import { USER_ID } from "../../../constants/user_constants";
import NoteGateway from "../../../data_gateways/note_gateway";
import {
  NOTE_BODY,
  NOTE_CREATED_AT,
  NOTE_DATA_TRANSFER_OBJECT_OBJECT,
  NOTE_ID,
  NOTE_MODEL_OBJECT,
  NOTE_TITLE,
  NOTE_UPDATED_AT,
} from "../../../constants/note_constants";

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

  test('Test If Method "getCreatedNoteOnService" Returns Created Note On Service', async () => {
    (axios as jest.Mocked<typeof axios>).post.mockResolvedValueOnce({
      data: NOTE_MODEL_OBJECT,
    });

    const createdNoteOnService = await noteGateway.getCreatedNoteOnService(
      USER_ID,
      NOTE_DATA_TRANSFER_OBJECT_OBJECT,
    );

    expect(createdNoteOnService.id).toEqual(NOTE_ID);
    expect(createdNoteOnService.title).toEqual(NOTE_TITLE);
    expect(createdNoteOnService.body).toEqual(NOTE_BODY);
    expect(createdNoteOnService.createdAt).toEqual(NOTE_CREATED_AT);
    expect(createdNoteOnService.updatedAt).toEqual(NOTE_UPDATED_AT);
    expect(createdNoteOnService.userId).toEqual(USER_ID);
  });

  test('Test If Method "getUpdatedNoteOnService" Returns Updated Note On Service', async () => {
    (axios as jest.Mocked<typeof axios>).patch.mockResolvedValueOnce({
      data: NOTE_MODEL_OBJECT,
    });

    const updatedNoteOnService = await noteGateway.getUpdatedNoteOnService(
      USER_ID,
      NOTE_ID,
      NOTE_DATA_TRANSFER_OBJECT_OBJECT,
    );

    expect(updatedNoteOnService.id).toEqual(NOTE_ID);
    expect(updatedNoteOnService.title).toEqual(NOTE_TITLE);
    expect(updatedNoteOnService.body).toEqual(NOTE_BODY);
    expect(updatedNoteOnService.createdAt).toEqual(NOTE_CREATED_AT);
    expect(updatedNoteOnService.updatedAt).toEqual(NOTE_UPDATED_AT);
    expect(updatedNoteOnService.userId).toEqual(USER_ID);
  });

  test('Test If Method "deleteNote" Deletes Note On Service', async () => {
    (axios as jest.Mocked<typeof axios>).delete.mockResolvedValueOnce({
      data: "",
    });

    await noteGateway.deleteNote(NOTE_ID, USER_ID);

    expect(axios.delete).toHaveBeenCalled();
  });
});
