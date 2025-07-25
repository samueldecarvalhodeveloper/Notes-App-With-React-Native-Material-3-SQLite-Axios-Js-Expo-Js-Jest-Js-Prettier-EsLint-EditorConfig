import { describe, test, expect } from "@jest/globals";
import UserRepository from "../../../../repositories/user_repository";
import UserGateway from "../../../../data_gateways/user_gateway";
import UserDataAccessObject from "../../../../data_access_object/user_data_access_object";
import {
  USER_ENTITY_OBJECT,
  USER_ID,
  USER_USERNAME,
} from "../../../../constants/user_constants";

describe("Test Class UserRepositoryProxy", () => {
  let userRepository: UserRepository;

  test('Test "getUser" Retrieves, Stores And Returns Cached User', async () => {
    userRepository = new UserRepository(
      {} as unknown as UserGateway,
      {
        getUsers: async () => [USER_ENTITY_OBJECT],
      } as unknown as UserDataAccessObject,
    );
    const cacheUser = await userRepository.getUser();

    expect(cacheUser.id).toEqual(USER_ID);
    expect(cacheUser.username).toEqual(USER_USERNAME);
  });
});
