import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const fixIndexes = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected.");

    const collection = mongoose.connection.db.collection("users");
    
    console.log("Checking current indexes...");
    const indexes = await collection.indexes();
    console.log("Existing indexes:", indexes.map(i => i.name));

    if (indexes.find(i => i.name === "email_1")) {
      console.log("Dropping old unique email index...");
      await collection.dropIndex("email_1");
      console.log("Successfully dropped 'email_1' index.");
    } else {
      console.log("Old 'email_1' index not found. It might have been renamed or already removed.");
    }

    console.log("The new compound index { email: 1, role: 1 } will be recreated by Mongoose on next start.");
    
    process.exit(0);
  } catch (error) {
    console.error("Error fixing indexes:", error);
    process.exit(1);
  }
};

fixIndexes();
