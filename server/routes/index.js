import express from "express";
import authRoute from "./authRoutes.js";
import userRoute from "./userRoutes.js";
import postRoute from "./postRoutes.js";
import recruiterRoute from "./recruiterRoutes.js";
import jobRoute from "./jobRoutes.js";
import adminRoute from "./adminRoutes.js";

const router = express.Router();

router.use("/auth", authRoute); //auth/register
router.use("/users", userRoute); //user route
router.use("/posts", postRoute); //post route
router.use("/api/recruiter", recruiterRoute); //recruiter route
router.use("/api/jobs", jobRoute); //job route
router.use("/api/admin", adminRoute); //admin route

export default router;
