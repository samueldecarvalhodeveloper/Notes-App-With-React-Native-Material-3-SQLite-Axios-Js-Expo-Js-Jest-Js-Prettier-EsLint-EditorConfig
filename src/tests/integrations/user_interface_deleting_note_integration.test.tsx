import { jest, describe, test, expect } from "@jest/globals";
import { fireEvent, waitFor } from "@testing-library/react-native";
import ReactRenderingAdapter from "../concerns/react_rendering_adapter";
import NoteEditingScreen from "../../screens/note_editing_screen/note_editing_screen";
import { NOTE_ID, NOTE_MODEL_OBJECT } from "../../constants/note_constants";
import NoteRepository from "../../repositories/note_repository";
import { DELETE_NOTE_BUTTON_TEST_ID } from "../../constants/user_interface_constants";

jest.useFakeTimers();

describe("Test User Interface Deleting Note Integration", () => {
  test("Test User Interface Deleting Note", async () => {
    let isNoteDeleted = false;
    const { getByTestId } = ReactRenderingAdapter.render(
      <NoteEditingScreen
        noteId={NOTE_ID}
        noteRepository={
          {
            getNote: async () => NOTE_MODEL_OBJECT,
            deleteNote: async () => {
              isNoteDeleted = true;
            },
          } as unknown as NoteRepository
        }
        onNoteEditingConclusion={() => {}}
      />,
    );

    await waitFor(() =>
      fireEvent.press(getByTestId(DELETE_NOTE_BUTTON_TEST_ID)),
    );

    expect(isNoteDeleted).toBeTruthy();
  });
});
