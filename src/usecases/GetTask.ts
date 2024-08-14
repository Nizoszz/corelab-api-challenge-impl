import TaskNotFoundException from "../domain/exception/TaskNotFoundException";
import Task from "../domain/Task";
import TaskRepository from "./repository/TaskRepository";

export default class GetTask {
  constructor(readonly taskRepository: TaskRepository) {}

  execute = async (taskId: string): Promise<Task> => {
    const existingTask = await this.taskRepository.getById(taskId);
    if (!existingTask) throw new TaskNotFoundException("Task not found", 404);
    return existingTask;
  };
}
