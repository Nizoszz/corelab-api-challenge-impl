import BadRequestException from "../exception/BadRequestException";

export default class Color {
  private readonly value: string;

  constructor(color: string) {
    if (!color || typeof color !== "string") {
      throw new BadRequestException("Color must be a non-empty string", 400);
    }
    this.value = color;
  }

  getValue(): string {
    return this.value;
  }
}
