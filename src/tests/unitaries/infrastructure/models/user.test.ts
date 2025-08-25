import { describe, test, expect } from "@jest/globals";
import User from "../../../../infrastructure/models/user";
import { USER_ID, USER_USERNAME } from "../../../../constants/user_constants";

describe("Test Model User", () => {
  test("Test If Model Describes How User Model Should Be Handled By The System", () => {
    const instance = new User(USER_ID, USER_USERNAME);

    expect(instance.id).toEqual(USER_ID);
    expect(instance.username).toEqual(USER_USERNAME);
  });
});
