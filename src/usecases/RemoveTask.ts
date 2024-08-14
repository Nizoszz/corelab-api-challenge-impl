import TaskNotFoundException from "../domain/exception/TaskNotFoundException";
import TaskRepository from "./repository/TaskRepository";

export default class RemoveTask {
  constructor(readonly taskRepository: TaskRepository) {}

  execute = async (taskId: string): Promise<void> => {
    const existingNote = await this.taskRepository.getById(taskId);
    if (!existingNote) throw new TaskNotFoundException("Task not found", 404);
    await this.taskRepository.delete(taskId);
  };
}
