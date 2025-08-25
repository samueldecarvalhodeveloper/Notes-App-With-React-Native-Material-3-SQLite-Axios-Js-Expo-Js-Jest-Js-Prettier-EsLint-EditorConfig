import { jest, describe, test, expect } from "@jest/globals";
import { fireEvent, waitFor } from "@testing-library/react-native";
import ReactRenderingAdapter from "../../concerns/react_rendering_adapter";
import NotesListingScreen from "../../../screens/notes_listing_screen/notes_listing_screen";
import {
  CREATE_NOTE_FLOATING_ACTION_BUTTON_TEXT,
  LOADING_SECTION_ACCESSIBILITY_HINT,
  NO_NOTES_LABEL_TEXT,
  TOP_BAR_GREETING_TITLE_TEXT,
} from "../../../constants/user_interface_constants";
import NoteRepository from "../../../repositories/note_repository";
import UserRepository from "../../../repositories/user_repository";
import {
  USER_MODEL_OBJECT,
  USER_USERNAME,
} from "../../../constants/user_constants";
import useUser from "../../../hooks/use_user";
import useNotesListing from "../../../hooks/use_notes_listing";
import {
  NOTE_MODEL_OBJECT,
  NOTE_TITLE,
} from "../../../constants/note_constants";

jest.useFakeTimers();

jest.mock("../../../hooks/use_user");
jest.mock("../../../hooks/use_notes_listing");

describe("Test Screen NotesListingScreen", () => {
  test("Test If Greeting Is Shown With User's Username On App Bar", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: USER_MODEL_OBJECT,
      isInternetErrorRisen: false,
      isUserUsernameInvalid: false,
      createUser: async () => {},
    });
    (useNotesListing as jest.Mock).mockReturnValue({
      listOfNotes: [],
      isListOfNotesLoaded: false,
      isNoteCreationCurrentlyAble: false,
      createNote: async () => {},
    });

    const { getByText } = ReactRenderingAdapter.render(
      <NotesListingScreen
        userRepository={{} as UserRepository}
        noteRepository={{} as NoteRepository}
        onNoteSelected={() => {}}
      />,
    );

    expect(getByText(TOP_BAR_GREETING_TITLE_TEXT(USER_USERNAME))).toBeTruthy();
  });

  test("Test If Loading Indicator Is Shown When Notes Haven't Loaded", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: USER_MODEL_OBJECT,
      isInternetErrorRisen: false,
      isUserUsernameInvalid: false,
      createUser: async () => {},
    });
    (useNotesListing as jest.Mock).mockReturnValue({
      listOfNotes: [],
      isListOfNotesLoaded: false,
      isNoteCreationCurrentlyAble: false,
      createNote: async () => {},
    });

    const { getByA11yHint } = ReactRenderingAdapter.render(
      <NotesListingScreen
        userRepository={{} as UserRepository}
        noteRepository={{} as NoteRepository}
        onNoteSelected={() => {}}
      />,
    );

    expect(getByA11yHint(LOADING_SECTION_ACCESSIBILITY_HINT)).toBeTruthy();
  });

  test("Test If No Notes Section Is Displayed If List Of Notes Is Empty", () => {
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
      createNote: async () => {},
    });

    const { getByText } = ReactRenderingAdapter.render(
      <NotesListingScreen
        userRepository={{} as UserRepository}
        noteRepository={{} as NoteRepository}
        onNoteSelected={() => {}}
      />,
    );

    expect(getByText(NO_NOTES_LABEL_TEXT)).toBeTruthy();
  });

  test("Test If Note Is Created On Floating Action Button Press", async () => {
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

  test("Test If List Of Notes Is Displayed And Note Is Selected On Note Item Press", async () => {
    let isNoteSelected = false;

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
        onNoteSelected={() => {
          isNoteSelected = true;
        }}
      />,
    );

    fireEvent.press(getByText(NOTE_TITLE));

    expect(isNoteSelected).toBeTruthy();
  });
});
