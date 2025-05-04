import { jest, describe, beforeAll, test, expect } from "@jest/globals";
import axios from "axios";
import {
  USER_DATA_TRANSFER_OBJECT_OBJECT,
  USER_ID,
  USER_MODEL_OBJECT,
  USER_USERNAME,
} from "../../../constants/user_constants";
import UserGateway from "../../../data_gateways/user_gateway";

jest.mock("axios");

describe("Test Class UserGateway", () => {
  let userGateway: UserGateway;

  beforeAll(() => {
    userGateway = new UserGateway(axios);
  });

  test('Test If Method "getCreatedUserOnService" Returns Created User On Service', async () => {
    (axios as jest.Mocked<typeof axios>).post.mockResolvedValueOnce({
      data: USER_MODEL_OBJECT,
    });

    const createdUserOnService = await userGateway.getCreatedUserOnService(
      USER_DATA_TRANSFER_OBJECT_OBJECT,
    );

    expect(createdUserOnService.id).toEqual(USER_ID);
    expect(createdUserOnService.username).toEqual(USER_USERNAME);
  });
});
