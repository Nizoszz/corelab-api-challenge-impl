import { PgConnectionAdapter } from "../../../src/database/PgConnectionAdapter";
import InsertTask from "../../../src/usecases/InsertTask";
import TaskRepositoryDatabase from "../../../src/repository/TaskRepositoryDatabase";
import GetTasks from "../../../src/usecases/GetTasks";

test("should receive all tasks", async () => {
  const connection = PgConnectionAdapter.getInstance();
  const repository = new TaskRepositoryDatabase(connection);
  const insertTask = new InsertTask(repository);
  const getTasks = new GetTasks(repository);
  const taskInput = { title: "title", content: "text", color: "#BAE2FF" };
  await insertTask.execute(taskInput);
  const outputTasks = await getTasks.execute();
  expect(outputTasks).toHaveLength(1);
});

afterAll(async () => {
  const connection = PgConnectionAdapter.getInstance();
  await connection.query("DELETE FROM teste_tecnico.tasks", []);
  await connection.close();
});
