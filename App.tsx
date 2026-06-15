import {
  NavigationContainer,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { useMemo } from "react";
import Routes from "./src/user_interface/internals/enums/routes";
import UserSignInScreen from "./src/user_interface/screens/user_sign_in_screen/user_sign_in_screen";
import NotesListingScreen from "./src/user_interface/screens/notes_listing_screen/notes_listing_screen";
import NoteEditingScreen from "./src/user_interface/screens/note_editing_screen/note_editing_screen";
import UserRepositoryFactory from "./src/dependency_injections/user_repository_factory";
import NoteRepositoryFactory from "./src/dependency_injections/note_repository_factory";

const { Navigator, Screen } = createNativeStackNavigator();

function UserSignInScreenAdapter() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const userRepository = useMemo(() => UserRepositoryFactory.getInstance(), []);

  return (
    <UserSignInScreen
      userRepository={userRepository}
      onUserCreated={() => {
        navigation.navigate(Routes.NOTES_LISTING_SCREEN);
      }}
    />
  );
}

function NotesListingScreenAdapter() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const userRepository = useMemo(() => UserRepositoryFactory.getInstance(), []);
  const noteRepository = useMemo(() => NoteRepositoryFactory.getInstance(), []);

  return (
    <NotesListingScreen
      userRepository={userRepository}
      noteRepository={noteRepository}
      onNoteSelected={(noteId) => {
        navigation.navigate(Routes.NOTE_EDITING_SCREEN, {
          id: noteId,
        });
      }}
    />
  );
}

function NoteEditingScreenAdapter() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { params } = useRoute<RouteProp<any>>();
  const noteRepository = useMemo(() => NoteRepositoryFactory.getInstance(), []);

  return (
    <NoteEditingScreen
      noteId={params!.id}
      noteRepository={noteRepository}
      onNoteEditingConclusion={() => {
        navigation.navigate(Routes.NOTES_LISTING_SCREEN);
      }}
    />
  );
}

function App() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={Routes.USER_SIGN_IN_SCREEN}>
        <Screen
          name={Routes.USER_SIGN_IN_SCREEN}
          component={UserSignInScreenAdapter}
        />
        <Screen
          name={Routes.NOTES_LISTING_SCREEN}
          component={NotesListingScreenAdapter}
        />
        <Screen
          name={Routes.NOTE_EDITING_SCREEN}
          component={NoteEditingScreenAdapter}
        />
      </Navigator>
    </NavigationContainer>
  );
}

export default App;
