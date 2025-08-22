import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { adminProtectRoute } from "../middleware/adminProtectRoute.js";
import { reviewerProtectRoute } from "../middleware/reviewerProtectRoute.js";
import multer from "multer";
import { 
    userProfile, 
    getAllUserWithResearchPapersPosted, 
    getuserResearchPaperToCheck, 
    userPaperResult, 
    sendConfirmationToBeRecieverNotifi, 
    getNotifiToBeReciever, 
    researchSubmit, 
    AcceptedReviewer, 
    // acceptResearchPaperByReviewer, 
    getAllReviewers, 
    assignReviewerToPaper, 
    getReviewerTasks, 
    submitReviewerReview 
  } from "../controllers/research.controller.js";
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
router.get("/profile/notifications",protectRoute,reviewerProtectRoute,getNotifiToBeReciever)

router.get("/admin/reviewers", protectRoute, adminProtectRoute, getAllReviewers);
router.patch("/admin/papers/:uploadId/assign-reviewer", protectRoute, adminProtectRoute, assignReviewerToPaper);

router.get("/reviewer/tasks", protectRoute, reviewerProtectRoute, getReviewerTasks);
router.post("/reviewer/review/:uploadId", protectRoute, reviewerProtectRoute, submitReviewerReview);

router.patch("/reviewerAccepted/:id",protectRoute,reviewerProtectRoute,AcceptedReviewer)
// router.patch("/reviewerResult/:id",protectRoute,reviewerProtectRoute,acceptResearchPaperByReviewer)


export default router;