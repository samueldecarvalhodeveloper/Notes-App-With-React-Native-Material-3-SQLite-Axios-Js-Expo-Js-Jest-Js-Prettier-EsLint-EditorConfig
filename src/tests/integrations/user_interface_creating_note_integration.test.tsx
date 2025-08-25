import { jest, describe, test, expect } from "@jest/globals";
import { fireEvent, waitFor } from "@testing-library/react-native";
import useUser from "../../hooks/use_user";
import { USER_MODEL_OBJECT } from "../../constants/user_constants";
import useNotesListing from "../../hooks/use_notes_listing";
import ReactRenderingAdapter from "../concerns/react_rendering_adapter";
import NotesListingScreen from "../../screens/notes_listing_screen/notes_listing_screen";
import UserRepository from "../../repositories/user_repository";
import NoteRepository from "../../repositories/note_repository";
import { CREATE_NOTE_FLOATING_ACTION_BUTTON_TEXT } from "../../constants/user_interface_constants";

jest.useFakeTimers();

jest.mock("../../hooks/use_user");
jest.mock("../../hooks/use_notes_listing");

describe("Test User Interface Creating Note Integration", () => {
  test("Test User Interface Creating Note", async () => {
    let isNoteCreated = false;

    (useUser as jest.Mock).mockReturnValue({
      user: USER_MODEL_OBJECT,
      isInternetErrorRisen: false,
      isUserUsernameInvalid: false,
      createUser: async () => {},
    });
    (useNotesListing as jest.Mock).mockReturnValue({
      listOfNotes: [],
      isListOfNotesLoaded: true,
      isNoteCreationCurrentlyAble: true,
      createNote: async () => {
        isNoteCreated = true;
      },
    });

    const { getByText } = ReactRenderingAdapter.render(
      <NotesListingScreen
        userRepository={{} as UserRepository}
        noteRepository={{} as NoteRepository}
        onNoteSelected={() => {}}
      />,
    );

    fireEvent.press(getByText(CREATE_NOTE_FLOATING_ACTION_BUTTON_TEXT));

    await waitFor(() => expect(isNoteCreated).toBeTruthy());
  });
});
