import NoteDataTransferObject from "../remote_data/data_transfer_objects/note_data_transfer_object";
import Note from "../models/note";
import NoteGateway from "../remote_data/data_gateways/note_gateway";
import NoteDataAccessObject from "../local_data/data_access_object/note_data_access_object";

class NoteRepository {
  private noteGateway: NoteGateway;

  private noteDataAccessObject: NoteDataAccessObject;

  public constructor(
    noteGateway: NoteGateway,
    noteDataAccessObject: NoteDataAccessObject,
  ) {
    this.noteGateway = noteGateway;
    this.noteDataAccessObject = noteDataAccessObject;
  }

  public async synchronizeWithNotesFromService(userId: number): Promise<void> {
    const notesFromService = await this.noteGateway.getNotes(userId);

    await this.noteDataAccessObject.deleteNotes();

    for (const note of notesFromService) {
      await this.noteDataAccessObject.createNote(note);
    }
  }

  public async getNotes(): Promise<Array<Note>> {
    return this.noteDataAccessObject.getNotes();
  }

  public async getNote(id: number): Promise<Note> {
    return this.noteDataAccessObject.getNote(id);
  }

  public async getCreatedNote(
    title: string,
    body: string,
    userId: number,
  ): Promise<Note> {
    const noteDataTransferObject = new NoteDataTransferObject(title, body);

    const createdNoteOnService = await this.noteGateway.getCreatedNote(
      userId,
      noteDataTransferObject,
    );

    await this.noteDataAccessObject.createNote(createdNoteOnService);

    return createdNoteOnService;
  }

  public async getUpdatedNote(
    id: number,
    title: string,
    body: string,
    userId: number,
  ): Promise<Note> {
    const noteDataTransferObject = new NoteDataTransferObject(title, body);

    const updatedNoteOnService = await this.noteGateway.getUpdatedNote(
      userId,
      id,
      noteDataTransferObject,
    );

    await this.noteDataAccessObject.updateNote(updatedNoteOnService);

    return updatedNoteOnService;
  }

  public async deleteNote(id: number, userId: number): Promise<void> {
    await this.noteGateway.deleteNote(id, userId);

    await this.noteDataAccessObject.deleteNote(id);
  }
}

export default NoteRepository;
