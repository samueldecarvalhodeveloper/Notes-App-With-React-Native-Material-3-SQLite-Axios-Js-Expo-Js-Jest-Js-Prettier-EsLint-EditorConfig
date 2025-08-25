import { StyleSheet } from "react-native";
import {
  NEUTRALS_100,
  PRIMARY_500,
  SECONDARY_500,
} from "../../assets/colors/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PRIMARY_500,
    padding: 24,
  },
  textInput: { backgroundColor: NEUTRALS_100 },
  card: {
    padding: 24,
    width: "100%",
    maxWidth: 400,
    backgroundColor: NEUTRALS_100,
    borderRadius: 12,
    elevation: 6,
  },
  button: {
    marginTop: 16,
    backgroundColor: SECONDARY_500,
  },
});

export default styles;
