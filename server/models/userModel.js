import { mongoose, Schema } from "mongoose";

//userSchema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is Required!"],
    },
    lastName: {
      type: String,
      required: [true, "last Name is Required!"],
    },
    email: {
      type: String,
      required: [true, "Email is Required!"],
    },
    password: {
      type: String,
      required: [true, "Password is Required!"],
      minlength: [6, "Password length should be above 6 character"],
      select: true,
    },
    location: { type: String },
    profileUrl: { type: String },
    profession: { type: String },
    bio: { type: String },
    role: {
      type: String,
      enum: ["candidate", "recruiter", "admin"],
      default: "candidate",
    },
    experience: [{ type: Object }],
    skills: [{ type: String }],
    resumeSkills: [{ type: String }],
    education: [{ type: String }],
    resumeUrl: { type: String },
    resumeText: { type: String },
    atsScore: { type: Number, default: 0 },
    lastResumeAnalysisDate: { type: Date },
    keyStrengths: [{ type: String }],
    improvementSuggestions: [{ type: String }],
    recommendations: { type: Object },
    friends: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    views: [{ type: String }],
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.index({ email: 1, role: 1 }, { unique: true });

const Users = mongoose.model("Users", userSchema);
export default Users;
