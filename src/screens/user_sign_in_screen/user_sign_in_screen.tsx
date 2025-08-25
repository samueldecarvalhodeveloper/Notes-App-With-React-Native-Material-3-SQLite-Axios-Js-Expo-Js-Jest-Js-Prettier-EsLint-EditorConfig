import { StatusBar } from "expo-status-bar";
import {
  Button,
  Card,
  HelperText,
  PaperProvider,
  Surface,
  TextInput,
} from "react-native-paper";
import { useEffect, useState } from "react";
import useUser from "../../hooks/use_user";
import UserRepository from "../../repositories/user_repository";
import styles from "./styles";
import {
  NOT_AVAILABLE_INTERNET_ERROR_MESSAGE,
  NOT_VALID_USERNAME_ERROR_MESSAGE,
} from "../../constants/user_interface_constants";
import { PRIMARY_500, SECONDARY_900 } from "../../assets/colors/colors";

function UserSignInScreen(props: {
  userRepository: UserRepository;
  onUserCreated: () => void;
}) {
  const { userRepository, onUserCreated } = props;
  const { isInternetErrorRisen, isUserUsernameInvalid, createUser } = useUser(
    userRepository,
    onUserCreated,
  );
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isUserUsernameInvalid) {
      setErrorMessage(NOT_VALID_USERNAME_ERROR_MESSAGE);
    }

    if (isInternetErrorRisen) {
      setErrorMessage(NOT_AVAILABLE_INTERNET_ERROR_MESSAGE);
    }
  }, [isInternetErrorRisen, isUserUsernameInvalid]);

  return (
    <PaperProvider>
      <Surface style={styles.container}>
        <StatusBar style="auto" />
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              style={styles.textInput}
              outlineColor={PRIMARY_500}
              label="Username"
              value={username}
              mode="outlined"
              error={isUserUsernameInvalid || isInternetErrorRisen}
              onChangeText={(text) => {
                setUsername(text);
              }}
            />
            <HelperText
              type="error"
              visible={isUserUsernameInvalid || isInternetErrorRisen}>
              {errorMessage}
            </HelperText>
            <Button
              mode="contained"
              textColor={SECONDARY_900}
              style={styles.button}
              onPress={async () => {
                await createUser(username);
              }}>
              Create user
            </Button>
          </Card.Content>
        </Card>
      </Surface>
    </PaperProvider>
  );
}

export default UserSignInScreen;
