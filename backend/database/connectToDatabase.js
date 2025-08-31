import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Make sure this is called before using process.env

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("Error connecting to Mongodb", error.message);
  }
};

export default connectToDatabase;