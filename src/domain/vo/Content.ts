import BadRequestException from "../exception/BadRequestException";

export default class Content {
  private readonly value: string;

  constructor(content: string) {
    if (!content || typeof content !== "string") {
      throw new BadRequestException("Content must be a non-empty string", 400);
    }
    this.value = content;
  }

  getValue(): string {
    return this.value;
  }
}
