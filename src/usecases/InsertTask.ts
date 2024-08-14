import Task from "../domain/Task";
import TaskRepository from "./repository/TaskRepository";

export default class InsertTask {
  constructor(readonly taskRepository: TaskRepository) {}

  execute = async (input: Input): Promise<Output> => {
    const task = Task.create(input.title, input.content);
    await this.taskRepository.save(task);
    return {
      taskId: task.taskId,
    };
  };
}
type Input = {
  title: string;
  content: string;
};
type Output = {
  taskId: string;
};
