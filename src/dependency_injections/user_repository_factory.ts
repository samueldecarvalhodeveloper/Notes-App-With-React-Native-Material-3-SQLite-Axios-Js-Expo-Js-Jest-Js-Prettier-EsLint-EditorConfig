import axios from "axios";
import { openDatabaseSync } from "expo-sqlite";
import UserRepository from "../data/repositories/user_repository";
import { DATABASE_FILE_PATH } from "../constants/application_constants";
import UserGateway from "../data/remote_data/data_gateways/user_gateway";
import UserDataAccessObject from "../data/local_data/data_access_object/user_data_access_object";

class UserRepositoryFactory {
  private static instance: UserRepository | null = null;

  private constructor() {}

  public static getInstance() {
    if (this.instance === null) {
      const databaseDriver = openDatabaseSync(DATABASE_FILE_PATH);
      const userGateway = new UserGateway(axios);
      const userDataAccessObject = new UserDataAccessObject(databaseDriver);

      this.instance = new UserRepository(userGateway, userDataAccessObject);
    }

    return this.instance;
  }
}

export default UserRepositoryFactory;
