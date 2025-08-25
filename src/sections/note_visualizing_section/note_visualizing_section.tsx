import { ScrollView, Text, View } from "react-native";
import styles from "./styles";
import Note from "../../infrastructure/models/note";

function NoteVisualizingSection(props: { note: Note }) {
  const { note } = props;

  return (
    <View style={styles.container}>
      <View>
        <ScrollView horizontal>
          <Text
            numberOfLines={1}
            style={styles.title}>
            {note.title}
          </Text>
        </ScrollView>
      </View>
      <ScrollView>
        <Text style={styles.body}>{note.body}</Text>
      </ScrollView>
    </View>
  );
}

export default NoteVisualizingSection;
