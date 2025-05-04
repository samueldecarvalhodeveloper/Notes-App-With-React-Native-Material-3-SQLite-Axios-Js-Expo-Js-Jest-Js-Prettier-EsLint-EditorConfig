import UserDataAccessObject from "../../data_access_object/user_data_access_object";
import UserGateway from "../../data_gateways/user_gateway";
import UserRepository from "../../repositories/user_repository";
import User from "../models/user";

class UserRepositoryProxy extends UserRepository {
  private user: User | null = null;

  public constructor(
    userGateway: UserGateway,
    userDataAccessObject: UserDataAccessObject,
  ) {
    super(userGateway, userDataAccessObject);
  }

  public async getUser(): Promise<User> {
    if (this.user === null) {
      this.user = await super.getUser();
    }

    return this.user;
  }
}

export default UserRepositoryProxy;
