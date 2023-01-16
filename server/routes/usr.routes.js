
import { Router } from "express";
import {
	getUsr, 
} from "../controllers/usr.controllers.js";

const router = Router();

// router.get("/fud", getFuds);
router.get("/usr/:rfc", getUsr);
// router.post("/fud", createFuds);
// router.put("/fud/:id", updateFuds);
// router.delete("/fud/:id", deleteFuds);

export default router;