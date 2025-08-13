import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectToDatabase from "./database/connectToDatabase.js";
import authRoutes from "./routes/auth.routes.js";
import researchRoutes from "./routes/research.routes.js";
import emailRoutes from "./routes/email.routes.js"

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

// CORS — put it first to handle OPTIONS and set headers early
app.use(cors({
    origin:  "http://localhost:5173",
    credentials: true,
    // methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    // allowedHeaders: ["Content-Type", "Authorization"],
}));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/email", emailRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connectToDatabase();
});
