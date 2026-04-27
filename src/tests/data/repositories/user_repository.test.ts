import { describe, test, expect } from "@jest/globals";
import {
  USER_ENTITY_OBJECT,
  USER_ID,
  USER_MODEL_OBJECT,
  USER_USERNAME,
} from "../../../constants/user_constants";
import UserRepository from "../../../data/repositories/user_repository";
import UserEntity from "../../../data/local_data/entities/user_entity";
import UserDataAccessObject from "../../../data/local_data/data_access_object/user_data_access_object";
import UserGateway from "../../../data/remote_data/data_gateways/user_gateway";

describe("Test Class UserRepository", () => {
  let userRepository: UserRepository;

  test('Test If Method "getUser" Returns User From Database', async () => {
    const userDataAccessObject = {
      getUsers: async () => [USER_ENTITY_OBJECT],
    } as unknown as UserDataAccessObject;
    userRepository = new UserRepository(
      {} as unknown as UserGateway,
      userDataAccessObject,
    );

    const userFromDatabase = await userRepository.getUser();

    expect(userFromDatabase.id).toEqual(USER_ID);
    expect(userFromDatabase.username).toEqual(USER_USERNAME);
  });

  test('Test If Method "getCreatedUser" Returns Created User On Database And On Service', async () => {
    const userGateway = {
      getCreatedUser: async () => USER_MODEL_OBJECT,
    } as unknown as UserGateway;
    const userDataAccessObject = {
      listOfUsersOnDatabase: [],
      createUser: async () => {
        (
          (userDataAccessObject as any)
            .listOfUsersOnDatabase as Array<UserEntity>
        ).push(USER_ENTITY_OBJECT);
      },
    } as unknown as UserDataAccessObject;
    userRepository = new UserRepository(userGateway, userDataAccessObject);

    const userFromDatabase = await userRepository.getCreatedUser(USER_USERNAME);

    expect(userFromDatabase.id).toEqual(USER_ID);
    expect(userFromDatabase.username).toEqual(USER_USERNAME);

    expect(
      (
        (userDataAccessObject as any).listOfUsersOnDatabase as Array<UserEntity>
      )[0].id,
    ).toEqual(USER_ID);
    expect(
      (
        (userDataAccessObject as any).listOfUsersOnDatabase as Array<UserEntity>
      )[0].username,
    ).toEqual(USER_USERNAME);
  });
});
