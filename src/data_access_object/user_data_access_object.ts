import { SQLiteDatabase } from "expo-sqlite";
import UserEntity from "../infrastructure/entities/user_entity";
import {
  CREATING_USER_QUERY,
  FETCHING_LIST_OF_USERS_QUERY,
} from "../constants/user_constants";

class UserDataAccessObject {
  private databaseDriver: SQLiteDatabase;

  constructor(databaseDriver: SQLiteDatabase) {
    this.databaseDriver = databaseDriver;
  }

  public async getUsers(): Promise<Array<UserEntity>> {
    const queryResponse = await this.databaseDriver.getAllAsync<UserEntity>(
      FETCHING_LIST_OF_USERS_QUERY,
    );

    return queryResponse;
  }

  public async createUser(user: UserEntity): Promise<void> {
    await this.databaseDriver.runAsync(CREATING_USER_QUERY, [
      user.id,
      user.username,
    ]);
  }
}

export default UserDataAccessObject;
