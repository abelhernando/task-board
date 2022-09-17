import { v4 as uuidv4 } from "uuid";

export class Task {
  private readonly _id: string;

  public text: string;

  public isDone: boolean;

  constructor(text: string) {
    this._id = uuidv4();

    this.text = text;

    this.isDone = false;
  }

  public static create(text: string): Task {
    const task = new Task(text);

    return task;
  }

  public setText(value: string): void {
    this.text = value;
  }

  public setIsDone(isDone: boolean): void {
    this.isDone = isDone;
  }

  public get id(): string {
    return this._id;
  }

  public toggle(): void {
    this.isDone = !this.isDone;
  }
}
