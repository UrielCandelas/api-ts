import { Router } from "express";

import {
  registerNewTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controllers";

const router = Router();

router.post("/register", registerNewTask);
router.get("/get", getTasks);
router.get("/get/:id", getTask);
router.put("/update", updateTask);
router.delete("/delete/:id", deleteTask);

export default router;
