import axios from "axios";
import { openDatabaseSync } from "expo-sqlite";
import { DATABASE_FILE_PATH } from "../constants/application_constants";
import NoteGateway from "../data/remote_data/data_gateways/note_gateway";
import NoteDataAccessObject from "../data/local_data/data_access_object/note_data_access_object";
import NoteRepository from "../data/repositories/note_repository";

class NoteRepositoryFactory {
  private constructor() {}

  public static getInstance() {
    const databaseDriver = openDatabaseSync(DATABASE_FILE_PATH);
    const noteGateway = new NoteGateway(axios);
    const noteDataAccessObject = new NoteDataAccessObject(databaseDriver);

    return new NoteRepository(noteGateway, noteDataAccessObject);
  }
}

export default NoteRepositoryFactory;
