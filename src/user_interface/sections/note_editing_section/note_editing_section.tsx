/* eslint-disable no-unused-vars */

import { TextInput, View } from "react-native";
import { NEUTRALS_300 } from "../../assets/colors/colors";
import styles from "./styles";

function NoteEditingSection(props: {
  noteTitle: string;
  noteBody: string;
  isNoteBeingManipulated: boolean;
  onNoteTitleChange: (updatedTitle: string) => void;
  onNoteBodyChange: (updatedBody: string) => void;
}) {
  const {
    noteTitle,
    noteBody,
    isNoteBeingManipulated,
    onNoteTitleChange,
    onNoteBodyChange,
  } = props;

  return (
    <View style={styles.container}>
      <TextInput
        value={noteTitle}
        style={styles.title}
        placeholder="Title"
        placeholderTextColor={NEUTRALS_300}
        editable={isNoteBeingManipulated}
        onChangeText={onNoteTitleChange}
      />
      <TextInput
        value={noteBody}
        multiline
        style={styles.body}
        placeholder="Body"
        placeholderTextColor={NEUTRALS_300}
        editable={isNoteBeingManipulated}
        onChangeText={onNoteBodyChange}
      />
    </View>
  );
}

export default NoteEditingSection;
