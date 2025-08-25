import { StyleSheet } from "react-native";
import { NEUTRALS_500, NEUTRALS_900 } from "../../assets/colors/colors";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    color: NEUTRALS_900,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    marginTop: 4,
    color: NEUTRALS_500,
  },
  divider: {
    height: 1,
    backgroundColor: NEUTRALS_500,
  },
});

export default styles;
