import { AxiosStatic } from "axios";
import UserDataTransferObject from "../data_transfer_objects/user_data_transfer_object";
import User from "../../models/user";
import { USER_BASE_ROUTE } from "../../../constants/user_constants";
import { SERVICE_URL } from "../../../constants/application_constants";

class UserGateway {
  private httpClientImplementation: AxiosStatic;

  constructor(httpClientImplementation: AxiosStatic) {
    this.httpClientImplementation = httpClientImplementation;
  }

  public async getCreatedUser(user: UserDataTransferObject): Promise<User> {
    const requestResponse = await this.httpClientImplementation.post<User>(
      `${SERVICE_URL}${USER_BASE_ROUTE}/`,
      user,
    );

    return requestResponse.data;
  }
}

export default UserGateway;
