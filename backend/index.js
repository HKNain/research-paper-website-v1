import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectToDatabase from "./database/connectToDatabase.js";
import authRoutes from "./routes/auth.routes.js";
import researchRoutes from "./routes/research.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/research", researchRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connectToDatabase();
});
