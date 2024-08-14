import GetTask from "../usecases/GetTask";
import TaskRepository from "../usecases/repository/TaskRepository";
import Http from "./Https";
import InsertTask from "../usecases/InsertTask";
import GetTasks from "../usecases/GetTasks";
import UpdateTask from "../usecases/UpdateTask";
import RemoveTask from "../usecases/RemoveTask";
import TaskNotFoundException from "../domain/exception/TaskNotFoundException";
import BadRequestException from "../domain/exception/BadRequestException";

export default class TaskController {
  constructor(
    readonly taskRepository: TaskRepository,
    readonly http: Http,
    readonly insertTask: InsertTask,
    readonly getTask: GetTask,
    readonly getTasks: GetTasks,
    readonly updateTask: UpdateTask,
    readonly removeTask: RemoveTask
  ) {
    http.register("post", "/tasks", async (params: any, body: any) => {
      try {
        const result = await insertTask.execute(body);
        return {
          statusCode: 201,
          body: result,
        };
      } catch (error) {
        return this.handleError(error);
      }
    });

    http.register("get", "/tasks", async (params: any, body: any) => {
      try {
        const result = await getTasks.execute();
        return {
          statusCode: 200,
          body: result,
        };
      } catch (error) {
        return this.handleError(error);
      }
    });

    http.register("get", "/tasks/:taskId", async (params: any, body: any) => {
      try {
        const { taskId } = params;
        const result = await getTask.execute(taskId);
        return {
          statusCode: 200,
          body: result,
        };
      } catch (error) {
        return this.handleError(error);
      }
    });

    http.register("patch", "/tasks/:taskId", async (params: any, body: any) => {
      try {
        const { taskId } = params;
        const result = await updateTask.execute(body, taskId);
        return {
          statusCode: 200,
          body: result,
        };
      } catch (error) {
        return this.handleError(error);
      }
    });

    http.register(
      "delete",
      "/tasks/:taskId",
      async (params: any, body: any) => {
        try {
          const { taskId } = params;
          await removeTask.execute(taskId);
          return {
            statusCode: 204, // No Content
          };
        } catch (error) {
          return this.handleError(error);
        }
      }
    );
  }

  private handleError(error: any): { statusCode: number; body?: any } {
    if (error instanceof TaskNotFoundException) {
      return {
        statusCode: 404, // Not Found
        body: { message: error.message },
      };
    }
    if (error instanceof BadRequestException) {
      return {
        statusCode: 400, // Not Found
        body: { message: error.message },
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        statusCode: 500, // Internal Server Error
        body: { message: "An unexpected error occurred" },
      };
    }
  }
}
