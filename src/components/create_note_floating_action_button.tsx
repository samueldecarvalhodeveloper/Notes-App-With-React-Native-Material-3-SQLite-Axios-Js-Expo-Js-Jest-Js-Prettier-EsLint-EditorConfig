import React from "react";
import { FAB } from "react-native-paper";
import { SECONDARY_500, SECONDARY_900 } from "../assets/colors/colors";
import { CREATE_NOTE_FLOATING_ACTION_BUTTON_TEXT } from "../constants/user_interface_constants";

function CreateNoteFloatingActionButton(props: {
  onNoteCreated: () => Promise<void>;
}) {
  const { onNoteCreated } = props;

  return (
    <FAB
      color={SECONDARY_900}
      background={{ color: SECONDARY_500 }}
      icon="plus"
      label="Create note"
      onPress={async () => {
        await onNoteCreated();
      }}
      accessibilityLabel={CREATE_NOTE_FLOATING_ACTION_BUTTON_TEXT}
    />
  );
}

export default CreateNoteFloatingActionButton;
