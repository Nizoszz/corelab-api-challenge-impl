export default class BadRequestException extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "BadRequestFoundException";
  }
}
