/* eslint-disable no-unused-vars */

import { useCallback, useEffect, useMemo, useState } from "react";
import NoteRepository from "../repositories/note_repository";
import Note from "../infrastructure/models/note";

function useNotesListing(userId: number, noteRepository: NoteRepository) {
  const [listOfNotes, setListOfNotes] = useState<Array<Note>>([]);
  const [isListOfNotesLoaded, setIsListOfNotesLoaded] = useState(false);
  const [isNoteCreationCurrentlyAble, setIsNoteCreationCurrentlyAble] =
    useState(true);
  const createNote = useCallback(
    async (onNoteCreated: (noteId: number) => void) => {
      try {
        const createdNote = await noteRepository.getCreatedNote("", "", userId);

        onNoteCreated(createdNote.id);
      } catch (error) {
        setIsNoteCreationCurrentlyAble(false);
      }
    },
    [],
  );

  useEffect(() => {
    noteRepository
      .fetchNotesFromService(userId)
      .then(() => {
        noteRepository.getNotes().then((listOfNotesFromDatabase) => {
          setListOfNotes(listOfNotesFromDatabase);

          setIsListOfNotesLoaded(true);
        });
      })
      .catch(() => {});
  }, []);

  return useMemo(
    () => ({
      listOfNotes,
      isListOfNotesLoaded,
      isNoteCreationCurrentlyAble,
      createNote,
    }),
    [listOfNotes, isListOfNotesLoaded, isNoteCreationCurrentlyAble],
  );
}

export default useNotesListing;
