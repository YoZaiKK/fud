import { Router } from "express";
import {
	getTasks,
	getTask,
	createTasks,
	updateTasks,
	deleteTasks,
} from "../controllers/taks.controllers.js";
const router = Router();

router.get("/task", getTasks);
router.get("/task/:id", getTask);
router.post("/task", createTasks);
router.put("/task/:id", updateTasks);
router.delete("/task/:id", deleteTasks);

export default router;
