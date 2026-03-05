import Users from "../models/userModel.js";
import Jobs from "../models/Job.js";

export const getStats = async (req, res, next) => {
  try {
    const totalUsers = await Users.countDocuments();
    const totalCandidates = await Users.countDocuments({ role: "candidate" });
    const totalRecruiters = await Users.countDocuments({ role: "recruiter" });
    const totalJobs = await Jobs.countDocuments();
    
    // Resume analyzed stats based on whether ATS score is greater than zero
    const totalResumesAnalyzed = await Users.countDocuments({ atsScore: { $gt: 0 } });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalCandidates,
        totalRecruiters,
        totalJobs,
        totalResumesAnalyzed,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.find().select("-password");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const user = await Users.findById(id);
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }
    
    // prevent admin from deleting themselves if needed, but not specified in instructions
    
    await Users.findByIdAndDelete(id);
    
    res.status(200).json({
      success: true,
      message: "User account deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Jobs.find().populate("recruiterId", "firstName lastName");
    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const job = await Jobs.findById(id);
    if (!job) {
        return res.status(404).json({ message: "Job not found!" });
    }
    
    await Jobs.findByIdAndDelete(id);
    
    res.status(200).json({
      success: true,
      message: "Job removed successfully!",
    });
  } catch (error) {
    next(error);
  }
};
