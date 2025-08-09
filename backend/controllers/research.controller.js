import researchPaper from "../models/researchpaper.model.js";
import User from "../models/user.model.js";
import multer from "multer"
import nodemailer from "nodemailer"
import { transporter } from "../utils/nodemailer.js";

// Todo reviwer Acceptance to be a reviwer or not means from sende3r to reviwerList name if Accepetd then will be provioded link to mail + to Admin also and in accepetd send link of pdf 
// Todo might be a changer in model might be in researcher or in user 
// Todo Make a post of pdf 
// Todo testing 

//  * Import information regarding userprofile is done !!
 
export const userProfile = async (req, res) => {
  try {
    const user = req.user
    const userId = user._id;
    const userResearchPaper = await researchPaper.find({ author: userId })
    const userInfo = {
      firstName: user.firstName,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      collegeName: user.collegeName,
      reseachPapers: userResearchPaper,
        

    }
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
export const getAllUserWithResearchPapersPosted = async (req, res) => {
  try {

    const papers = await researchPaper.find()
      .populate("author", "-password"); 
    const usefulPaper = papers.filter((paper) => {

      if (paper.researchPaperUploads) {
        return (
          {
            email: paper.email,
            firstName: paper.firstName,
            uniqueId: paper.uniqueId,
            _id : paper.author._id

          }
        );
      }

    })

    return res.status(200).json({ usefulPaper });

  } catch (error) {
    console.log(" error in getAllUserWithResearchPapersPosted ", error)
    return res.status(500).json({ message: " Internal server error" })

  }

}

// Todo also add total accepted by Reviwers who reviwed by name and accepted  and same for not one ... and also add Reviwers name and so 
// * This is been all aroun when hitted tio unique id for and where the Admin will have right to click on accept or reject 
export const getuserResearchPaperToCheck = async (req, res) => {  
  try {
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // store in .env
        pass: process.env.EMAIL_PASS  // app password
      }
    });
    const {id} = req.params.id
    const paper = await researchPaper.findOne({
      "researchPaperUploads.uniqueId": id
    }).populate("author", "-password");
    // Todo For sender and accepted should not be there inside it 
    const reviewrs =  await User.find({role:"reviewer"}).select("-password")
    
    const reviewrsInfo = {
      firstName : reviewrs.firstName,
      email : reviewrs.email,
      stats:reviewrs.status, 
      _id : reviewrs._id,

    } 

    if (!paper) {
      return res.status(404).json({ message: "Research paper not found" });
    }
    const upload = paper.researchPaperUploads.find(u => u.uniqueId === id);
    if ( upload.stats === "accepted" ){
      return res.status(404).json({ message: "This Research paper has been accepted earlier " });
       
    } else if (upload.stats === "rejected" ){
       return res.status(404).json({ message: "This Research paper has been rejected earlier " });
    }
    const userInfo = {
      firstName : paper.author.firstName,
      email : paper.author.email,
      // researchpaperId : 
      link : paper.researchPaperPdfUrl,
      uploadedAt : paper.uploadedAt , 
      category : paper.category , 
      uniqueId : paper.uniqueId
    }

    res.status(200).json({
      success: " Get user Pdf Link ",
      userInfo,
      reviewrsInfo
    });
  } catch ( error ){
     console.log(" error in getuserResearchPaperToCheck ", error)
    return res.status(500).json({ message: " Internal server error" })

  }

}


export const userPaperResult = async  (req, res ) =>{
  try {
    //  * id is of paperUniqueId 
    const {result , comments } = req.body;
    const {id} = req.params.id
      const paper = await researchPaper.findOne({
        "researchPaperUploads.uniqueId": id
      }).populate("author", "-password");
  
      if (!paper) {
        return res.status(404).json({ message: "Research paper not found" });
      }
      const upload = paper.researchPaperUploads.find(u => u.uniqueId === id);
      upload.comment = comments ;
      upload.stats = result ;
      await paper.save();

      await transporter.sendMail({
      from: `"Research Portal" <${process.env.EMAIL_USER}>`,
      to: paper.author.email, // send email to paper's author
      subject: `Your Research Paper Has Been ${result.toUpperCase()}`,
      html: `
        <h3>Hello ${paper.author.firstName},</h3>
        <p><b>Status:</b> ${result}</p>
        <p><b>Reviewer Comments:</b> ${comments || "No comments provided"}</p>
        <p><a href="${upload.pdfUrl || paper.researchPaperPdfUrl}">Click here to view your paper</a></p>
        <br/>
        <p>Thank you,<br/>Research Portal Team</p>
      `
    });
  
      res.status(200).json({
        message: "Paper result updated successfully",
      });
  }  catch ( error ){
     console.log(" error in userPaperResult  ", error)
    return res.status(500).json({ message: " Internal server error" })

  }
  

}
//  * This is for sending mail and notification to reviwer
export const sendConfirmationToBeRecieverNotifi = async ( req, res) => {
  try {
    // * Object Id of reviwer 
    const {id} = req.params.id
    const {uniqueId} = req.body
     const reviewr = await User.findOne({email}).select("-password") 
     const reviwerEmail = reviewr.email
     const paper = await researchPaper.findOne({
        "researchPaperUploads.uniqueId": uniqueId
      }).populate("author", "-password");

    paper.senderName.push({ reviwerEmail });
    await transporter.sendMail({
      from: `"Research Portal" <${process.env.EMAIL_USER}>`,
      to: reviwerEmail, // send email to paper's author
      subject: `An Email has been come from Admin `,
      //  Todo Add url of notification !!!!      
      html: `
  <h3>Hello ${reviewr.firstName},</h3>
  <p><b>An email has been received from Admin regarding ${paper.category}.</b></p>
  <p>
    Click here to visit the notification url:
  
    <a href="${xyz}">Confirm to be a reviewer</a>
  </p>
  <br/>
  <p>Thank you</p>
`
    });
    return res.status(200).json({message: "Notification send to be reviwer  "})



  } catch ( error ){
     console.log(" error in sendConfirmationToBeRecieverNotifi  ", error)
    return res.status(500).json({ message: " Internal server error" })

  }
}

export const getNotifiToBeReciever = async  (req , res )=>{
  try {
    const user = req.user 
    const reviewerEmail = user.email 
    const paper = await researchPaper.find(
        "researchPaperUploads"
      ).populate("author", "-password")
      

    const reviewerEmailinsideSenderGroup = paper.filter((u)=>{
      if ( u.senderName.reviewerEmail === reviewerEmail){
       
          return (
            {
              category : u.categoryType,
              uploadedAt : u.uploadedAt,
              uniqueId  : u.uniqueId ,
              userName : paper.author.firstName, 
            }
          )
        
      }
    })  
    return res.status(200).json({
      success : " Get all Notifi regarding to be a reviwer ",
      reviewerEmailinsideSenderGroup
    })
    
   
  


  } catch ( error ){
     console.log(" error in getNotifiToBeReciever  ", error)
    return res.status(500).json({ message: " Internal server error" })

  }
}









