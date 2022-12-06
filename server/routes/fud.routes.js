import { Router } from "express";
import {
	getFuds,
	getFud,
	createFuds,
	updateFuds,
	deleteFuds,
} from "../controllers/fud.controllers.js";

const router = Router();

router.get("/fud", getFuds);
router.get("/fud/:id", getFud);
router.post("/fud", createFuds);
router.put("/fud/:id", updateFuds);
router.delete("/fud/:id", deleteFuds);

export default router;
