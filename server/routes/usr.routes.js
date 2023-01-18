import { Router } from "express";
import {
	getUsr,
	createUsr,
	updateUsr,
	deleteUsr,
} from "../controllers/usr.controllers.js";

const router = Router();

// router.get("/fud", getFuds);
router.get("/usr/:rfc", getUsr);
router.post("/usr", createUsr);
router.put("/usr/:rfc", updateUsr);
router.delete("/usr/:rfc", deleteUsr);

export default router;
