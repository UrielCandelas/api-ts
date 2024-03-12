import "dotenv/config";

import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

import { syncTables } from "./db";

import tasksRouter from "./routes/tasks.routes";

const app = express();

const PORT = process.env.PORT ?? 3001;

app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:4321", credentials: true }));

app.use("/api", tasksRouter);

syncTables();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
