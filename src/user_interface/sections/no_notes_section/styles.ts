import { StyleSheet } from "react-native";
import { NEUTRALS_300 } from "../../assets/colors/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: NEUTRALS_300,
    fontSize: 14,
  },
});

export default styles;
