import express from "express";
import isAdmin from "../middleware/adminMiddleware.js";
import { 
  getStats, 
  getAllUsers, 
  deleteUser, 
  getAllJobs, 
  deleteJob 
} from "../controllers/adminController.js";

const router = express.Router();

// Admin Stats
router.get("/stats", isAdmin, getStats);

// Admin User Management
router.get("/users", isAdmin, getAllUsers);
router.delete("/users/:id", isAdmin, deleteUser);

// Admin Job Management
router.get("/jobs", isAdmin, getAllJobs);
router.delete("/jobs/:id", isAdmin, deleteJob);

export default router;
