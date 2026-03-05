import mongoose from "mongoose";
import dotenv from "dotenv";
import Users from "../models/userModel.js";
import { hashString } from "../utils/index.js";
import dbConnection from "../dbConfig/index.js";

dotenv.config({ path: "./server/.env" });

const seedAdmin = async () => {
  try {
    await dbConnection();

    const adminEmail = "admin@test.com";
    const adminPassword = "admin123";
    
    // Check if admin already exists
    const adminExists = await Users.findOne({ email: adminEmail, role: "admin" });

    if (adminExists) {
      console.log("Admin user already exists!");
      process.exit(0);
    }

    const hashedPassword = await hashString(adminPassword);

    const adminUser = {
      firstName: "System",
      lastName: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      verified: true,
    };

    await Users.create(adminUser);
    console.log("Admin user created successfully!");
    console.log("Email: admin@test.com");
    console.log("Password: admin123");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin user:", error);
    process.exit(1);
  }
};

seedAdmin();
