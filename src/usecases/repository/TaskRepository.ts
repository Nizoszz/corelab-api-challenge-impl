import Task from "../../domain/Task";

export default interface TaskRepository {
  save(task: Task): Promise<void>;
  getById(taskId: string): Promise<Task | undefined>;
  getAll(): Promise<Task[]>;
  update(task: Task): Promise<void>;
  delete(taskId: string): Promise<void>;
}
