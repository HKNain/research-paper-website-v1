import researchPaper from "../models/researchpaper.model.js";
import User from "../models/user.model.js";
import nodemailer from "nodemailer"
import FormData from "form-data"; 
import axios from "axios";

/*

! This is How Schema Willl Lokk like for research paper 


*/
 




const IMAGEKIT_PRIVATE_KEY = "private_vnkO3EDEJvdyiW4jTW4i3gBKHWQ=";
const IMAGEKIT_UPLOAD_URL =  "https://upload.imagekit.io/api/v1/files/upload"

export const researchSubmit = async (req, res) => {
  try {
    const { category } = req.body; // example extra fields
    const fileBuffer = req.file.buffer; // uploaded file
    const fileName = req.file.originalname;
    const isAuthor = await researchPaper.findOne({author:req.user.id})

    // Prepare form for ImageKit
    const form = new FormData();
    form.append("file", fileBuffer.toString("base64"));
    form.append("fileName", fileName);

    // Upload to ImageKit
    const response = await axios.post(IMAGEKIT_UPLOAD_URL, form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Basic ${Buffer.from(IMAGEKIT_PRIVATE_KEY + ":").toString("base64")}`,
      },
    });

    const fileUrl = response.data.url;

    if (isAuthor){
      isAuthor.researchPaperUploads.push({
        researchPaperPdfUrl : fileUrl,
        categoryType:category
       })

       const userResearchPaper = await isAuthor.save()
      console.log(userResearchPaper)
    }else {

      const userResearchPaper = await researchPaper.create({
       author:req.user._id, 
       researchPaperUploads :  [{
        researchPaperPdfUrl : fileUrl,
        categoryType:category
       }]
        
      });
       console.log(userResearchPaper)
    }

    return res.status(200).json({
      message: "Research paper uploaded successfully",
      fileUrl,
      
    });

  } catch (error) {
    console.log("error in researchPost", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/*
{
! DOne 
   * "success": "user Profile ",

*/
//  * Working perfectly 
export const userProfile = async (req, res) => {
  try {
    const user = req.user
    const userId = user._id;
    const userResearchPaper = await researchPaper.find({ author: userId }).select("-password")
    const userInfo = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      collegeName: user.collegeName,
      researchPapers: userResearchPaper,


    }
    console.log(userInfo)
    return res.status(200).json({
      success: "user Profile ",
      userInfo
    })
  } catch (error) {
    console.log(" error in userprofile ", error)
    return res.status(500).json({ message: " Internal server error" })
  }

}

// * This is for when admin have to search for via email or unique of uuidv4 and when clicked leadeed to the researchpaper approval and so on 
// * Done ....
/* 
{
? This is your Data that will look alike for getAllUsers 

*/
export const getAllUserWithResearchPapersPosted = async (req, res) => {
  try {
    const papers = await researchPaper.find()
      .populate("author", "email role firstName lastName");

    const usefulPapers = papers.map((paper) => {
      return paper.researchPaperUploads.map((upload) => ({
        email: paper.author.email,
        role: paper.author.role,
        firstName: paper.author.firstName,
        lastName: paper.author.lastName,
        linkOfPdf: upload.researchPaperPdfUrl,
        category: upload.categoryType,
        stats: upload.stats,
        uniqueId: upload.uniqueId,
        uploadId: upload._id,
        paperId: paper._id,
        assignedReviewer: upload.assignedReviewer || null
      }));
    }).flat();

    return res.status(200).json({ usefulPapers });
  } catch (error) {
    console.log("error in getAllUserWithResearchPapersPosted", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// Todo also add total accepted by Reviewers who reviewed by name and accepted  and same for not one ... and also add Reviewers name and so 
// * This is been all aroun when hitted tio unique id for and where the Admin will have right to click on accept or reject 

/*
{
! This is data we will get from frontend it will arranged 
   ? "success": " Get user Pdf Link ",
   
}
*/
//  * Works perfectly 
//  ! mail is to be imoplemented 
export const getuserResearchPaperToCheck = async (req, res) => {
  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // store in .env
        pass: process.env.EMAIL_PASS  // app password
      }
    });
    const { id } = req.params
    
    const papers = await researchPaper.findOne({
      "researchPaperUploads.uniqueId": id
    }).populate("author", "email role firstName");

    // Todo For sender and accepted should not be there inside it 

    if (!papers) {

      return res.status(404).json({ message: "Research paper not found" });
    }
    const usefulPapers = papers.researchPaperUploads.filter((paper) => {
      if (paper.uniqueId === id )
        {
        return {
          paper
        }
    }
    })

    const reviewrs = await User.find({ role: "reviewer" }).select("firstName email collegeName")
    console.log("reviewers",reviewrs)

  

    const upload = papers.researchPaperUploads.find(u => u.uniqueId === id);
  
    
    
    res.status(200).json({
      success: " Get user Pdf Link ",
      usefulPapers,
      reviewrs
    });
  } catch (error) {
    console.log(" error in getuserResearchPaperToCheck ", error)
    return res.status(500).json({ message: " Internal server error" })

  }

}

/*

* Works perfectly 

{
 ! This is how its will look see 1st one after accepted 
  ?  "message": "Paper result updated successfully",
   
}


*/
//  ! mail is to be implemneted 
export const userPaperResult = async (req, res) => {
  try {
    //  * id is of paperUniqueId 
    const { result, comments } = req.body;
    const { id } = req.params
    console.log ( result , comments , id );
    const paper = await researchPaper.findOne({
      "researchPaperUploads.uniqueId": id
    }).populate("author", "-password -securityKey");

    if (!paper) {
      return res.status(404).json({ message: "Research paper not found" });
    }
    const upload = paper.researchPaperUploads.find(u => u.uniqueId === id);
    upload.comment = comments;
    upload.stats = result;
    await paper.save();

    
    console.log("paper",paper)

    res.status(200).json({
      message: "Paper result updated successfully",
    });
  } catch (error) {
    console.log(" error in userPaperResult  ", error)
    return res.status(500).json({ message: " Internal server error" })

  }

}



/*
! Add Mail to this 
* This is means that reviewerEMail is addedd inside senderName by taking reviewert Email and uniqueId as parasms   
*/
// * WOrking perfectly 
export const sendConfirmationToBeRecieverNotifi = async (req, res) => {
  try {
    // * Object Id of reviewer 
    const { id : uniqueId } = req.params
    const { email } = req.body
    const reviewr = await User.findOne({email}).select("-password -securityKey")
    if ( !reviewr) {
      return res.status(404).json({error : " Reviewer Not found "})
    }
    const reviewerEmail = reviewr.email
    // console.log(reviewerEmail)
    const paper = await researchPaper.findOne({
      "researchPaperUploads.uniqueId": uniqueId
    })
    console.log(paper)
     const mainPaper = paper.researchPaperUploads.filter((paper) => {
      if (paper.uniqueId === uniqueId )
        {
        return paper
    }
    })
    if (!mainPaper){
      return  res.status(404).json({error : " There is no such paper "})
    }
    
    mainPaper[0].senderName.push({ reviewerEmail :reviewerEmail});
    const sendNotification = await paper.save()
    return res.status(200).json({ 
      message: "Notification has been send to be reviewer  " ,
    })



  } catch (error) {
    console.log(" error in sendConfirmationToBeRecieverNotifi  ", error)
    return res.status(500).json({ message: " Internal server error" })

  }
}

 
/*

{
! Mail is to be send 
! This is how it looks alike when in resposne send 



*/

export const getNotifiToBeReciever = async (req, res) => {
  try {
    const reviewerEmail = req.user.email;

    const papers = await researchPaper
      .find()
      .populate("author", "-password -securityKey");

    const matchingPapers = papers
      .map(paper => {
        const relevantUploads = paper.researchPaperUploads.filter(upload =>
          upload.senderName.some(sender => sender.reviewerEmail === reviewerEmail)
        );

        if (relevantUploads.length > 0) {
          return {
            author: paper.author,
            uploads: relevantUploads.map(upload => ({
              researchPaperPdfUrl: upload.researchPaperPdfUrl,
              uniqueId : upload.uniqueId
            }))
          };
        }
        return null;
      })
      .filter(Boolean);

    return res.status(200).json({
      success: true,
      message: "Get all notifications regarding being a reviewer",
      matchingPapers
    });

  } catch (error) {
    console.error("Error in getNotifiToBeReciever:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/*
! mail is to be added 
! This is what I get ""

* Works fine 
*/
export const AcceptedReviewer = async (req, res) => {
  try {
    const reviewerEmail = req.user.email;
    const { id: uniqueId } = req.params;
    const {reviewerApproval} = req.body

    
    const paper = await researchPaper.findOne({
      "researchPaperUploads.uniqueId": uniqueId
    }).populate("author", "-password -securityKey");

    if (!paper) {
      return res.status(404).json({ message: "Research paper not found" });
    }

    const upload = paper.researchPaperUploads.find(u => u.uniqueId === uniqueId);
    if (!upload) {
      return res.status(404).json({ message: "Upload not found" });
    }

    const alreadyAccepted = upload.acceptedToBeReviewer.some(
      r => r.reviewerEmail === reviewerEmail
    );
    if (alreadyAccepted) {
      return res.status(400).json({ message: "Reviewer already accepted" });
    }

    upload.acceptedToBeReviewer.push({
      reviewerEmail,
      reviewerApproval
    });

    

    await paper.save();

    return res.status(200).json({
      message: `${reviewerApproval} `,
      success: "Response Submitted"
    });

  } catch (error) {
    console.log("Error in AcceptedReviewer:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
/*
! Mail is to be added 
! This is What we see 

*{
    "message": "Reviewer approval updated successfully"
*}
* Working perfectly 
*/

export const acceptResearchPaperByReviewer = async (req, res) => {
  try {
    const reviewer = req.user;
    const reviewerEmail = reviewer.email;
    const {id : researchPaperUniqueId  } = req.params
    const { result } = req.body;

    const paper = await researchPaper.findOne({
      "researchPaperUploads.uniqueId": researchPaperUniqueId
    }).populate("author", "-password");

    if (!paper) {
      return res.status(404).json({ message: "Research paper not found" });
    }

    const uploadEntry = paper.researchPaperUploads.find(
      u => u.uniqueId === researchPaperUniqueId
    );

    if (!uploadEntry) {
      return res.status(404).json({ message: "Upload entry not found" });
    }

    const reviewerObj = uploadEntry.acceptedToBeReviewer.find(
      r => r.reviewerEmail === reviewerEmail
    );

    if (!reviewerObj) {
      return res.status(404).json({ message: "Reviewer not found in accepted list" });
    }

    reviewerObj.reviewerApproval = result;

    await paper.save();

    res.status(200).json({ message: "Reviewer approval updated successfully" });

  } catch (error) {
    console.log("Error in acceptResearchPaperByReviewer:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}



// Get all users with reviewer role
export const getAllReviewers = async (req, res) => {
  try {
    const reviewers = await User.find({ role: "reviewer" })
      .select("firstName lastName email collegeName department specialization");
    
    return res.status(200).json({ 
      success: "Reviewers fetched successfully",
      reviewers 
    });
  } catch (error) {
    console.log("Error in getAllReviewers:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Assign reviewer to a specific paper upload
export const assignReviewerToPaper = async (req, res) => {
  try {
    const { uploadId } = req.params;
    const { reviewerId } = req.body;

    // Find the reviewer
    const reviewer = await User.findById(reviewerId);
    if (!reviewer || reviewer.role !== "reviewer") {
      return res.status(404).json({ error: "Reviewer not found" });
    }

    // Find the paper with the specific upload
    const paper = await researchPaper.findOne({
      "researchPaperUploads._id": uploadId
    }).populate("author", "firstName lastName email");

    if (!paper) {
      return res.status(404).json({ error: "Research paper not found" });
    }

    // Find the specific upload
    const upload = paper.researchPaperUploads.find(u => u._id.toString() === uploadId);
    if (!upload) {
      return res.status(404).json({ error: "Upload not found" });
    }

    // Check if reviewer is already in senderName (already notified)
    const alreadyNotified = upload.senderName.some(
      sender => sender.reviewerEmail === reviewer.email
    );

    if (alreadyNotified) {
      return res.status(400).json({ 
        error: "This reviewer has already been notified for this paper" 
      });
    }

    // Add reviewer to senderName array (this is how your system tracks assignments)
    upload.senderName.push({
      reviewerEmail: reviewer.email
    });
    const status = upload.acceptedToBeReviewer[0].reviewerApproval; 
    const comment = upload.acceptedToBeReviewer[0].reviewercomment;
    const reviewerPaperResult = upload.acceptedToBeReviewer[0].reviewerPaperResult;


    await paper.save();

    // Optional: Send email notification to reviewer
    // You can implement nodemailer here similar to your other functions

    return res.status(200).json({ 
      message: "Reviewer assigned and notified successfully",
      assignedTo: {
        name: `${reviewer.firstName} ${reviewer.lastName}`,
        email: reviewer.email
      },
      paperTitle: `${paper.author.firstName}'s research paper`,
      status ,
      comment , 
      reviewerPaperResult

    });

  } catch (error) {
    console.log("Error in assignReviewerToPaper:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Add this to your research.controller.js
export const getReviewerTasks = async (req, res) => {
  try {
    const reviewerEmail = req.user.email;

    const papers = await researchPaper
      .find({
        "researchPaperUploads.senderName.reviewerEmail": reviewerEmail
      })
      .populate("author", "firstName lastName email");

    const tasks = papers
      .map(paper => {
        const relevantUploads = paper.researchPaperUploads.filter(upload =>
          upload.senderName.some(reviewer =>
            reviewer.reviewerEmail === reviewerEmail
          )
        );

        return relevantUploads.map(upload => {
          // Find the reviewer entry in acceptedToBeReviewer
          const reviewerData = upload.acceptedToBeReviewer.find(
            r => r.reviewerEmail === reviewerEmail
          );

          return {
            _id: upload._id,
            uniqueId: upload.uniqueId,
            categoryType: upload.categoryType,
            stats: upload.stats,
            comment: upload.comment,
            uploadedAt: upload.uploadedAt,
            researchPaperPdfUrl: upload.researchPaperPdfUrl,
            authorName: `${paper.author.firstName} ${paper.author.lastName}`,
            authorEmail: paper.author.email,
            paperId: paper._id,
            reviewerApproval: reviewerData ? reviewerData.reviewerApproval : "no response",
            reviewerPaperResult : reviewerData?reviewerData.reviewerPaperResult : "pending",
          };
        });
      })
      .flat();

    console.log(tasks);

    return res.status(200).json({
      success: "Reviewer tasks fetched successfully",
      tasks
    });

  } catch (error) {
    console.log("Error in getReviewerTasks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const submitReviewerReview = async (req, res) => {
  try {
    const { uploadId } = req.params;
    const { comment, status } = req.body;
    const reviewerEmail = req.user.email;

    const paper = await researchPaper.findOne({
      "researchPaperUploads._id": uploadId
    });

    if (!paper) {
      return res.status(404).json({ error: "Research paper not found" });
    }

    const upload = paper.researchPaperUploads.find(u => u._id.toString() === uploadId);
    if (!upload) {
      return res.status(404).json({ error: "Upload not found" });
    }

    // Check if this reviewer is authorized to review this paper
    const isAuthorizedReviewer = upload.acceptedToBeReviewer.find(
      reviewer => reviewer.reviewerEmail === reviewerEmail
    );

    if (!isAuthorizedReviewer) {
      return res.status(403).json({ error: "Not authorized to review this paper" });
    }

    // Update the paper with reviewer's feedback
    isAuthorizedReviewer.reviewercomment = comment;
    isAuthorizedReviewer.reviewerPaperResult = status.toLowerCase();

    await paper.save();

    return res.status(200).json({
      message: "Review submitted successfully"
    });

  } catch (error) {
    console.log("Error in submitReviewerReview:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};