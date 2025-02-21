import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "your_mongodb_connection_string";

if (!MONGODB_URI) throw new Error("MongoDB URI is missing");

export const connectDB = async () => {
  mongoose.connect(MONGODB_URI);
};
