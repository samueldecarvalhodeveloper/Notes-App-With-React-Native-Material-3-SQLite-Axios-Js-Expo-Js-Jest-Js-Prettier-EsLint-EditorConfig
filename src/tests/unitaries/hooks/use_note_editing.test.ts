import { describe, test, expect } from "@jest/globals";
import { act, renderHook } from "@testing-library/react-hooks";
import useNoteEditing from "../../../hooks/use_note_editing";
import {
  NOTE_BODY,
  NOTE_CREATED_AT,
  NOTE_ENTITY_WITH_WRONG_DATA_OBJECT,
  NOTE_ID,
  NOTE_MODEL_OBJECT,
  NOTE_TITLE,
  NOTE_UPDATED_AT,
} from "../../../constants/note_constants";
import NoteRepository from "../../../repositories/note_repository";
import { USER_ID } from "../../../constants/user_constants";

describe("Test Hook useNoteEditing", () => {
  test("Test If Note Is Retrieved From Database On Hook Start", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useNoteEditing(NOTE_ID, {
        getNote: async () => NOTE_MODEL_OBJECT,
      } as unknown as NoteRepository),
    );

    await waitForNextUpdate();

    expect(result.current.isNoteLoaded).toBeTruthy();

    expect(result.current.noteTitleBeingManipulated).toEqual(NOTE_TITLE);
    expect(result.current.noteBodyBeingManipulated).toEqual(NOTE_BODY);

    expect(result.current.note!.id).toEqual(NOTE_ID);
    expect(result.current.note!.title).toEqual(NOTE_TITLE);
    expect(result.current.note!.body).toEqual(NOTE_BODY);
    expect(result.current.note!.createdAt).toEqual(NOTE_CREATED_AT);
    expect(result.current.note!.updatedAt).toEqual(NOTE_UPDATED_AT);
    expect(result.current.note!.userId).toEqual(USER_ID);
  });

  test('Test If Method "manipulateNote" Turns "isNoteBeingManipulated" To True', async () => {
    const noteRepository = {
      getNote: async () => NOTE_MODEL_OBJECT,
    } as unknown as NoteRepository;
    const { result, waitForNextUpdate } = renderHook(() =>
      useNoteEditing(NOTE_ID, noteRepository),
    );

    await waitForNextUpdate();

    act(() => {
      result.current.manipulateNote();
    });

    expect(result.current.isNoteBeingManipulated).toBeTruthy();
  });

  test('Test If Method "concludeNote" Updates Note And Turns "isNoteBeingManipulated" To False', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useNoteEditing(NOTE_ID, {
        getNote: async () => NOTE_ENTITY_WITH_WRONG_DATA_OBJECT,
        getUpdatedNote: async () => NOTE_MODEL_OBJECT,
      } as unknown as NoteRepository),
    );

    await waitForNextUpdate();

    await act(async () => {
      result.current.setNoteTitleBeingManipulated(NOTE_TITLE);
      result.current.setNoteBodyBeingManipulated(NOTE_BODY);

      await result.current.concludeNote();
    });

    expect(result.current.note!.id).toEqual(NOTE_ID);
    expect(result.current.note!.title).toEqual(NOTE_TITLE);
    expect(result.current.note!.body).toEqual(NOTE_BODY);
    expect(result.current.note!.createdAt).toEqual(NOTE_CREATED_AT);
    expect(result.current.note!.updatedAt).toEqual(NOTE_UPDATED_AT);
    expect(result.current.note!.userId).toEqual(USER_ID);
  });
});
