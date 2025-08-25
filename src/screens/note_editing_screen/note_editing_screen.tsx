import { StatusBar } from "expo-status-bar";
import { PaperProvider, Surface } from "react-native-paper";
import styles from "./styles";
import NoteRepository from "../../repositories/note_repository";
import useNoteEditing from "../../hooks/use_note_editing";
import NoteManipulationAppBar from "../../components/note_manipulation_app_bar";
import NoteEditingSection from "../../sections/note_editing_section/note_editing_section";
import NoteVisualizingSection from "../../sections/note_visualizing_section/note_visualizing_section";
import LoadingSection from "../../sections/loading_section/loading_section";
import Note from "../../infrastructure/models/note";

function NoteEditingScreen(props: {
  noteId: number;
  noteRepository: NoteRepository;
  onNoteEditingConclusion: () => void;
}) {
  const { noteId, noteRepository, onNoteEditingConclusion } = props;
  const {
    note,
    isNoteLoaded,
    isNoteBeingManipulated,
    isNoteManipulationAble,
    noteTitleBeingManipulated,
    noteBodyBeingManipulated,
    setNoteTitleBeingManipulated,
    setNoteBodyBeingManipulated,
    manipulateNote,
    concludeNote,
    deleteNote,
  } = useNoteEditing(noteId, noteRepository);

  return (
    <PaperProvider>
      <Surface style={styles.container}>
        <StatusBar style="auto" />
        <NoteManipulationAppBar
          isManipulateNoteButtonAble={
            isNoteManipulationAble && isNoteLoaded && !isNoteBeingManipulated
          }
          isConcludeNoteButtonAble={
            isNoteManipulationAble && isNoteLoaded && isNoteBeingManipulated
          }
          isDeleteNoteButtonAble={isNoteManipulationAble && isNoteLoaded}
          onNavigationIconButtonPress={() => {
            onNoteEditingConclusion();
          }}
          onConcludeNoteIconButtonPress={() => {
            concludeNote();
          }}
          onEditNoteIconButtonPress={() => {
            manipulateNote();
          }}
          onDeleteNoteIconButtonPress={() => {
            deleteNote(onNoteEditingConclusion);
          }}
        />
        {isNoteLoaded ? (
          isNoteBeingManipulated ? (
            <NoteEditingSection
              noteTitle={noteTitleBeingManipulated}
              noteBody={noteBodyBeingManipulated}
              onNoteTitleChange={(text) => {
                setNoteTitleBeingManipulated(text);
              }}
              onNoteBodyChange={(text) => {
                setNoteBodyBeingManipulated(text);
              }}
            />
          ) : (
            <NoteVisualizingSection note={note as Note} />
          )
        ) : (
          <LoadingSection />
        )}
      </Surface>
    </PaperProvider>
  );
}

export default NoteEditingScreen;
