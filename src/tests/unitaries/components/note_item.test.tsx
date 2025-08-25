import { describe, test, expect } from "@jest/globals";
import { fireEvent } from "@testing-library/react-native";
import ReactRenderingAdapter from "../../concerns/react_rendering_adapter";
import NoteItem from "../../../components/note_item/note_item";
import { NOTE_BODY, NOTE_TITLE } from "../../../constants/note_constants";

describe("Test Component NoteItem", () => {
  test("Test If Component Dispatches On Press Event", () => {
    let isComponentClicked = false;

    const { getByText } = ReactRenderingAdapter.render(
      <NoteItem
        body={NOTE_BODY}
        title={NOTE_TITLE}
        onPress={() => {
          isComponentClicked = true;
        }}
      />,
    );

    fireEvent.press(getByText(NOTE_TITLE));

    expect(isComponentClicked).toBeTruthy();
  });
});
