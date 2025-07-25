import { jest, describe, test, expect } from "@jest/globals";
import { waitFor } from "@testing-library/react-native";
import ReactRenderingAdapter from "../concerns/react_rendering_adapter";
import NoteEditingScreen from "../../screens/note_editing_screen/note_editing_screen";
import {
  NOTE_BODY,
  NOTE_ID,
  NOTE_MODEL_OBJECT,
  NOTE_TITLE,
} from "../../constants/note_constants";
import NoteRepository from "../../repositories/note_repository";

jest.useFakeTimers();

describe("Test User Interface Getting Note Integration", () => {
  test("Test User Interface Getting Note", async () => {
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
});
