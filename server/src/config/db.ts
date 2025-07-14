import mongoose from "mongoose";
import { mongo_uri } from ".";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongo_uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
};
