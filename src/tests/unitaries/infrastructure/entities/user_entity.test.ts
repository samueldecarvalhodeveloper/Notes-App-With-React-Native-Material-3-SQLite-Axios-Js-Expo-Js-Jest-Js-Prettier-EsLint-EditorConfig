import { describe, test, expect } from "@jest/globals";
import UserEntity from "../../../../infrastructure/entities/user_entity";
import { USER_ID, USER_USERNAME } from "../../../../constants/user_constants";

describe("Test Entity User", () => {
  test("Test If Entity Describes How User Entity Should Be Handled By The System", () => {
    const instance = new UserEntity(USER_ID, USER_USERNAME);

    expect(instance.id).toEqual(USER_ID);
    expect(instance.username).toEqual(USER_USERNAME);
  });
});
