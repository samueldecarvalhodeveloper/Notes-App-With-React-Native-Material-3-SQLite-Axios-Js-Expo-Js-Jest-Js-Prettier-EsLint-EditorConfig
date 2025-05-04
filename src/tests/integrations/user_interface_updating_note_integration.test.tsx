import { jest, describe, test, expect } from "@jest/globals";
import { fireEvent, waitFor } from "@testing-library/react-native";
import ReactRenderingAdapter from "../concerns/react_rendering_adapter";
import NoteEditingScreen from "../../screens/note_editing_screen/note_editing_screen";
import {
  NOTE_BODY,
  NOTE_ENTITY_WITH_WRONG_DATA_OBJECT,
  NOTE_ID,
  NOTE_MODEL_OBJECT,
  NOTE_TITLE,
} from "../../constants/note_constants";
import NoteRepository from "../../repositories/note_repository";
import {
  CONCLUDE_NOTE_BUTTON_TEST_ID,
  EDIT_NOTE_BUTTON_TEST_ID,
} from "../../constants/user_interface_constants";

jest.useFakeTimers();

describe("Test User Interface Updating Note Integration", () => {
  test("Test User Interface Updating Note", async () => {
    let isNoteUpdated = false;
    const { getByTestId, getByDisplayValue } = ReactRenderingAdapter.render(
      <NoteEditingScreen
        noteId={NOTE_ID}
        noteRepository={
          {
            getNote: async () => NOTE_MODEL_OBJECT,
            getUpdatedNote: async () => {
              isNoteUpdated = true;

              return NOTE_ENTITY_WITH_WRONG_DATA_OBJECT;
            },
          } as unknown as NoteRepository
        }
        onNoteEditingConclusion={() => {}}
      />,
    );

    await waitFor(() => fireEvent.press(getByTestId(EDIT_NOTE_BUTTON_TEST_ID)));

    const noteTitleTextInputElement = getByDisplayValue(NOTE_TITLE);
    const noteBodyTextInputElement = getByDisplayValue(NOTE_BODY);

    fireEvent.changeText(noteTitleTextInputElement, "");
    fireEvent.changeText(noteBodyTextInputElement, "");

    fireEvent.press(getByTestId(CONCLUDE_NOTE_BUTTON_TEST_ID));

    expect(isNoteUpdated).toBeTruthy();
  });
});
