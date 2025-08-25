/* eslint-disable no-unused-vars */

import { StatusBar } from "expo-status-bar";
import { PaperProvider, Surface } from "react-native-paper";
import styles from "./styles";
import NoteRepository from "../../repositories/note_repository";
import LoadingSection from "../../sections/loading_section/loading_section";
import UserRepository from "../../repositories/user_repository";
import useUser from "../../hooks/use_user";
import useNotesListing from "../../hooks/use_notes_listing";
import ListOfNotesSection from "../../sections/list_of_notes_section";
import NoNotesSection from "../../sections/no_notes_section/no_notes_section";
import GreetingAppBar from "../../components/greeting_app_bar";
import CreateNoteFloatingActionButton from "../../components/create_note_floating_action_button";

function NotesListingScreen(props: {
  userRepository: UserRepository;
  noteRepository: NoteRepository;
  onNoteSelected: (noteId: number) => void;
}) {
  const { userRepository, noteRepository, onNoteSelected } = props;
  const { user } = useUser(userRepository, () => {});
  const {
    listOfNotes,
    isListOfNotesLoaded,
    isNoteCreationCurrentlyAble,
    createNote,
  } = useNotesListing(user!.id, noteRepository);

  return (
    <PaperProvider>
      <Surface style={styles.container}>
        <StatusBar style="auto" />
        <GreetingAppBar userUsername={user!.username} />
        {isNoteCreationCurrentlyAble && isListOfNotesLoaded && (
          <CreateNoteFloatingActionButton
            onNoteCreated={async () => {
              await createNote((noteId) => {
                onNoteSelected(noteId);
              });
            }}
          />
        )}
        {isListOfNotesLoaded ? (
          listOfNotes.length ? (
            <ListOfNotesSection
              listOfNotes={listOfNotes}
              onNoteItemPress={(noteId) => {
                onNoteSelected(noteId);
              }}
            />
          ) : (
            <NoNotesSection />
          )
        ) : (
          <LoadingSection />
        )}
      </Surface>
    </PaperProvider>
  );
}

export default NotesListingScreen;
