import { AxiosStatic } from "axios";
import Note from "../infrastructure/models/note";
import { SERVICE_URL } from "../constants/application_constants";
import { NOTE_BASE_ROUTE } from "../constants/note_constants";
import NoteDataTransferObject from "../infrastructure/data_transfer_objects/note_data_transfer_object";

class NoteGateway {
  private httpClientImplementation: AxiosStatic;

  constructor(httpClientImplementation: AxiosStatic) {
    this.httpClientImplementation = httpClientImplementation;
  }

  public async getNotes(userId: number): Promise<Array<Note>> {
    const requestResponse = await this.httpClientImplementation.get<
      Array<Note>
    >(`${SERVICE_URL}${NOTE_BASE_ROUTE}/${userId}/`);

    return requestResponse.data;
  }

  public async getCreatedNoteOnService(
    userId: number,
    note: NoteDataTransferObject,
  ): Promise<Note> {
    const requestResponse = await this.httpClientImplementation.post<Note>(
      `${SERVICE_URL}${NOTE_BASE_ROUTE}/${userId}/`,
      note,
    );

    return requestResponse.data;
  }

  public async getUpdatedNoteOnService(
    userId: number,
    noteId: number,
    note: NoteDataTransferObject,
  ): Promise<Note> {
    const requestResponse = await this.httpClientImplementation.patch<Note>(
      `${SERVICE_URL}${NOTE_BASE_ROUTE}/${userId}/${noteId}/`,
      note,
    );

    return requestResponse.data;
  }

  public async deleteNote(noteId: number, userId: number): Promise<void> {
    await this.httpClientImplementation.delete<"">(
      `${SERVICE_URL}${NOTE_BASE_ROUTE}/${userId}/${noteId}/`,
    );
  }
}

export default NoteGateway;
