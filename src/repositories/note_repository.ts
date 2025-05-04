import NoteDataAccessObject from "../data_access_object/note_data_access_object";
import NoteGateway from "../data_gateways/note_gateway";
import NoteDataTransferObject from "../infrastructure/data_transfer_objects/note_data_transfer_object";
import Note from "../infrastructure/models/note";

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

  public async fetchNotesFromService(userId: number): Promise<void> {
    const notesFromService = await this.noteGateway.getNotes(userId);
    const notesFromDatabase = await this.noteDataAccessObject.getNotes();

    for (const note of notesFromDatabase) {
      await this.noteDataAccessObject.deleteNote(note.id);
    }

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

    const createdNoteOnService = await this.noteGateway.getCreatedNoteOnService(
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

    const updatedNoteOnService = await this.noteGateway.getUpdatedNoteOnService(
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
