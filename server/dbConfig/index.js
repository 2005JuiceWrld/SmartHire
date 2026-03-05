import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    console.log("Mongo URL:", process.env.MONGO_URL); // 👈 ADD THIS

    await mongoose.connect(process.env.MONGO_URL);

    console.log("Database Connected");
  } catch (error) {
    console.log("Error in Connecting to Database", error);
  }
};

export default dbConnection;