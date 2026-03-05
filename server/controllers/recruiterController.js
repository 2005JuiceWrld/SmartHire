import Users from "../models/userModel.js";
import Jobs from "../models/Job.js";
import { matchCandidates } from "../utils/matchingEngine.js";

// Quick Skill-Based Search
export const searchCandidates = async (req, res) => {
  try {
    const { skills } = req.body;
    
    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ message: "Please provide a list of skills to search." });
    }

    // 1. Fetch all candidates
    const candidates = await Users.find({ role: "candidate" })
      .select("firstName lastName email profileUrl profession location skills resumeSkills");

    // 2. Run Matching Engine
    // Combine manual skills and resume skills for better matching if desired, 
    // or just use 'skills' field. Let's assume 'skills' field is the primary one.
    // If a candidate has resumeSkills but no manual skills, we might want to merge them.
    
    const candidatesWithSkills = candidates.map(c => {
        const combinedSkills = [...new Set([...(c.skills || []), ...(c.resumeSkills || [])])];
        return {
            ...c.toObject(),
            skills: combinedSkills
        };
    });

    const rankedCandidates = matchCandidates(skills, candidatesWithSkills);

    res.status(200).json({
      success: true,
      data: rankedCandidates,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Create Job Post
export const createJob = async (req, res) => {
  try {
    const { userId } = req.body.user; // From auth middleware
    const { title, description, requiredSkills, experienceLevel, location, salaryRange } = req.body;

    if (!title || !description || !requiredSkills) {
      return res.status(400).json({ message: "Title, Description and Skills are required." });
    }

    const job = await Jobs.create({
      title,
      description,
      requiredSkills, // Ensure this is an array
      experienceLevel,
      location,
      salaryRange,
      recruiterId: userId,
    });

    res.status(201).json({
      success: true,
      message: "Job Posted Successfully",
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get Recruiter's Jobs
export const getMyJobs = async (req, res) => {
  try {
    const { userId } = req.body.user;
    
    const jobs = await Jobs.find({ recruiterId: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get Matches for a Specific Job
export const getJobMatches = async (req, res) => {
  try {
    const { id } = req.params; // Job ID
    const { userId } = req.body.user; // Recruiter ID (security check)

    const job = await Jobs.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.recruiterId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to view matches for this job" });
    }

    // 1. Fetch Candidates
    const candidates = await Users.find({ role: "candidate" })
      .select("firstName lastName email profileUrl profession location skills resumeSkills");

    // 2. Prepare Candidates (Merge skills)
    const candidatesWithSkills = candidates.map(c => {
        const combinedSkills = [...new Set([...(c.skills || []), ...(c.resumeSkills || [])])];
        return {
            ...c.toObject(),
            skills: combinedSkills
        };
    });

    // 3. Run Matching Engine
    const rankedCandidates = matchCandidates(job.requiredSkills, candidatesWithSkills);

    res.status(200).json({
      success: true,
      jobTitle: job.title,
      data: rankedCandidates,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
