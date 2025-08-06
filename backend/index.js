import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./database/connectToDatabase.js";

const PORT = process.env.PORT | 5000;
const app = express();

dotenv.config();

app.use("/api/auth/", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connectToDatabase();
})