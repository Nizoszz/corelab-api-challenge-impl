import Http from "./Https";
import express from "express";
import cors from "cors";
import TaskNotFoundException from "../domain/exception/TaskNotFoundException";

export default class ExpressAdapter implements Http {
  app: any;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }
  register(method: string, url: string, callback: Function): void {
    this.app[method](url.replace(/\{|\}/g, ""), async (req: any, res: any) => {
      try {
        const { statusCode, body } = await callback(req.params, req.body);
        res.status(statusCode).json({ statusCode, body });
      } catch (e: any) {
        if (e instanceof TaskNotFoundException) {
          res.status(404).json({ message: e.message });
        } else {
          res.status(500).json({
            message: "Internal server error",
          });
        }
      }
    });
  }
  listen = (port: number): void => {
    this.app.listen(port, async (): Promise<void> => {
      console.log(`Server is running on port ${port}`);
    });
  };
}
