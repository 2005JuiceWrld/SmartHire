import mongoose, { Schema } from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job Title is Required!"],
    },
    description: {
      type: String,
      required: [true, "Job Description is Required!"],
    },
    requiredSkills: [{
      type: String,
      required: [true, "Required Skills are needed for matching!"],
    }],
    experienceLevel: {
      type: String,
      enum: ["Entry Level", "Mid Level", "Senior Level", "Director", "Executive"],
      default: "Entry Level",
    },
    recruiterId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    location: {
      type: String,
      default: "Remote",
    },
    salaryRange: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Active", "Closed"],
      default: "Active",
    }
  },
  { timestamps: true }
);

const Jobs = mongoose.model("Jobs", jobSchema);

export default Jobs;
