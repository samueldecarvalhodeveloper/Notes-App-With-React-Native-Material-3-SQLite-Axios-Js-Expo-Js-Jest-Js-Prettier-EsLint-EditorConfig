import { describe, test, expect } from "@jest/globals";
import NoteRepository from "../../repositories/note_repository";
import NoteDataAccessObject from "../../data_access_object/note_data_access_object";
import NoteGateway from "../../data_gateways/note_gateway";
import {
  NOTE_BODY,
  NOTE_CREATED_AT,
  NOTE_ENTITY_OBJECT,
  NOTE_ENTITY_WITH_WRONG_DATA_OBJECT,
  NOTE_ID,
  NOTE_MODEL_OBJECT,
  NOTE_TITLE,
  NOTE_UPDATED_AT,
} from "../../constants/note_constants";
import NoteEntity from "../../infrastructure/entities/note_entity";
import { USER_ID } from "../../constants/user_constants";

describe("Test Component Note", () => {
  let noteRepository: NoteRepository;

  test("Test Synchronizing Notes From Service To Notes On Database", async () => {
    const noteGatewayMock = {
      getNotes: async () => [NOTE_MODEL_OBJECT],
    } as unknown as NoteGateway;
    const noteDataAccessObjectMock = {
      listOfNotesFromDatabase: [NOTE_ENTITY_WITH_WRONG_DATA_OBJECT],
      getNotes: async () =>
        (noteDataAccessObjectMock as any).listOfNotesFromDatabase,
      deleteNote: async () => {
        ((noteDataAccessObjectMock as any)
          .listOfNotesFromDatabase as Array<NoteEntity>) = (
          (noteDataAccessObjectMock as any)
            .listOfNotesFromDatabase as Array<NoteEntity>
        ).filter((note) => note.id !== NOTE_ID);
      },
      createNote: async () => {
        (
          (noteDataAccessObjectMock as any)
            .listOfNotesFromDatabase as Array<NoteEntity>
        ).push(NOTE_ENTITY_OBJECT);
      },
    } as unknown as NoteDataAccessObject;
    noteRepository = new NoteRepository(
      noteGatewayMock,
      noteDataAccessObjectMock,
    );

    await noteRepository.fetchNotesFromService(USER_ID);

    const synchronizedListOfNotesFromDatabase =
      await noteDataAccessObjectMock.getNotes();

    expect(synchronizedListOfNotesFromDatabase[0].id).toEqual(NOTE_ID);
    expect(synchronizedListOfNotesFromDatabase[0].title).toEqual(NOTE_TITLE);
    expect(synchronizedListOfNotesFromDatabase[0].body).toEqual(NOTE_BODY);
    expect(synchronizedListOfNotesFromDatabase[0].createdAt).toEqual(
      NOTE_CREATED_AT,
    );
    expect(synchronizedListOfNotesFromDatabase[0].updatedAt).toEqual(
      NOTE_UPDATED_AT,
    );
    expect(synchronizedListOfNotesFromDatabase[0].userId).toEqual(USER_ID);
  });

  test("Test Getting List Of Notes From Database", async () => {
    const noteDataAccessObjectMock = {
      getNotes: async () => [NOTE_ENTITY_OBJECT],
    } as unknown as NoteDataAccessObject;
    noteRepository = new NoteRepository(
      {} as NoteGateway,
      noteDataAccessObjectMock,
    );

    const listOfNotesFromDatabase = await noteRepository.getNotes();

    expect(listOfNotesFromDatabase[0].id).toEqual(NOTE_ID);
    expect(listOfNotesFromDatabase[0].title).toEqual(NOTE_TITLE);
    expect(listOfNotesFromDatabase[0].body).toEqual(NOTE_BODY);
    expect(listOfNotesFromDatabase[0].createdAt).toEqual(NOTE_CREATED_AT);
    expect(listOfNotesFromDatabase[0].updatedAt).toEqual(NOTE_UPDATED_AT);
    expect(listOfNotesFromDatabase[0].userId).toEqual(USER_ID);
  });

  test("Test Getting Note From Database", async () => {
    const noteDataAccessObjectMock = {
      getNote: async () => NOTE_ENTITY_OBJECT,
    } as unknown as NoteDataAccessObject;
    noteRepository = new NoteRepository(
      {} as NoteGateway,
      noteDataAccessObjectMock,
    );

    const noteFromDatabase = await noteRepository.getNote(NOTE_ID);

    expect(noteFromDatabase.id).toEqual(NOTE_ID);
    expect(noteFromDatabase.title).toEqual(NOTE_TITLE);
    expect(noteFromDatabase.body).toEqual(NOTE_BODY);
    expect(noteFromDatabase.createdAt).toEqual(NOTE_CREATED_AT);
    expect(noteFromDatabase.updatedAt).toEqual(NOTE_UPDATED_AT);
    expect(noteFromDatabase.userId).toEqual(USER_ID);
  });

  test("Test Creating Note On Database And On Service", async () => {
    const noteGatewayMock = {
      getCreatedNoteOnService: async () => NOTE_MODEL_OBJECT,
    } as unknown as NoteGateway;
    const noteDataAccessObjectMock = {
      listOfNotesFromDatabase: [],
      createNote: async () => {
        (
          (noteDataAccessObjectMock as any)
            .listOfNotesFromDatabase as Array<NoteEntity>
        ).push(NOTE_ENTITY_OBJECT);
      },
      getNotes: async () =>
        (noteDataAccessObjectMock as any).listOfNotesFromDatabase,
    } as unknown as NoteDataAccessObject;
    noteRepository = new NoteRepository(
      noteGatewayMock,
      noteDataAccessObjectMock,
    );

    const createdNoteFromDatabase = await noteRepository.getCreatedNote(
      NOTE_TITLE,
      NOTE_BODY,
      USER_ID,
    );

    expect(createdNoteFromDatabase.id).toEqual(NOTE_ID);
    expect(createdNoteFromDatabase.title).toEqual(NOTE_TITLE);
    expect(createdNoteFromDatabase.body).toEqual(NOTE_BODY);
    expect(createdNoteFromDatabase.createdAt).toEqual(NOTE_CREATED_AT);
    expect(createdNoteFromDatabase.updatedAt).toEqual(NOTE_UPDATED_AT);
    expect(createdNoteFromDatabase.userId).toEqual(USER_ID);

    expect(
      (
        (noteDataAccessObjectMock as any)
          .listOfNotesFromDatabase as Array<NoteEntity>
      )[0].id,
    ).toEqual(NOTE_ID);
    expect(
      (
        (noteDataAccessObjectMock as any)
          .listOfNotesFromDatabase as Array<NoteEntity>
      )[0].title,
    ).toEqual(NOTE_TITLE);
    expect(
      (
        (noteDataAccessObjectMock as any)
          .listOfNotesFromDatabase as Array<NoteEntity>
      )[0].body,
    ).toEqual(NOTE_BODY);
    expect(
      (
        (noteDataAccessObjectMock as any)
          .listOfNotesFromDatabase as Array<NoteEntity>
      )[0].createdAt,
    ).toEqual(NOTE_CREATED_AT);
    expect(
      (
        (noteDataAccessObjectMock as any)
          .listOfNotesFromDatabase as Array<NoteEntity>
      )[0].updatedAt,
    ).toEqual(NOTE_UPDATED_AT);
    expect(
      (
        (noteDataAccessObjectMock as any)
          .listOfNotesFromDatabase as Array<NoteEntity>
      )[0].userId,
    ).toEqual(USER_ID);
  });

  test("Test If Updating Note On Database And On Service", async () => {
    const noteGatewayMock = {
      getUpdatedNoteOnService: async () => NOTE_MODEL_OBJECT,
    } as unknown as NoteGateway;
    const noteDataAccessObjectMock = {
      listOfNotesFromDatabase: [NOTE_ENTITY_WITH_WRONG_DATA_OBJECT],
      updateNote: async () => {
        (noteDataAccessObjectMock as any).listOfNotesFromDatabase = (
          (noteDataAccessObjectMock as any)
            .listOfNotesFromDatabase as Array<NoteEntity>
        ).map((note) => {
          if (note.id === NOTE_ID) {
            return NOTE_ENTITY_OBJECT;
          }

          return note;
        });
      },
    } as unknown as NoteDataAccessObject;
    noteRepository = new NoteRepository(
      noteGatewayMock,
      noteDataAccessObjectMock,
    );

    const createdNoteFromDatabase = await noteRepository.getUpdatedNote(
      NOTE_ID,
      NOTE_TITLE,
      NOTE_BODY,
      USER_ID,
    );

    expect(createdNoteFromDatabase.id).toEqual(NOTE_ID);
    expect(createdNoteFromDatabase.title).toEqual(NOTE_TITLE);
    expect(createdNoteFromDatabase.body).toEqual(NOTE_BODY);
    expect(createdNoteFromDatabase.createdAt).toEqual(NOTE_CREATED_AT);
    expect(createdNoteFromDatabase.updatedAt).toEqual(NOTE_UPDATED_AT);
    expect(createdNoteFromDatabase.userId).toEqual(USER_ID);

    expect(
      (
        (noteDataAccessObjectMock as any)
          .listOfNotesFromDatabase as Array<NoteEntity>
      )[0].id,
    ).toEqual(NOTE_ID);
    expect(
      (
        (noteDataAccessObjectMock as any)
          .listOfNotesFromDatabase as Array<NoteEntity>
      )[0].title,
    ).toEqual(NOTE_TITLE);
    expect(
      (
        (noteDataAccessObjectMock as any)
          .listOfNotesFromDatabase as Array<NoteEntity>
      )[0].body,
    ).toEqual(NOTE_BODY);
    expect(
      (
        (noteDataAccessObjectMock as any)
          .listOfNotesFromDatabase as Array<NoteEntity>
      )[0].createdAt,
    ).toEqual(NOTE_CREATED_AT);
    expect(
      (
        (noteDataAccessObjectMock as any)
          .listOfNotesFromDatabase as Array<NoteEntity>
      )[0].updatedAt,
    ).toEqual(NOTE_UPDATED_AT);
    expect(
      (
        (noteDataAccessObjectMock as any)
          .listOfNotesFromDatabase as Array<NoteEntity>
      )[0].userId,
    ).toEqual(USER_ID);
  });

  test("Test Deleting Note On Database And On Service", async () => {
    const noteGatewayMock = {
      deleteNote: async () => {},
    } as unknown as NoteGateway;
    const noteDataAccessObjectMock = {
      listOfNotesFromDatabase: [NOTE_ENTITY_OBJECT],
      deleteNote: async () => {
        (noteDataAccessObjectMock as any).listOfNotesFromDatabase = (
          (noteDataAccessObjectMock as any)
            .listOfNotesFromDatabase as Array<NoteEntity>
        ).filter((note) => note.id !== NOTE_ID);
      },
    } as unknown as NoteDataAccessObject;

    noteRepository = new NoteRepository(
      noteGatewayMock,
      noteDataAccessObjectMock,
    );

    await noteRepository.deleteNote(NOTE_ID, USER_ID);

    expect(
      (
        (noteDataAccessObjectMock as any)
          .listOfNotesFromDatabase as Array<NoteEntity>
      ).length,
    ).toBeFalsy();
  });
});
