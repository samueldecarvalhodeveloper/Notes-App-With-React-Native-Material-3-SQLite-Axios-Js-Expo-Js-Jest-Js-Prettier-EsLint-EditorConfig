import { describe, test, expect } from "@jest/globals";
import { fireEvent } from "@testing-library/react-native";
import ReactRenderingAdapter from "../../concerns/react_rendering_adapter";
import { NOTE_BODY, NOTE_TITLE } from "../../../constants/note_constants";
import NoteEditingSection from "../../../sections/note_editing_section/note_editing_section";

describe("Test Section NoteEditingSection", () => {
  test("Test If Section Dispatches Its Function On Note Data Change", () => {
    let currentUpdatedTitle: string;
    let currentUpdatedBody: string;
    const { getByDisplayValue } = ReactRenderingAdapter.render(
      <NoteEditingSection
        noteTitle={NOTE_TITLE}
        noteBody={NOTE_BODY}
        onNoteTitleChange={(updatedTitle) => {
          currentUpdatedTitle = updatedTitle;
        }}
        onNoteBodyChange={(updatedBody) => {
          currentUpdatedBody = updatedBody;
        }}
      />,
    );
    const noteTitleInputElement = getByDisplayValue(NOTE_TITLE);
    const noteBodyInputElement = getByDisplayValue(NOTE_BODY);

    fireEvent.changeText(noteTitleInputElement, "");
    fireEvent.changeText(noteBodyInputElement, "");

    expect(noteTitleInputElement).toBeEmptyElement();
    expect(noteBodyInputElement).toBeEmptyElement();

    expect(currentUpdatedTitle!).toEqual("");
    expect(currentUpdatedBody!).toEqual("");
  });
});
