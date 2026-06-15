import { StyleSheet } from "react-native";
import { NEUTRALS_100, NEUTRALS_900 } from "../../assets/colors/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    lineHeight: 40,
    letterSpacing: 0,
    backgroundColor: NEUTRALS_100,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    color: NEUTRALS_900,
    fontWeight: 400,
    padding: 16,
    marginTop: 8,
    height: 72,
  },
  body: {
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0.5,
    backgroundColor: NEUTRALS_100,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    color: NEUTRALS_900,
    borderWidth: 0,
    borderColor: "rgba(0, 0, 0, 0)",
    fontWeight: 400,
    padding: 16,
    marginTop: 8,
    height: "100%",
  },
});

export default styles;
