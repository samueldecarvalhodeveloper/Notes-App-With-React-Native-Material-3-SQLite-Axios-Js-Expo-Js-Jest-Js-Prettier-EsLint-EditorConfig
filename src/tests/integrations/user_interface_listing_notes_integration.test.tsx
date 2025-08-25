import { jest, describe, test, expect } from "@jest/globals";
import useUser from "../../hooks/use_user";
import { USER_MODEL_OBJECT } from "../../constants/user_constants";
import useNotesListing from "../../hooks/use_notes_listing";
import { NOTE_MODEL_OBJECT, NOTE_TITLE } from "../../constants/note_constants";
import ReactRenderingAdapter from "../concerns/react_rendering_adapter";
import NotesListingScreen from "../../screens/notes_listing_screen/notes_listing_screen";
import UserRepository from "../../repositories/user_repository";
import NoteRepository from "../../repositories/note_repository";

jest.useFakeTimers();

jest.mock("../../hooks/use_user");
jest.mock("../../hooks/use_notes_listing");

describe("Test User Interface Listing Notes Integration", () => {
  test("Test User Interface Listing Notes", async () => {
    (useUser as jest.Mock).mockReturnValue({
      user: USER_MODEL_OBJECT,
      isInternetErrorRisen: false,
      isUserUsernameInvalid: false,
      createUser: async () => {},
    });
    (useNotesListing as jest.Mock).mockReturnValue({
      listOfNotes: [NOTE_MODEL_OBJECT],
      isListOfNotesLoaded: true,
      isNoteCreationCurrentlyAble: true,
      createNote: async () => {},
    });

    const { getByText } = ReactRenderingAdapter.render(
      <NotesListingScreen
        userRepository={{} as UserRepository}
        noteRepository={{} as NoteRepository}
        onNoteSelected={() => {}}
      />,
    );

    expect(getByText(NOTE_TITLE)).toBeTruthy();
  });
});
