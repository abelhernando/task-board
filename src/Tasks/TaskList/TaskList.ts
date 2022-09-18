import { isNonEmptyString } from "../../common/utils";
import { v4 as uuidv4 } from "uuid";
import type { Task } from "../Task/Task";

export class TaskList {
  /** id of the list */
  private readonly _id: string;

  /** title of the list */
  public title: string;

  /** all the tasks stored in the list */
  private tasks: Map<string, Task> = new Map();

  /** tasks that are visible */
  private visibleTasks: Task[] = [];

  /** current filter of the state of the tasks */
  private currentStateFilter: boolean | null = null;

  /** current filter of the content of the tasks */
  private currentContentFilter: string = "";

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

  public setTitle(value: string): void {
    this.title = value;
  }

  public getTasks(): Task[] {
    return [...this.visibleTasks];
  }

  public addTask(task: Task): void {
    this.tasks.set(task.id, task);

    this.visibleTasks = [...this.tasks.values()];

    this.applyFiltersIfThereAreSetted();
  }

  public removeTask(id: string): void {
    this.tasks.delete(id);

    this.visibleTasks = [...this.tasks.values()];
  }

  public hasTask(id: string): boolean {
    return this.tasks.has(id);
  }

  public hasAnyVisibleTask(): boolean {
    return this.visibleTasks.length > 0;
  }

  public resetFilter(): void {
    this.currentStateFilter = null;
    this.currentContentFilter = "";

    this.visibleTasks = [...this.tasks.values()];
  }

  public applyFilter(filter: boolean | string): void {
    if (typeof filter === "boolean") {
      this.currentStateFilter = filter;

      const tasks = this.getTaskByState(filter);

      this.visibleTasks = [...tasks.values()];
      return;
    }

    if (typeof filter === "string") {
      this.currentContentFilter = filter;

      const tasks = this.getTaskByContent(filter);

      this.visibleTasks = [...tasks.values()];
      return;
    }

    this.resetFilter();
  }

  public getTaskByState(value: boolean): Task[] {
    const allTasks = [...this.tasks.values()];

    const filteredTasks = allTasks.filter(function (task) {
      return task.isDone === value;
    });

    return filteredTasks;
  }

  public getTaskByContent(value: string): Task[] {
    const allTasks = [...this.tasks.values()];

    const filteredTasks = allTasks.filter(function (task) {
      return task.text
        .trim()
        .toLowerCase()
        .includes(value.trim().toLowerCase());
    });

    return filteredTasks;
  }

  private applyFiltersIfThereAreSetted(): void {
    if (this.currentStateFilter) {
      this.applyFilter(this.currentStateFilter);
    }

    if (isNonEmptyString(this.currentContentFilter)) {
      this.applyFilter(this.currentContentFilter);
    }
  }
}
