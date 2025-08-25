import { describe, test, expect } from "@jest/globals";
import { act, renderHook } from "@testing-library/react-hooks";
import {
  NOTE_BODY,
  NOTE_CREATED_AT,
  NOTE_ID,
  NOTE_MODEL_OBJECT,
  NOTE_TITLE,
  NOTE_UPDATED_AT,
} from "../../../constants/note_constants";
import NoteRepository from "../../../repositories/note_repository";
import { USER_ID } from "../../../constants/user_constants";
import useNotesListing from "../../../hooks/use_notes_listing";

describe("Test Hook useNotesListing", () => {
  test("Test If List Of Notes Is Retrieved From Database On Hook Start", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useNotesListing(USER_ID, {
        fetchNotesFromService: async () => {},
        getNotes: async () => [NOTE_MODEL_OBJECT],
      } as unknown as NoteRepository),
    );

    await waitForNextUpdate();

    expect(result.current.isListOfNotesLoaded).toBeTruthy();

    expect(result.current.listOfNotes[0].id).toEqual(NOTE_ID);
    expect(result.current.listOfNotes[0].title).toEqual(NOTE_TITLE);
    expect(result.current.listOfNotes[0].body).toEqual(NOTE_BODY);
    expect(result.current.listOfNotes[0].createdAt).toEqual(NOTE_CREATED_AT);
    expect(result.current.listOfNotes[0].updatedAt).toEqual(NOTE_UPDATED_AT);
    expect(result.current.listOfNotes[0].userId).toEqual(USER_ID);
  });

  test('Test If Method "createNote" Creates Note On Database And On Service And Dispatches On Note Created Function', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useNotesListing(USER_ID, {
        fetchNotesFromService: async () => {},
        getNotes: async () => [NOTE_MODEL_OBJECT],
        getCreatedNote: async () => NOTE_MODEL_OBJECT,
      } as unknown as NoteRepository),
    );
    let createdNoteId: number;

    await waitForNextUpdate();

    await act(async () => {
      await result.current.createNote((noteId) => {
        createdNoteId = noteId;
      });
    });

    expect(createdNoteId!).toEqual(NOTE_ID);
  });

  test('Test If Method "createNote" Turns isNoteCreationCurrentlyAble True When Note Creating Is Not Successful', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useNotesListing(USER_ID, {
        fetchNotesFromService: async () => {},
        getNotes: async () => [NOTE_MODEL_OBJECT],
        getCreatedNote: async () => {
          throw new Error();
        },
      } as unknown as NoteRepository),
    );

    await waitForNextUpdate();

    await act(async () => {
      await result.current.createNote(() => {});
    });

    expect(result.current.isNoteCreationCurrentlyAble).toBeFalsy();
  });
});
