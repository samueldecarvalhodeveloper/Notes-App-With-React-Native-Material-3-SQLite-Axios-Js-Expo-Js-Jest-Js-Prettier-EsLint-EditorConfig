/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import NoteRepository from "../repositories/note_repository";
import Note from "../infrastructure/models/note";

function useNotesListing(userId: number, noteRepository: NoteRepository) {
  const [listOfNotes, setListOfNotes] = useState<Array<Note>>([]);
  const [isListOfNotesLoaded, setIsListOfNotesLoaded] = useState(false);
  const [isNoteCreationCurrentlyAble, setIsNoteCreationCurrentlyAble] =
    useState(true);

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

  return {
    listOfNotes,
    isListOfNotesLoaded,
    isNoteCreationCurrentlyAble,
    createNote: async (onNoteCreated: (noteId: number) => void) => {
      try {
        const createdNote = await noteRepository.getCreatedNote("", "", userId);

        onNoteCreated(createdNote.id);
      } catch (error) {
        setIsNoteCreationCurrentlyAble(false);
      }
    },
  };
}

export default useNotesListing;
