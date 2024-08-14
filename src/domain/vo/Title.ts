import BadRequestException from "../exception/BadRequestException";

export default class Title {
  private readonly value: string;

  constructor(title: string) {
    if (!title || typeof title !== "string") {
      throw new BadRequestException("Title must be a non-empty string", 400);
    }
    this.value = title;
  }

  getValue(): string {
    return this.value;
  }
}
