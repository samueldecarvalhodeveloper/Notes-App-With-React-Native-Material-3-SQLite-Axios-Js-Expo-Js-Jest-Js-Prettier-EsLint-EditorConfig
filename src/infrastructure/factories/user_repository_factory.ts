import axios from "axios";
import { openDatabaseSync } from "expo-sqlite";
import UserDataAccessObject from "../../data_access_object/user_data_access_object";
import UserGateway from "../../data_gateways/user_gateway";
import UserRepository from "../../repositories/user_repository";
import { DATABASE_FILE_PATH } from "../../constants/application_constants";
import UserRepositoryProxy from "../anticorruption_layer/user_repository_proxy";

class UserRepositoryFactory {
  private static instance: UserRepository | null = null;

  private constructor() {}

  public static getInstance() {
    if (this.instance === null) {
      const databaseDriver = openDatabaseSync(DATABASE_FILE_PATH);
      const userGateway = new UserGateway(axios);
      const userDataAccessObject = new UserDataAccessObject(databaseDriver);

      this.instance = new UserRepositoryProxy(
        userGateway,
        userDataAccessObject,
      );
    }

    return this.instance;
  }
}

export default UserRepositoryFactory;
