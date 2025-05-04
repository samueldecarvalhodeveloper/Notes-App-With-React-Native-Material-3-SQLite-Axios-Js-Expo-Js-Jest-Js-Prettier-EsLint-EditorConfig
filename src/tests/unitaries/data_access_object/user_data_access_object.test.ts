import { describe, beforeAll, test, expect } from "@jest/globals";
import { SQLiteDatabase } from "expo-sqlite";
import {
  USER_ENTITY_OBJECT,
  USER_ID,
  USER_USERNAME,
} from "../../../constants/user_constants";
import UserDataAccessObject from "../../../data_access_object/user_data_access_object";

describe("Test Class UserDataAccessObject", () => {
  let databaseDriver: SQLiteDatabase;
  let userDataAccessObject: UserDataAccessObject;

  beforeAll(() => {
    databaseDriver = {
      getAllAsync: async () => [USER_ENTITY_OBJECT],
      runAsync: async () => {},
    } as unknown as SQLiteDatabase;
    userDataAccessObject = new UserDataAccessObject(databaseDriver);
  });

  test('Test If Method "getUsers" Returns List Of Users From Database', async () => {
    const listOfUsersFromDatabase = await userDataAccessObject.getUsers();

    expect(listOfUsersFromDatabase[0].id).toEqual(USER_ID);
    expect(listOfUsersFromDatabase[0].username).toEqual(USER_USERNAME);
  });

  test('Test If Method "createUser" Creates User On Database', async () => {
    await userDataAccessObject.createUser(USER_ENTITY_OBJECT);
  });
});
