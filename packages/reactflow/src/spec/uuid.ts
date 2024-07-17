export class UUID {
  private static instance: UUID;

  static getInstance() {
    if (!UUID.instance) {
      UUID.instance = new UUID();
    }
    return UUID.instance;
  }

  private _id = 0;

  uniqueID() {
    this._id += 1;
    return this._id.toString();
  }
}
