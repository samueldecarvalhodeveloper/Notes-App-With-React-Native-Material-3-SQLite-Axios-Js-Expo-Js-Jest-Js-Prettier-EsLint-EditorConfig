import React from "react";
import { Appbar } from "react-native-paper";
import { PRIMARY_500, NEUTRALS_100 } from "../assets/colors/colors";

function NoteManipulationAppBar(props: {
  isManipulateNoteButtonAble: boolean;
  isConcludeNoteButtonAble: boolean;
  isDeleteNoteButtonAble: boolean;
  onNavigationIconButtonPress: () => void;
  onConcludeNoteIconButtonPress: () => void;
  onEditNoteIconButtonPress: () => void;
  onDeleteNoteIconButtonPress: () => void;
}) {
  const {
    isManipulateNoteButtonAble,
    isConcludeNoteButtonAble,
    isDeleteNoteButtonAble,
    onNavigationIconButtonPress,
    onConcludeNoteIconButtonPress,
    onEditNoteIconButtonPress,
    onDeleteNoteIconButtonPress,
  } = props;

  return (
    <Appbar.Header style={{ backgroundColor: PRIMARY_500 }}>
      <Appbar.BackAction
        testID="backbuttontestid"
        onPress={onNavigationIconButtonPress}
        color={NEUTRALS_100}
      />
      <Appbar.Content title="" />
      {isConcludeNoteButtonAble && (
        <Appbar.Action
          icon="check"
          testID="concludenotebuttontestid"
          onPress={onConcludeNoteIconButtonPress}
          color={NEUTRALS_100}
        />
      )}
      {isManipulateNoteButtonAble && (
        <Appbar.Action
          icon="pencil"
          testID="editnotebuttontestid"
          onPress={onEditNoteIconButtonPress}
          color={NEUTRALS_100}
        />
      )}
      {isDeleteNoteButtonAble && (
        <Appbar.Action
          icon="delete"
          testID="deletenotebuttontestid"
          onPress={onDeleteNoteIconButtonPress}
          color={NEUTRALS_100}
        />
      )}
    </Appbar.Header>
  );
}

export default NoteManipulationAppBar;
