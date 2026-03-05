import mongoose from "mongoose";
import dotenv from "dotenv";
import Users from "../models/userModel.js";
import { hashString } from "../utils/index.js";

dotenv.config();

const candidates = [
  {
    firstName: "Amit",
    lastName: "Sharma",
    email: "amit.sharma@example.com",
    password: "password123",
    role: "candidate",
    profession: "Full Stack Developer",
    skills: ["React", "Node.js", "MongoDB", "Express.js", "JavaScript"],
    resumeSkills: ["React", "Redux", "Node.js", "Docker", "AWS"],
    location: "Mumbai, India",
    verified: true,
  },
  {
    firstName: "Priya",
    lastName: "Patel",
    email: "priya.patel@example.com",
    password: "password123",
    role: "candidate",
    profession: "Data Scientist",
    skills: ["Python", "Machine Learning", "SQL", "Pandas", "Scikit-learn"],
    resumeSkills: ["Python", "TensorFlow", "NLP", "Tableau", "SQL"],
    location: "Bangalore, India",
    verified: true,
  },
  {
    firstName: "Rahul",
    lastName: "Verma",
    email: "rahul.verma@example.com",
    password: "password123",
    role: "candidate",
    profession: "Backend Engineer",
    skills: ["Java", "Spring Boot", "MySQL", "Microservices", "Docker"],
    resumeSkills: ["Java", "Kafka", "PostgreSQL", "Kubernetes", "Redis"],
    location: "Delhi, India",
    verified: true,
  },
  {
    firstName: "Anjali",
    lastName: "Singh",
    email: "anjali.singh@example.com",
    password: "password123",
    role: "candidate",
    profession: "Frontend Developer",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    resumeSkills: ["React", "TypeScript", "Next.js", "Figma", "SASS"],
    location: "Pune, India",
    verified: true,
  },
  {
    firstName: "Vikram",
    lastName: "Rao",
    email: "vikram.rao@example.com",
    password: "password123",
    role: "candidate",
    profession: "DevOps Engineer",
    skills: ["AWS", "Terraform", "Jenkins", "Docker", "Linux"],
    resumeSkills: ["AWS", "Azure", "CI/CD", "Prometheus", "Ansible"],
    location: "Hyderabad, India",
    verified: true,
  },
  {
    firstName: "Sneha",
    lastName: "Gupta",
    email: "sneha.gupta@example.com",
    password: "password123",
    role: "candidate",
    profession: "ML Engineer",
    skills: ["Python", "Deep Learning", "PyTorch", "NumPy", "OpenCV"],
    resumeSkills: ["Python", "Keras", "MLOps", "NLP", "Computer Vision"],
    location: "Chennai, India",
    verified: true,
  },
  {
    firstName: "Rohan",
    lastName: "Mehta",
    email: "rohan.mehta@example.com",
    password: "password123",
    role: "candidate",
    profession: "Python Developer",
    skills: ["Python", "Django", "Flask", "PostgreSQL", "Git"],
    resumeSkills: ["Python", "FastAPI", "Celery", "RabbitMQ", "Pytest"],
    location: "Ahmedabad, India",
    verified: true,
  },
  {
    firstName: "Kavita",
    lastName: "Joshi",
    email: "kavita.joshi@example.com",
    password: "password123",
    role: "candidate",
    profession: "Software Engineer",
    skills: ["C++", "Algorithms", "Data Structures", "System Design"],
    resumeSkills: ["C++", "Java", "Multithreading", "Distributed Systems"],
    location: "Gurgaon, India",
    verified: true,
  },
  {
    firstName: "Deepak",
    lastName: "Nair",
    email: "deepak.nair@example.com",
    password: "password123",
    role: "candidate",
    profession: "Cloud Architect",
    skills: ["GCP", "Kubernetes", "Go", "Cloud Security", "Serverless"],
    resumeSkills: ["GCP", "Python", "Istio", "Cloud Functions", "Terraform"],
    location: "Kochi, India",
    verified: true,
  },
  {
    firstName: "Pooja",
    lastName: "Bose",
    email: "pooja.bose@example.com",
    password: "password123",
    role: "candidate",
    profession: "Full Stack Engineer",
    skills: ["JavaScript", "React", "Node.js", "GraphQL", "PostgreSQL"],
    resumeSkills: ["JavaScript", "Prisma", "Apollo", "Redis", "TypeScript"],
    location: "Kolkata, India",
    verified: true,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to database for seeding...");

    // Clear existing candidates if needed (optional)
    // await Users.deleteMany({ role: "candidate" });

    const hashedPassword = await hashString("password123");

    const usersToInsert = candidates.map((c) => ({
      ...c,
      password: hashedPassword,
    }));

    // Use insertMany but handle duplicates by email
    for (const user of usersToInsert) {
      await Users.findOneAndUpdate({ email: user.email }, user, {
        upsert: true,
        new: true,
      });
    }

    console.log("Successfully seeded 10 candidates.");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
