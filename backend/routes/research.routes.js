import express from "express";
import { userProfile, getAllUserWithResearchPapersPosted, getuserResearchPaperToCheck, userPaperResult, sendConfirmationToBeRecieverNotifi, getNotifiToBeReciever, researchSubmit, AcceptedReviewer, acceptResearchPaperByReviewer } from "../controllers/research.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import { adminProtectRoute } from "../middleware/adminProtectRoute.js";
import { reviewerProtectRoute } from "../middleware/reviewerProtectRo0ute.js";
import multer from "multer";
const router = express.Router();
// memory storage
// Todo  AcceptedReviewer, acceptResearchPaperByReviewer


// const storage = multer(); // keeps file in memory as Buffer
const upload = multer();
router.get("/profile",protectRoute,userProfile)
router.post("/submit",protectRoute,upload.single("file"),researchSubmit)

router.get("/admin/papers",protectRoute,adminProtectRoute,getAllUserWithResearchPapersPosted)
router.get("/admin/papers/:id",protectRoute,adminProtectRoute,getuserResearchPaperToCheck)
router.patch("/admin/papers/:id/result",protectRoute,adminProtectRoute,userPaperResult)
router.patch("/admin/sender/:id",protectRoute, adminProtectRoute , sendConfirmationToBeRecieverNotifi)
router.get("/profile/notications",protectRoute,reviewerProtectRoute,getNotifiToBeReciever)

router.patch("/reviwerAccepted",protectRoute,reviewerProtectRoute,AcceptedReviewer)
router.patch("/reviwerResult",protectRoute,reviewerProtectRoute,acceptResearchPaperByReviewer)


export default router;