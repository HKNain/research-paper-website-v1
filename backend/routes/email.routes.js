import express from "express";
import mailSender from "../utils/emailSender.js";

const router = express.Router();

router.post("/send", async (req, res) => {
  req.body.to = req.body.to || "receiver@example.com";
  await mailSender(req, res);
});

export default router;
