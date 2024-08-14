import ExpressAdapter from "./http/ExpressAdapter";
import dotenv from "dotenv";
import { PgConnectionAdapter } from "./database/PgConnectionAdapter";
import TaskRepositoryDatabase from "./repository/TaskRepositoryDatabase";
import TaskController from "./http/TaskController";
import InsertTask from "./usecases/InsertTask";
import GetTask from "./usecases/GetTask";
import UpdateTask from "./usecases/UpdateTask";
import RemoveTask from "./usecases/RemoveTask";
import GetTasks from "./usecases/GetTasks";

dotenv.config();
const expressAdapter = new ExpressAdapter();
const port: number = 3000 || Number(process.env.APP_PORT);
const connection = PgConnectionAdapter.getInstance();
const repository = new TaskRepositoryDatabase(connection);
const insertTask = new InsertTask(repository);
const getTask = new GetTask(repository);
const getTasks = new GetTasks(repository);
const updateTask = new UpdateTask(repository);
const removeTask = new RemoveTask(repository);
const controller = new TaskController(
  repository,
  expressAdapter,
  insertTask,
  getTask,
  getTasks,
  updateTask,
  removeTask
);
expressAdapter.listen(port);
