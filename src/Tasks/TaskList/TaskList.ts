import { v4 as uuidv4 } from "uuid";
import type { Task } from "../Task/Task";

export class TaskList {
  private readonly _id: string;

  public title: string;

  private tasks: Map<string, Task> = new Map();

  constructor(title: string) {
    this._id = uuidv4();

    this.title = title;
  }

  public static create(title: string): TaskList {
    const taskList = new TaskList(title);

    return taskList;
  }

  public get id(): string {
    return this._id;
  }

  public getItems(): Task[] {
    return [...this.tasks.values()];
  }

  public addItem(task: Task): void {
    this.tasks.set(task.id, task);
  }

  public removeItem(id: string): void {
    this.tasks.delete(id);
  }

  public hasItem(id: string): void {
    this.tasks.has(id);
  }

  public hasAnyItem(): boolean {
    return this.tasks.size > 0;
  }
}
