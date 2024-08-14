import { PgConnectionAdapter } from "../../../src/database/PgConnectionAdapter";
import GetTask from "../../../src/usecases/GetTask";
import InsertTask from "../../../src/usecases/InsertTask";
import TaskRepositoryDatabase from "../../../src/repository/TaskRepositoryDatabase";

test("should create a task", async () => {
  const connection = PgConnectionAdapter.getInstance();
  const repository = new TaskRepositoryDatabase(connection);
  const insertTask = new InsertTask(repository);
  const getTask = new GetTask(repository);
  const taskInput = { title: "title", content: "text", color: "#BAE2FF" };
  const outputInsertTask = await insertTask.execute(taskInput);
  const outputGetTask = await getTask.execute(outputInsertTask.taskId);
  expect(outputGetTask.taskId).toBe(outputInsertTask.taskId);
});

afterAll(async () => {
  const connection = PgConnectionAdapter.getInstance();
  await connection.query("DELETE FROM teste_tecnico.tasks", []);
  await connection.close();
});
