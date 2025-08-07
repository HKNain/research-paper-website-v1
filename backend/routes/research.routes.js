import express from "express";
import { profile, paper } from "../controllers/research.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/profile", protectRoute, profile);

router.post("/paper", protectRoute, paper);


export default router;