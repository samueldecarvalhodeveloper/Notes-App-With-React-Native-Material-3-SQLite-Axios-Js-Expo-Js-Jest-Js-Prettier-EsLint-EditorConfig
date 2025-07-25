import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { PRIMARY_500 } from "../../assets/colors/colors";
import styles from "./styles";
import { LOADING_SECTION_ACCESSIBILITY_HINT } from "../../constants/user_interface_constants";

function LoadingSection() {
  return (
    <View
      accessibilityHint={LOADING_SECTION_ACCESSIBILITY_HINT}
      style={styles.container}>
      <ActivityIndicator color={PRIMARY_500} />
    </View>
  );
}

export default LoadingSection;
