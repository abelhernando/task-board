import { Task } from "../Tasks";

describe("Entity Task", () => {
  it("is properly created", () => {
    const text = "Buy milk";

    const task = Task.create(text);

    expect(task.text).toBe(text);

    expect(task.id).toBeDefined();
  });

  it("can change his text properly", () => {
    const text = "Buy milk";
    const task = Task.create(text);

    expect(task.text).toBe(text);

    const newText = "Buy sugar";
    task.setText(newText);

    expect(task.text).toBe(newText);
  });

  it("changes his isDone state properly", () => {
    const text = "Buy milk";
    const task = Task.create(text);

    expect(task.isDone).toBeFalsy();

    task.setIsDone(true);

    expect(task.isDone).toBeTruthy();

    task.setIsDone(false);

    expect(task.isDone).toBeFalsy();
  });

  it("toggles isDone state", () => {
    const text = "Buy milk";
    const task = Task.create(text);

    expect(task.isDone).toBeFalsy();

    task.toggle();

    expect(task.isDone).toBeTruthy();
  });
});
