import { jest, describe, test, expect } from "@jest/globals";
import { fireEvent, waitFor } from "@testing-library/react-native";
import ReactRenderingAdapter from "../../concerns/react_rendering_adapter";
import UserSignInScreen from "../../../screens/user_sign_in_screen/user_sign_in_screen";
import UserRepository from "../../../repositories/user_repository";
import {
  CREATE_USER_BUTTON_TEXT,
  NOT_AVAILABLE_INTERNET_ERROR_MESSAGE,
  NOT_VALID_USERNAME_ERROR_MESSAGE,
} from "../../../constants/user_interface_constants";
import {
  USER_MODEL_OBJECT,
  USER_USERNAME,
} from "../../../constants/user_constants";

jest.useFakeTimers();

describe("Test Screen UserSignInScreen", () => {
  test("Test If Invalid Error Message Is Displayed If Username Is Submitted Empty", () => {
    const userRepository = {
      getUser: async () => {
        throw new Error();
      },
    } as unknown as UserRepository;
    const { getByText } = ReactRenderingAdapter.render(
      <UserSignInScreen
        onUserCreated={() => {}}
        userRepository={userRepository}
      />,
    );

    fireEvent.press(getByText(CREATE_USER_BUTTON_TEXT));

    expect(getByText(NOT_VALID_USERNAME_ERROR_MESSAGE)).toBeTruthy();
  });

  test("Test If Not Available Internet Error Message Is Displayed If User Creation Is Not Successful", async () => {
    const userRepository = {
      getUser: async () => {
        throw new Error();
      },
      getCreatedUser: async () => {
        throw new Error();
      },
    } as unknown as UserRepository;
    const { getByDisplayValue, getByText } = ReactRenderingAdapter.render(
      <UserSignInScreen
        onUserCreated={() => {}}
        userRepository={userRepository}
      />,
    );

    fireEvent.changeText(getByDisplayValue(""), USER_USERNAME);

    fireEvent.press(getByText(CREATE_USER_BUTTON_TEXT));
    await waitFor(() =>
      expect(getByText(NOT_AVAILABLE_INTERNET_ERROR_MESSAGE)).toBeTruthy(),
    );
  });

  test("Test If User Is Created On Creation Button Press", async () => {
    let isUserCreated: boolean = false;
    const userRepository = {
      getUser: async () => {
        throw new Error();
      },
      getCreatedUser: async () => USER_MODEL_OBJECT,
    } as unknown as UserRepository;
    const { getByDisplayValue, getByText } = ReactRenderingAdapter.render(
      <UserSignInScreen
        onUserCreated={() => {
          isUserCreated = true;
        }}
        userRepository={userRepository}
      />,
    );

    fireEvent.changeText(getByDisplayValue(""), USER_USERNAME);

    fireEvent.press(getByText(CREATE_USER_BUTTON_TEXT));

    await waitFor(() => expect(isUserCreated).toBeTruthy());
  });
});
