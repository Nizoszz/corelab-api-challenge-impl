import { PgConnectionAdapter } from "../../../src/database/PgConnectionAdapter";

test("Deve criar uma conexão com o banco de dados", async () => {
    const connection = PgConnectionAdapter.getInstance();
    const tasksData = await connection.query("SELECT * FROM teste_tecnico.tasks", []);
    expect(tasksData).toHaveLength(0);
});

afterEach(async () => {
  const connection = PgConnectionAdapter.getInstance();
  await connection.query("DELETE FROM teste_tecnico.tasks", []);
  await connection.close();
});