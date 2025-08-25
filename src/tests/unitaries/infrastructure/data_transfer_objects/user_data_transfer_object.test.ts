import { describe, test, expect } from "@jest/globals";
import UserDataTransferObject from "../../../../infrastructure/data_transfer_objects/user_data_transfer_object";
import { USER_USERNAME } from "../../../../constants/user_constants";

describe("Test Data Transfer Object User", () => {
  test("Test If Data Transfer Object Describes How User Data Transfer Object Should Be Handled By The System", () => {
    const instance = new UserDataTransferObject(USER_USERNAME);

    expect(instance.username).toEqual(USER_USERNAME);
  });
});
