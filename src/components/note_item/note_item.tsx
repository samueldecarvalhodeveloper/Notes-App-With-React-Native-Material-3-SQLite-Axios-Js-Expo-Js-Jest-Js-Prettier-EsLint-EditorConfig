import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";
import styles from "./styles";

function NoteItem(props: { title: string; body: string; onPress: () => void }) {
  const { title, body, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text
            style={[styles.title]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {title}
          </Text>
          <Text
            style={[styles.body]}
            numberOfLines={2}
            ellipsizeMode="tail">
            {body}
          </Text>
        </View>
        <Divider style={styles.divider} />
      </View>
    </TouchableOpacity>
  );
}

export default NoteItem;
