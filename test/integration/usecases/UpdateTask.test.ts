import { PgConnectionAdapter } from "../../../src/database/PgConnectionAdapter";
import GetTask from "../../../src/usecases/GetTask";
import InsertTask from "../../../src/usecases/InsertTask";
import TaskRepositoryDatabase from "../../../src/repository/TaskRepositoryDatabase";
import UpdateTask from "../../../src/usecases/UpdateTask";

test("should update a task", async () => {
  const connection = PgConnectionAdapter.getInstance();
  const repository = new TaskRepositoryDatabase(connection);
  const insertTask = new InsertTask(repository);
  const getTask = new GetTask(repository);
  const updateTask = new UpdateTask(repository);
  const taskInput = { title: "title", content: "text", color: "#BAE2FF" };
  const outputInsertTask = await insertTask.execute(taskInput);
  const taskInputUpdate = { color: "#DAFF8B", isFavorite: true };
  const outputUpdateTask = await updateTask.execute(
    taskInputUpdate,
    outputInsertTask.taskId
  );
  const outputGetTask = await getTask.execute(outputUpdateTask.taskId);
  expect(outputInsertTask.taskId).toBe(outputGetTask.taskId);
  expect(taskInputUpdate.color).toBe(outputGetTask.color.getValue());
  expect(taskInputUpdate.isFavorite).toBe(outputGetTask.isFavorite.getValue());
});

afterAll(async () => {
  const connection = PgConnectionAdapter.getInstance();
  await connection.query("DELETE FROM teste_tecnico.tasks", []);
  await connection.close();
});
