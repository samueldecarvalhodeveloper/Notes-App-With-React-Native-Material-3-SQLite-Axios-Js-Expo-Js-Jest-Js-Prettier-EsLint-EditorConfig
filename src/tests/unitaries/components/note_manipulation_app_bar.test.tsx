import { describe, test, expect } from "@jest/globals";
import { fireEvent } from "@testing-library/react-native";
import ReactRenderingAdapter from "../../concerns/react_rendering_adapter";
import NoteManipulationAppBar from "../../../components/note_manipulation_app_bar";
import {
  BACK_BUTTON_TEST_ID,
  CONCLUDE_NOTE_BUTTON_TEST_ID,
  DELETE_NOTE_BUTTON_TEST_ID,
  EDIT_NOTE_BUTTON_TEST_ID,
} from "../../../constants/user_interface_constants";

describe("Test Component GreetingAppBar", () => {
  test("Test If Back Button Dispatches Its Function On Press", () => {
    let isComponentClicked = false;

    const { getByTestId } = ReactRenderingAdapter.render(
      <NoteManipulationAppBar
        isConcludeNoteButtonAble={false}
        isDeleteNoteButtonAble={false}
        isManipulateNoteButtonAble={false}
        onNavigationIconButtonPress={() => {
          isComponentClicked = true;
        }}
        onConcludeNoteIconButtonPress={() => {}}
        onDeleteNoteIconButtonPress={() => {}}
        onEditNoteIconButtonPress={() => {}}
      />,
    );

    fireEvent.press(getByTestId(BACK_BUTTON_TEST_ID));

    expect(isComponentClicked).toBeTruthy();
  });

  test("Test If Conclude Note Button Is Rendered And Dispatches Its Function On Press", () => {
    let isComponentClicked = false;

    const { getByTestId } = ReactRenderingAdapter.render(
      <NoteManipulationAppBar
        isConcludeNoteButtonAble
        isDeleteNoteButtonAble={false}
        isManipulateNoteButtonAble={false}
        onNavigationIconButtonPress={() => {}}
        onConcludeNoteIconButtonPress={() => {
          isComponentClicked = true;
        }}
        onDeleteNoteIconButtonPress={() => {}}
        onEditNoteIconButtonPress={() => {}}
      />,
    );

    fireEvent.press(getByTestId(CONCLUDE_NOTE_BUTTON_TEST_ID));

    expect(isComponentClicked).toBeTruthy();
  });

  test("Test If Delete Note Button Is Rendered And Dispatches Its Function On Press", () => {
    let isComponentClicked = false;

    const { getByTestId } = ReactRenderingAdapter.render(
      <NoteManipulationAppBar
        isConcludeNoteButtonAble={false}
        isDeleteNoteButtonAble
        isManipulateNoteButtonAble={false}
        onNavigationIconButtonPress={() => {}}
        onConcludeNoteIconButtonPress={() => {}}
        onDeleteNoteIconButtonPress={() => {
          isComponentClicked = true;
        }}
        onEditNoteIconButtonPress={() => {}}
      />,
    );

    fireEvent.press(getByTestId(DELETE_NOTE_BUTTON_TEST_ID));

    expect(isComponentClicked).toBeTruthy();
  });

  test("Test If Edit Note Button Is Rendered And Dispatches Its Function On Press", () => {
    let isComponentClicked = false;

    const { getByTestId } = ReactRenderingAdapter.render(
      <NoteManipulationAppBar
        isConcludeNoteButtonAble={false}
        isDeleteNoteButtonAble={false}
        isManipulateNoteButtonAble
        onNavigationIconButtonPress={() => {}}
        onConcludeNoteIconButtonPress={() => {}}
        onDeleteNoteIconButtonPress={() => {}}
        onEditNoteIconButtonPress={() => {
          isComponentClicked = true;
        }}
      />,
    );

    fireEvent.press(getByTestId(EDIT_NOTE_BUTTON_TEST_ID));

    expect(isComponentClicked).toBeTruthy();
  });
});
