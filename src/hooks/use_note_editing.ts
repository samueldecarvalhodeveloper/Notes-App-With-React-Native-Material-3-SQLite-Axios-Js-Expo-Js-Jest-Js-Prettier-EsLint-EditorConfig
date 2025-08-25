import { useCallback, useEffect, useMemo, useState } from "react";
import NoteRepository from "../repositories/note_repository";
import Note from "../infrastructure/models/note";

function useNoteEditing(noteId: number, noteRepository: NoteRepository) {
  const [note, setNote] = useState<Note | null>(null);
  const [isNoteManipulationAble, setIsNoteManipulationAble] = useState(true);
  const [isNoteLoaded, setIsNoteLoaded] = useState(false);
  const [isNoteBeingManipulated, setIsNoteBeingManipulated] = useState(false);
  const [noteTitleBeingManipulated, setNoteTitleBeingManipulated] =
    useState("");
  const [noteBodyBeingManipulated, setNoteBodyBeingManipulated] = useState("");
  const manipulateNote = useCallback(() => {
    setIsNoteBeingManipulated(true);
  }, []);
  const concludeNote = useCallback(async () => {
    try {
      const updatedNoteOnService = await noteRepository.getUpdatedNote(
        note!.id,
        noteTitleBeingManipulated,
        noteBodyBeingManipulated,
        note!.userId,
      );

      setNote(updatedNoteOnService);

      setIsNoteBeingManipulated(false);
    } catch (error) {
      setIsNoteManipulationAble(false);

      setIsNoteBeingManipulated(false);
    }
  }, [note, noteTitleBeingManipulated, noteBodyBeingManipulated]);
  const deleteNote = useCallback(
    async (onNoteDeleted: () => void) => {
      try {
        await noteRepository.deleteNote(note!.id, note!.userId);

        onNoteDeleted();
      } catch (error) {
        setIsNoteManipulationAble(false);

        setIsNoteBeingManipulated(false);
      }
    },
    [note],
  );

  useEffect(() => {
    noteRepository
      .getNote(noteId)
      .then((noteFromDatabase) => {
        setNoteTitleBeingManipulated(noteFromDatabase.title);
        setNoteBodyBeingManipulated(noteFromDatabase.body);

        setNote(noteFromDatabase);

        setIsNoteLoaded(true);
      })
      .catch(() => {});
  }, []);

  return useMemo(
    () => ({
      note,
      isNoteManipulationAble,
      isNoteLoaded,
      isNoteBeingManipulated,
      noteTitleBeingManipulated,
      noteBodyBeingManipulated,
      setNoteTitleBeingManipulated,
      setNoteBodyBeingManipulated,
      manipulateNote,
      concludeNote,
      deleteNote,
    }),
    [
      note,
      isNoteManipulationAble,
      isNoteLoaded,
      isNoteBeingManipulated,
      noteTitleBeingManipulated,
      noteBodyBeingManipulated,
    ],
  );
}

export default useNoteEditing;
