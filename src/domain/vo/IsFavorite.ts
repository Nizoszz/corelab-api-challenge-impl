import BadRequestException from "../exception/BadRequestException";

export default class IsFavorite {
  private readonly value: boolean;

  constructor(isFavorite: boolean) {
    if (typeof isFavorite !== "boolean") {
      throw new BadRequestException("isFavorite must be a boolean", 400);
    }
    this.value = isFavorite;
  }

  getValue(): boolean {
    return this.value;
  }
}
