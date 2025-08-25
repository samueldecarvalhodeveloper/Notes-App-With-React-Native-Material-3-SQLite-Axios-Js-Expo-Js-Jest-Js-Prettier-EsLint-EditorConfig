import UserDataTransferObject from "../infrastructure/data_transfer_objects/user_data_transfer_object";
import UserEntity from "../infrastructure/entities/user_entity";
import User from "../infrastructure/models/user";

export const USER_DATABASE_TABLE_NAME = "users";

export const USER_DATABASE_CREATION_QUERY =
  "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY NOT NULL, username TEXT NOT NULL)";

export const FETCHING_LIST_OF_USERS_QUERY = `SELECT * FROM ${USER_DATABASE_TABLE_NAME}`;

export const CREATING_USER_QUERY = `INSERT INTO ${USER_DATABASE_TABLE_NAME} (id, username) VALUES (?, ?)`;

export const USER_BASE_ROUTE = "/users/";

export const USER_ID = 10;

export const USER_USERNAME = "username";

export const USER_ENTITY_OBJECT = new UserEntity(USER_ID, USER_USERNAME);

export const USER_MODEL_OBJECT = new User(USER_ID, USER_USERNAME);

export const USER_DATA_TRANSFER_OBJECT_OBJECT = new UserDataTransferObject(
  USER_USERNAME,
);
