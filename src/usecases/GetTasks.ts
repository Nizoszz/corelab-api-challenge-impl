import Task from "../domain/Task";
import TaskRepository from "./repository/TaskRepository";

export default class GetTasks {
  constructor(readonly taskRepository: TaskRepository) {}

  execute = async (): Promise<Task[]> => {
    const outputTasks = await this.taskRepository.getAll();
    return outputTasks;
  };
}
