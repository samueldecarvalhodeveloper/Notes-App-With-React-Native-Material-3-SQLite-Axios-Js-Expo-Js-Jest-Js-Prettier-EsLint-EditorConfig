import UserDataTransferObject from "../remote_data/data_transfer_objects/user_data_transfer_object";
import User from "../models/user";
import UserGateway from "../remote_data/data_gateways/user_gateway";
import UserDataAccessObject from "../local_data/data_access_object/user_data_access_object";

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

    const createdUserOnService: User = await this.userGateway.getCreatedUser(
      userDataTransferObject,
    );

    await this.userDataAccessObject.createUser(createdUserOnService);

    return createdUserOnService;
  }
}

export default UserRepository;
