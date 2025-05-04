/* eslint-disable no-unused-vars */

import React from "react";
import { FlatList } from "react-native";
import NoteItem from "../components/note_item/note_item";
import Note from "../infrastructure/models/note";

function ListOfNotesSection(props: {
  listOfNotes: Array<Note>;
  onNoteItemPress: (noteId: number) => void;
}) {
  const { listOfNotes, onNoteItemPress } = props;

  return (
    <FlatList
      data={listOfNotes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <NoteItem
          title={item.title}
          body={item.body}
          onPress={() => onNoteItemPress(item.id)}
        />
      )}
    />
  );
}

export default ListOfNotesSection;
