import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    // ! Right now changign to local mongoDB 
    await mongoose.connect("mongodb://127.0.0.1:27017/research");
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(" Error connecting to Mongodb", error.message);
  }
};

export default connectToDatabase;