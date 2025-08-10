import express from "express";
import { userProfile, getAllUserWithResearchPapersPosted, getuserResearchPaperToCheck, userPaperResult, sendConfirmationToBeRecieverNotifi, getNotifiToBeReciever, AcceptedReviewer, acceptResearchPaperByReviewer } from "../controllers/research.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import { adminProtectRoute } from "../middleware/adminProtectRoute.js";
import { reviewerProtectRoute } from "../middleware/reviewerProtectRo0ute.js";

const router = express.Router();

router.get("/profile",protectRoute,userProfile)

router.get("/admin/papers",protectRoute,adminProtectRoute,getAllUserWithResearchPapersPosted)
router.get("/admin/papers/:id",protectRoute,adminProtectRoute,getuserResearchPaperToCheck)
router.patch("/admin/papers/:id/result",protectRoute,adminProtectRoute,userPaperResult)
router.patch("admin/sender/:id",protectRoute, adminProtectRoute , sendConfirmationToBeRecieverNotifi)
router.get("/profile/notications",protectRoute,reviewerProtectRoute,getNotifiToBeReciever)

router.patch("/reviwerAccepted",protectRoute,reviewerProtectRoute,AcceptedReviewer)
router.patch("/reviwerResult",protectRoute,reviewerProtectRoute,acceptResearchPaperByReviewer)


export default router;