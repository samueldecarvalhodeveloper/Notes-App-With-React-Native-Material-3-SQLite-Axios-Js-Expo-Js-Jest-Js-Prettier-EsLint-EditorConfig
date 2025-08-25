import { Text, View } from "react-native";
import styles from "./styles";

function NoNotesSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No notes</Text>
    </View>
  );
}

export default NoNotesSection;
