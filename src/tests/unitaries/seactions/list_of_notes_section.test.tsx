import { describe, test, expect } from "@jest/globals";
import { fireEvent } from "@testing-library/react-native";
import ReactRenderingAdapter from "../../concerns/react_rendering_adapter";
import {
  NOTE_ID,
  NOTE_MODEL_OBJECT,
  NOTE_TITLE,
} from "../../../constants/note_constants";
import ListOfNotesSection from "../../../sections/list_of_notes_section";

describe("Test Section ListOfNotesSection", () => {
  test("Test If Section Dispatches On Press Event", () => {
    let clickedNoteId: number;

    const { getByText } = ReactRenderingAdapter.render(
      <ListOfNotesSection
        listOfNotes={[NOTE_MODEL_OBJECT]}
        onNoteItemPress={(noteId) => {
          clickedNoteId = noteId;
        }}
      />,
    );

    fireEvent.press(getByText(NOTE_TITLE));

    expect(clickedNoteId!).toEqual(NOTE_ID);
  });
});
