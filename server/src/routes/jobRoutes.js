import express from "express";
import { auth } from "../middleware/auth.js";
import { createJob, getJobs, updateJob, deleteJob } from "../controllers/jobController.js";
const router = express.Router();

router.use(auth);
router.post("/", createJob);
router.get("/", getJobs);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;
