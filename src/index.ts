import express, { Request, Response } from "express";
import cors from "cors";
import packageJSON from "./../package.json";
import v1Routes from "./v1/routes";
import { User } from "@prisma/client";
import { requestLogger } from "./utils/middlewares";

declare global {
  namespace Express {
    export interface Request {
      CurrentRequestUser: User;
    }
  }
}

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "You are running CoinFlowSystem",
    version: packageJSON.version,
  });
});

app.use("/api/v1", v1Routes);

app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
