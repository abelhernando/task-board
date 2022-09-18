import { Task, TaskList } from "../Tasks";

describe("Entity TaskList", () => {
  it("is properly created", () => {
    const title = "Grocery List";

    const taskList = TaskList.create(title);

    expect(taskList.title).toBe(title);

    expect(taskList.id).toBeDefined();
  });

  it("can change his title", () => {
    const title = "Grocery List";

    const taskList = TaskList.create(title);

    expect(taskList.title).toBe(title);

    const newTitle = "Things to do today";

    taskList.setTitle(newTitle);

    expect(taskList.title).toBe(newTitle);
  });

  it("can add a new Task", () => {
    const title = "Grocery List";
    const text = "Buy Milk";

    const taskList = TaskList.create(title);
    const task = Task.create(text);
    taskList.addTask(task);

    const taskFound = taskList
      .getTasks()
      .find((currentTask) => currentTask.id === task.id);

    expect(taskList.hasTask(task.id)).toBeTruthy();
    expect(taskFound).not.toBeUndefined();
  });

  it("can remove a Task", () => {
    const title = "Grocery List";
    const text = "Buy Milk";

    const taskList = TaskList.create(title);
    const task = Task.create(text);
    taskList.addTask(task);

    expect(taskList.hasTask(task.id)).toBeTruthy();

    taskList.removeTask(task.id);

    expect(taskList.hasTask(task.id)).toBeFalsy();
  });

  it("can filter by the content of the tasks", () => {
    // Arrange
    const title = "Grocery List";
    const text = "Buy Milk";
    const secondaryText = "Buy Chocolate";

    const taskList = TaskList.create(title);
    const task = Task.create(text);
    const secondaryTask = Task.create(secondaryText);
    taskList.addTask(task);
    taskList.addTask(secondaryTask);

    expect(taskList.hasTask(task.id)).toBeTruthy();
    expect(taskList.hasTask(secondaryTask.id)).toBeTruthy();
    expect(taskList.hasAnyVisibleTask()).toBeTruthy();

    // Act
    taskList.applyFilter("milk");

    // Assert
    const taskFound = taskList
      .getTasks()
      .find((currentTask) => currentTask.id === task.id);

    const taskNotFound = taskList
      .getTasks()
      .find((currentTask) => currentTask.id === secondaryTask.id);

    expect(taskFound).not.toBeUndefined();
    expect(taskNotFound).toBeUndefined();
  });

  it("can filter by the state of the tasks", () => {
    // Arrange
    const title = "Grocery List";
    const text = "Buy Milk";
    const secondaryText = "Buy Chocolate";

    const taskList = TaskList.create(title);
    const task = Task.create(text);
    const secondaryTask = Task.create(secondaryText);
    taskList.addTask(task);
    taskList.addTask(secondaryTask);

    expect(taskList.hasTask(task.id)).toBeTruthy();
    expect(taskList.hasTask(secondaryTask.id)).toBeTruthy();
    expect(taskList.hasAnyVisibleTask()).toBeTruthy();

    // Act
    task.toggle();
    taskList.applyFilter(true);

    // Assert
    const taskFound = taskList
      .getTasks()
      .find((currentTask) => currentTask.id === task.id);

    const taskNotFound = taskList
      .getTasks()
      .find((currentTask) => currentTask.id === secondaryTask.id);

    expect(taskFound).not.toBeUndefined();
    expect(taskNotFound).toBeUndefined();
  });
});
