import pgPromise, { IDatabase, IMain } from "pg-promise";
import dotenv from "dotenv";
import Connection from "./Connection";

export class PgConnectionAdapter implements Connection {
  private db: IDatabase<Connection>;
  private static instance: PgConnectionAdapter;
  private constructor() {
    const pgp: IMain = pgPromise();
    const connectionConfig = {
      connectionString: process.env.DATABASE_URL!
    };
    this.db = pgp(connectionConfig);
  }

  static readonly getInstance = () => {
    dotenv.config();
    if (!PgConnectionAdapter.instance) {
      this.instance = new PgConnectionAdapter();
    }
    return PgConnectionAdapter.instance;
  };

  query = async (statement: string, params: any[]): Promise<any> => {
    return await this.db.query(statement, params);
  };
  close = async (): Promise<void> => {
    await this.db.$pool.end();
  }

}
  