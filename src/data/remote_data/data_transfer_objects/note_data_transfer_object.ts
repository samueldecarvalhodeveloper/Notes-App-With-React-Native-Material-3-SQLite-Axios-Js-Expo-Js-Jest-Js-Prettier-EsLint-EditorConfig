class NoteDataTransferObject {
  public readonly title: string;

  public readonly body: string;

  public constructor(title: string, body: string) {
    this.title = title;
    this.body = body;
  }
}

export default NoteDataTransferObject;
