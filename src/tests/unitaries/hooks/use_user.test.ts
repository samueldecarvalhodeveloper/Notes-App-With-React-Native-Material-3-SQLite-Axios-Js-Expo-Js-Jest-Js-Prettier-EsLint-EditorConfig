import { describe, test, expect } from "@jest/globals";
import { act, renderHook } from "@testing-library/react-hooks";
import {
  USER_ID,
  USER_MODEL_OBJECT,
  USER_USERNAME,
} from "../../../constants/user_constants";
import useUser from "../../../hooks/use_user";
import UserRepository from "../../../repositories/user_repository";

describe("Test Hook useUser", () => {
  test("Test If User Is Retrieved From Database On Hook Start And Dispatches On User Created Function", async () => {
    let isUserCreated = false;
    const { result, waitForNextUpdate } = renderHook(() =>
      useUser(
        { getUser: async () => USER_MODEL_OBJECT } as unknown as UserRepository,
        () => {
          isUserCreated = true;
        },
      ),
    );

    await waitForNextUpdate();

    expect(isUserCreated).toBeTruthy();

    expect(result.current.user!.id).toEqual(USER_ID);
    expect(result.current.user!.username).toEqual(USER_USERNAME);
  });

  test('Test If Method "createUser" Creates User And Dispatches On User Created Function', async () => {
    let isUserCreated = false;
    const { result } = renderHook(() =>
      useUser(
        {
          getUser: async () => {
            throw new Error();
          },
          getCreatedUser: async () => USER_MODEL_OBJECT,
        } as unknown as UserRepository,
        () => {
          isUserCreated = true;
        },
      ),
    );

    await act(async () => {
      await result.current.createUser(USER_USERNAME);
    });

    expect(isUserCreated).toBeTruthy();

    expect(result.current.isUserUsernameInvalid).toBeFalsy();
    expect(result.current.isInternetErrorRisen).toBeFalsy();

    expect(result.current.user!.id).toEqual(USER_ID);
    expect(result.current.user!.username).toEqual(USER_USERNAME);
  });

  test('Test If Method "createUser" Turns "isUserUsernameInvalid" To True If Username Is Empty', async () => {
    const { result } = renderHook(() =>
      useUser(
        {
          getUser: async () => {
            throw new Error();
          },
          getCreatedUser: async () => {},
        } as unknown as UserRepository,
        () => {},
      ),
    );

    await act(async () => {
      await result.current.createUser("");
    });

    expect(result.current.isUserUsernameInvalid).toBeTruthy();
  });

  test('Test If Method "createUser" Turns "isInternetErrorRisen" To True If User Creating Is Not Successful', async () => {
    const { result } = renderHook(() =>
      useUser(
        {
          getUser: async () => {
            throw new Error();
          },
          getCreatedUser: async () => {
            throw new Error();
          },
        } as unknown as UserRepository,
        () => {},
      ),
    );

    await act(async () => {
      await result.current.createUser(USER_USERNAME);
    });

    expect(result.current.isInternetErrorRisen).toBeTruthy();
    expect(result.current.isUserUsernameInvalid).toBeFalsy();
  });
});
