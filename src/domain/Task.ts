import { randomUUID, UUID } from "crypto";
import BadRequestException from "./exception/BadRequestException";
import Title from "./vo/Title";
import Content from "./vo/Content";
import IsFavorite from "./vo/IsFavorite";
import Color from "./vo/Color";

export default class Task {
  constructor(
    readonly taskId: string,
    readonly title: Title,
    readonly content: Content,
    readonly isFavorite: IsFavorite,
    readonly color: Color,
    readonly createdAt: Date
  ) {}

  public static create(title: string, content: string): Task {
    const taskId: UUID = randomUUID();
    return new Task(
      taskId,
      new Title(title),
      new Content(content),
      new IsFavorite(false),
      new Color("default"),
      new Date()
    );
  }

  public static restore(
    taskId: string,
    title: string,
    content: string,
    isFavorite: boolean,
    color: string,
    createdAt: Date
  ): Task {
    return new Task(
      taskId,
      new Title(title),
      new Content(content),
      new IsFavorite(isFavorite),
      new Color(color),
      createdAt
    );
  }
}
