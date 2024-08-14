import Connection from "../database/Connection";
import Task from "../domain/Task";
import TaskRepository from "../usecases/repository/TaskRepository";

export default class TaskRepositoryDatabase implements TaskRepository {
  constructor(readonly connection: Connection) {}
  save = async (task: Task): Promise<void> => {
    await this.connection.query(
      "INSERT INTO teste_tecnico.tasks(task_id, title, content, color, is_favorite, created_at) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        task.taskId,
        task.title.getValue(),
        task.content.getValue(),
        task.color.getValue(),
        task.isFavorite.getValue(),
        task.createdAt,
      ]
    );
  };
  getById = async (taskId: string): Promise<Task | undefined> => {
    const [taskData] = await this.connection.query(
      "SELECT * FROM teste_tecnico.tasks WHERE task_id = $1",
      [taskId]
    );
    if (!taskData) return;
    return Task.restore(
      taskData.task_id,
      taskData.title,
      taskData.content,
      taskData.is_favorite,
      taskData.color,
      taskData.created_at
    );
  };
  getAll = async (): Promise<Task[]> => {
    const tasks: Task[] = [];
    const allTasksData = await this.connection.query(
      "SELECT * FROM teste_tecnico.tasks",
      []
    );
    for (const task of allTasksData) {
      tasks.push(task);
    }
    return tasks;
  };
  update = async (task: Task): Promise<void> => {
    await this.connection.query(
      "UPDATE teste_tecnico.tasks SET title = $2, content = $3, color = $4, is_favorite = $5 WHERE task_id = $1",
      [
        task.taskId,
        task.title.getValue(),
        task.content.getValue(),
        task.color.getValue(),
        task.isFavorite.getValue(),
      ]
    );
  };
  delete = async (taskId: string): Promise<void> => {
    await this.connection.query(
      "DELETE FROM teste_tecnico.tasks WHERE task_id = $1",
      [taskId]
    );
  };
}
