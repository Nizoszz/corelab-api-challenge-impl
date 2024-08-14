import axios from "axios";
import { PgConnectionAdapter } from "../../../src/database/PgConnectionAdapter";
import TaskRepositoryDatabase from "../../../src/repository/TaskRepositoryDatabase";
import InsertTask from "../../../src/usecases/InsertTask";
import Connection from "../../../src/database/Connection";
import GetTask from "../../../src/usecases/GetTask";

let insertTask: InsertTask;
let connection: Connection;
let getTask: GetTask;
beforeEach(async () => {
  connection = PgConnectionAdapter.getInstance();
  const repository = new TaskRepositoryDatabase(connection);
  insertTask = new InsertTask(repository);
  getTask = new GetTask(repository);
});

test("should testing the API /tasks (POST)", async () => {
  const input = {
    title: "Task test",
    content: "application tasks to test",
    color: "default",
  };
  const response = await axios({
    url: "http://localhost:3000/tasks",
    method: "POST",
    data: input,
  });
  const taskOutput = response.data.body;
  const outputGetTask = await getTask.execute(taskOutput.taskId);
  expect(taskOutput.taskId).toBeTruthy();
  expect(outputGetTask.title.getValue()).toBe(input.title);
  expect(outputGetTask.content.getValue()).toBe(input.content);
  expect(outputGetTask.color.getValue()).toBe(input.color);
});

test("should testing the API /tasks (GET)", async () => {
  const input = {
    title: "Task test",
    content: "application task to test",
    color: "default",
  };
  const test = await insertTask.execute(input);
  const response = await axios({
    url: "http://localhost:3000/tasks",
    method: "GET",
  });
  const tasksOuput = response.data.body;

  expect(tasksOuput).toHaveLength(1);
});

test("should testing the API /tasks/:id (GET)", async () => {
  const input = {
    title: "Task test",
    content: "application task to test",
    color: "default",
  };
  const insertTaskOutput = await insertTask.execute(input);
  const response = await axios({
    url: `http://localhost:3000/tasks/${insertTaskOutput.taskId}`,
    method: "GET",
  });
  const taskOutput = response.data.body;
  expect(insertTaskOutput.taskId).toBe(taskOutput.taskId);
});

test("should testing the API /tasks/:id (UPDATE)", async () => {
  const input = {
    title: "Task test",
    content: "application task to test",
    color: "default",
  };
  const insertTaskOutput = await insertTask.execute(input);
  const inputUpdate = {
    color: "#CDCDCD",
  };
  const response = await axios({
    url: `http://localhost:3000/tasks/${insertTaskOutput.taskId}`,
    method: "PATCH",
    data: inputUpdate,
  });
  const taskOutput = response.data.body;
  const taskGetOutput = await getTask.execute(taskOutput.taskId);
  expect(taskGetOutput.color.getValue()).toBe(inputUpdate.color);
});

test("should testing the API /tasks/:id (DELETE)", async () => {
  const input = {
    title: "Task test",
    content: "application task to test",
    color: "default",
  };
  const insertTaskOutput = await insertTask.execute(input);
  const response = await axios({
    url: `http://localhost:3000/tasks/${insertTaskOutput.taskId}`,
    method: "DELETE",
  });
  await expect(getTask.execute(response.data.body)).rejects.toThrow(
    "Task not found"
  );
});

afterEach(async () => {
  await connection.query("DELETE FROM teste_tecnico.tasks", []);
});

afterAll(async () => {
  await connection.close();
});
