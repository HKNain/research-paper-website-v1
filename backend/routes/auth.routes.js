import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import User from "../models/user.model.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

// router.get("/me", protectRoute , async (req , res)=>{
//     const user = await User.findById(req.user._id).select("-password")
//     return res.status(200).json({
//         message : " hitted me route ",
//         userInfo : {
//             _id: req.user._id, 
//             name: user.name,
//             email: user.email
//         }
//     })
// })

export default router;