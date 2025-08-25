import UserDataAccessObject from "../data_access_object/user_data_access_object";
import UserGateway from "../data_gateways/user_gateway";
import UserDataTransferObject from "../infrastructure/data_transfer_objects/user_data_transfer_object";
import User from "../infrastructure/models/user";

class UserRepository {
  private userGateway: UserGateway;

  private userDataAccessObject: UserDataAccessObject;

  public constructor(
    userGateway: UserGateway,
    userDataAccessObject: UserDataAccessObject,
  ) {
    this.userGateway = userGateway;
    this.userDataAccessObject = userDataAccessObject;
  }

  public async getUser(): Promise<User> {
    return (await this.userDataAccessObject.getUsers())[0];
  }

  public async getCreatedUser(username: string): Promise<User> {
    const userDataTransferObject = new UserDataTransferObject(username);

    const createdUserOnService: User =
      await this.userGateway.getCreatedUserOnService(userDataTransferObject);

    await this.userDataAccessObject.createUser(createdUserOnService);

    return createdUserOnService;
  }
}

export default UserRepository;
