import { jest, describe, test, expect } from "@jest/globals";
import { fireEvent, waitFor } from "@testing-library/react-native";
import ReactRenderingAdapter from "../../concerns/react_rendering_adapter";
import NoteEditingScreen from "../../../screens/note_editing_screen/note_editing_screen";
import {
  NOTE_BODY,
  NOTE_ENTITY_WITH_WRONG_DATA_OBJECT,
  NOTE_ID,
  NOTE_MODEL_OBJECT,
  NOTE_TITLE,
} from "../../../constants/note_constants";
import NoteRepository from "../../../repositories/note_repository";
import {
  BACK_BUTTON_TEST_ID,
  CONCLUDE_NOTE_BUTTON_TEST_ID,
  DELETE_NOTE_BUTTON_TEST_ID,
  EDIT_NOTE_BUTTON_TEST_ID,
  LOADING_SECTION_ACCESSIBILITY_HINT,
} from "../../../constants/user_interface_constants";

jest.useFakeTimers();

describe("Test Screen NoteEditingScreen", () => {
  test('Test If "onNoteEditingConclusion" Is Dispatched On Navigation Button Click', () => {
    let isBackButtonClicked = false;
    const { getByTestId } = ReactRenderingAdapter.render(
      <NoteEditingScreen
        noteId={NOTE_ID}
        noteRepository={
          {
            getNote: async () => NOTE_MODEL_OBJECT,
          } as unknown as NoteRepository
        }
        onNoteEditingConclusion={() => {
          isBackButtonClicked = true;
        }}
      />,
    );

    fireEvent.press(getByTestId(BACK_BUTTON_TEST_ID));

    expect(isBackButtonClicked).toBeTruthy();
  });

  test("Test If Conclude Note Button Updates Note", async () => {
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

  test('Test If Note Is Edited When "isNoteBeingManipulated" Is True On Edit Note Button Press', async () => {
    const { getByTestId, getByDisplayValue } = ReactRenderingAdapter.render(
      <NoteEditingScreen
        noteId={NOTE_ID}
        noteRepository={
          {
            getNote: async () => NOTE_MODEL_OBJECT,
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

    expect(noteTitleTextInputElement).toBeEmptyElement();
    expect(noteBodyTextInputElement).toBeEmptyElement();
  });

  test("Test If Delete Note Button Dispatches Note Delete Function On Press", async () => {
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

  test("Test If Note Visualization Is Shown When Not Data Is Loaded", async () => {
    const { getByText } = ReactRenderingAdapter.render(
      <NoteEditingScreen
        noteId={NOTE_ID}
        noteRepository={
          {
            getNote: async () => NOTE_MODEL_OBJECT,
          } as unknown as NoteRepository
        }
        onNoteEditingConclusion={() => {}}
      />,
    );

    await waitFor(() => {
      expect(getByText(NOTE_TITLE)).toBeTruthy();
      expect(getByText(NOTE_BODY)).toBeTruthy();
    });
  });

  test("Test If Loading Indicator Is Shown When Note Is Not Loaded", () => {
    const { getByA11yHint } = ReactRenderingAdapter.render(
      <NoteEditingScreen
        noteId={NOTE_ID}
        noteRepository={
          {
            getNote: async () => {
              throw new Error();
            },
          } as unknown as NoteRepository
        }
        onNoteEditingConclusion={() => {}}
      />,
    );

    expect(getByA11yHint(LOADING_SECTION_ACCESSIBILITY_HINT)).toBeTruthy();
  });
});
