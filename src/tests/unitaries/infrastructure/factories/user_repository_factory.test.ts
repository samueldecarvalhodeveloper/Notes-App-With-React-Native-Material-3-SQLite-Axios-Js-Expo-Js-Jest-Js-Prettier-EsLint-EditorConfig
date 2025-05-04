import { jest, describe, beforeAll, test, expect } from "@jest/globals";
import { SQLiteDatabase } from "expo-sqlite";
import * as DatabaseDriver from "expo-sqlite";
import UserRepositoryFactory from "../../../../infrastructure/factories/user_repository_factory";
import {
  USER_ENTITY_OBJECT,
  USER_ID,
  USER_USERNAME,
} from "../../../../constants/user_constants";

jest.mock("expo-sqlite");

describe("Test Class UserRepositoryFactory", () => {
  beforeAll(() => {
    (
      DatabaseDriver as jest.Mocked<typeof DatabaseDriver>
    ).openDatabaseSync.mockReturnValue({
      getAllAsync: async () => [USER_ENTITY_OBJECT],
    } as unknown as SQLiteDatabase);
  });

  test('Test If Method "getInstance" Returns An Instance Of UserRepository', async () => {
    const instance = UserRepositoryFactory.getInstance();

    const userFromDatabase = await instance.getUser();

    expect(userFromDatabase.id).toEqual(USER_ID);
    expect(userFromDatabase.username).toEqual(USER_USERNAME);
  });
});
