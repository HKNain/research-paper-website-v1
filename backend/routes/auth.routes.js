import express from "express";
import { login, logout, signup, getMe , sendResetOtp , resetPassword , verifyOtp} from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import { changePassword } from "../controllers/auth.controller.js";
import User from "../models/user.model.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", protectRoute, getMe);

router.post("/request-reset", sendResetOtp); 

router.post("/verify-otp", verifyOtp);

router.patch("/changepassword", changePassword);



export default router;