import { PgConnectionAdapter } from "../../../src/database/PgConnectionAdapter";
import GetTask from "../../../src/usecases/GetTask";
import InsertTask from "../../../src/usecases/InsertTask";
import TaskRepositoryDatabase from "../../../src/repository/TaskRepositoryDatabase";
import RemoveTask from "../../../src/usecases/RemoveTask";

test("should remove a task", async () => {
  const connection = PgConnectionAdapter.getInstance();
  const repository = new TaskRepositoryDatabase(connection);
  const insertTask = new InsertTask(repository);
  const getTask = new GetTask(repository);
  const removeTask = new RemoveTask(repository);
  const taskInput = { title: "title", content: "text", color: "#BAE2FF" };
  const outputInsertTask = await insertTask.execute(taskInput);
  await removeTask.execute(outputInsertTask.taskId);
  await expect(getTask.execute(outputInsertTask.taskId)).rejects.toThrow(
    "Task not found"
  );
});

afterAll(async () => {
  const connection = PgConnectionAdapter.getInstance();
  await connection.close();
});
