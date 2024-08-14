import TaskNotFoundException from "../domain/exception/TaskNotFoundException";
import Task from "../domain/Task";
import TaskRepository from "./repository/TaskRepository";

export default class UpdateTask {
  constructor(readonly taskRepository: TaskRepository) {}

  execute = async (input: Input, id: string): Promise<Output> => {
    const existingTask = await this.taskRepository.getById(id);
    if (!existingTask) throw new TaskNotFoundException("Task not found", 404);
    const updateTask = Task.restore(
      existingTask.taskId,
      input.title ?? existingTask.title.getValue(),
      input.content ?? existingTask.content.getValue(),
      input.isFavorite ?? existingTask.isFavorite.getValue(),
      input.color ?? existingTask.color.getValue(),
      existingTask.createdAt
    );
    await this.taskRepository.update(updateTask);
    return {
      taskId: updateTask.taskId,
    };
  };
}
type Input = {
  title?: string;
  content?: string;
  color?: string;
  isFavorite?: boolean;
};
type Output = {
  taskId: string;
};
