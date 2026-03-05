import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import { searchCandidates } from "../controllers/recruiterController.js";

const router = express.Router();

router.post("/search", userAuth, searchCandidates);

export default router;
