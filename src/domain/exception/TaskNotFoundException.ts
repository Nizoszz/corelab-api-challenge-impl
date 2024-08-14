export default class TaskNotFoundException extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "TaskNotFoundException";
  }
}
