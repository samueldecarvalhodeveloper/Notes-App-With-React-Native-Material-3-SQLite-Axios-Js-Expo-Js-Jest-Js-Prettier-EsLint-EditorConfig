import { AxiosStatic } from "axios";
import { SERVICE_URL } from "../constants/application_constants";
import UserDataTransferObject from "../infrastructure/data_transfer_objects/user_data_transfer_object";
import User from "../infrastructure/models/user";
import { USER_BASE_ROUTE } from "../constants/user_constants";

class UserGateway {
  private httpClientImplementation: AxiosStatic;

  constructor(httpClientImplementation: AxiosStatic) {
    this.httpClientImplementation = httpClientImplementation;
  }

  public async getCreatedUserOnService(
    user: UserDataTransferObject,
  ): Promise<User> {
    const requestResponse = await this.httpClientImplementation.post<User>(
      `${SERVICE_URL}${USER_BASE_ROUTE}/`,
      user,
    );

    return requestResponse.data;
  }
}

export default UserGateway;
