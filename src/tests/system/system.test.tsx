import { jest, describe, test, expect } from "@jest/globals";
import { fireEvent, waitFor } from "@testing-library/react-native";
import {
  USER_MODEL_OBJECT,
  USER_USERNAME,
} from "../../constants/user_constants";
import UserRepository from "../../repositories/user_repository";
import ReactRenderingAdapter from "../concerns/react_rendering_adapter";
import UserSignInScreen from "../../screens/user_sign_in_screen/user_sign_in_screen";
import {
  CONCLUDE_NOTE_BUTTON_TEST_ID,
  CREATE_NOTE_FLOATING_ACTION_BUTTON_TEXT,
  CREATE_USER_BUTTON_TEXT,
  DELETE_NOTE_BUTTON_TEST_ID,
  EDIT_NOTE_BUTTON_TEST_ID,
} from "../../constants/user_interface_constants";
import useUser from "../../hooks/use_user";
import useNotesListing from "../../hooks/use_notes_listing";
import {
  NOTE_BODY,
  NOTE_ENTITY_WITH_WRONG_DATA_OBJECT,
  NOTE_ID,
  NOTE_MODEL_OBJECT,
  NOTE_TITLE,
} from "../../constants/note_constants";
import NoteRepository from "../../repositories/note_repository";
import NotesListingScreen from "../../screens/notes_listing_screen/notes_listing_screen";
import NoteEditingScreen from "../../screens/note_editing_screen/note_editing_screen";

jest.useFakeTimers();

jest.mock("../../hooks/use_user");
jest.mock("../../hooks/use_notes_listing");

describe("Test System", () => {
  test("Test Creating User From User Interface", async () => {
    let isUserCreated = false;
    (useUser as jest.Mock).mockReturnValue({
      user: USER_MODEL_OBJECT,
      isInternetErrorRisen: false,
      isUserUsernameInvalid: false,
      createUser: async () => {
        isUserCreated = true;
      },
    });

    const { getByDisplayValue, getByText } = ReactRenderingAdapter.render(
      <UserSignInScreen
        onUserCreated={() => {}}
        userRepository={{} as UserRepository}
      />,
    );

    fireEvent.changeText(getByDisplayValue(""), USER_USERNAME);

    fireEvent.press(getByText(CREATE_USER_BUTTON_TEXT));

    await waitFor(() => expect(isUserCreated).toBeTruthy());
  });

  test("Test Listing Notes From User Interface", async () => {
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

  test("Test Getting Note From User Interface", async () => {
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

  test("Test Creating Note From User Interface", async () => {
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

  test("Test Getting Note From User Interface", async () => {
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

  test("Test Updating Note From User Interface", async () => {
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

  test("Test Deleting Note From User Interface", async () => {
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
});
