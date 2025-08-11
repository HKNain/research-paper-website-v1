import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectToDatabase from "./database/connectToDatabase.js";
import authRoutes from "./routes/auth.routes.js";
import researchRoutes from "./routes/research.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// CORS — put it first to handle OPTIONS and set headers early
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));

  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  
  app.use("/api/auth", authRoutes);
  app.use("/api/research", researchRoutes);
  

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connectToDatabase();
});
