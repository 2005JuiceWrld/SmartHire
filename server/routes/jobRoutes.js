import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import { createJob, getMyJobs, getJobMatches } from "../controllers/recruiterController.js";

const router = express.Router();

router.post("/create", userAuth, createJob);
router.get("/my-jobs", userAuth, getMyJobs);
router.get("/:id/matches", userAuth, getJobMatches);

export default router;
