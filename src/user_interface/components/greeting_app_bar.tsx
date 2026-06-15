import { Appbar } from "react-native-paper";
import { PRIMARY_500, NEUTRALS_100 } from "../assets/colors/colors";

function GreetingAppBar(props: { userUsername: string }) {
  const { userUsername } = props;

  return (
    <Appbar.Header style={{ backgroundColor: PRIMARY_500 }}>
      <Appbar.Content
        title={`Hello, ${userUsername}`}
        titleStyle={{ color: NEUTRALS_100 }}
      />
    </Appbar.Header>
  );
}

export default GreetingAppBar;
