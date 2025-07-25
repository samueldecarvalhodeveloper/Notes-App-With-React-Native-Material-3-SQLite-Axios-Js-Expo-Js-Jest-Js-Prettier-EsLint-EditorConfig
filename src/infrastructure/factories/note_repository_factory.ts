import axios from "axios";
import { openDatabaseSync } from "expo-sqlite";
import { DATABASE_FILE_PATH } from "../../constants/application_constants";
import NoteRepository from "../../repositories/note_repository";
import NoteGateway from "../../data_gateways/note_gateway";
import NoteDataAccessObject from "../../data_access_object/note_data_access_object";

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
