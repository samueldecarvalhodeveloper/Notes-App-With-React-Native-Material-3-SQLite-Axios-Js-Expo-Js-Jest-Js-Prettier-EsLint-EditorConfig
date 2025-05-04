import { describe, test, expect } from "@jest/globals";
import { fireEvent } from "@testing-library/react-native";
import ReactRenderingAdapter from "../../concerns/react_rendering_adapter";
import CreateNoteFloatingActionButton from "../../../components/create_note_floating_action_button";
import { CREATE_NOTE_FLOATING_ACTION_BUTTON_TEXT } from "../../../constants/user_interface_constants";

describe("Test Component CreateNoteFloatingActionButton", () => {
  test("Test If Component Dispatches On Press Event", () => {
    let isComponentClicked = false;

    const { getByText } = ReactRenderingAdapter.render(
      <CreateNoteFloatingActionButton
        onNoteCreated={async () => {
          isComponentClicked = true;
        }}
      />,
    );

    fireEvent.press(getByText(CREATE_NOTE_FLOATING_ACTION_BUTTON_TEXT));

    expect(isComponentClicked).toBeTruthy();
  });
});
