import researchPaper from "../models/researchpaper.model.js";
import User from "../models/user.model.js";
import nodemailer from "nodemailer"
import FormData from "form-data";
import axios from "axios";

/*

! This is How Schema Willl Lokk like for research paper 
*{
  "_id": {
    "$oid": "689831903e0d83a4c784635e"
  },
  ?"author": {
    "$oid": "68982c45f433bf668dee2e3c"
  },
  ?"researchPaperUploads": [
    {
    ?  "researchPaperPdfUrl": "https://ik.imagekit.io/kwy9fhvlz/Resume_aOPHiVAC8.pdf",
    ?  "categoryType": "None",
     ? "stats": "accepted",
      "comment": "Hello sir Your paper is approved to be published ",
      "_id": {
        "$oid": "689831903e0d83a4c784635f"
      },
     ? "uniqueId": "eaede8fc-f8c7-45a3-9939-898ef4b251a2",
      "uploadedAt": {
        "$date": "2025-08-10T05:43:44.800Z"
      },
     ? "acceptedToBeReviwer": [
        {
          "reviewerEmail": "xyz@gmail.com",
          "reviwerApproval": true,
          "_id": {
            "$oid": "6898e2b095cd58d6633e8b54"
          }
        }
      ],
     ? "senderName": [
        {
          "reviewerEmail": "",
          "_id": {
            "$oid": "6898a16162f449de938080a3"
          }
        },
        {
          "reviewerEmail": "",
          "_id": {
            "$oid": "6898c15b6c05bccfb00c50ee"
          }
        },
        {
          "reviewerEmail": "",
          "_id": {
            "$oid": "6898c1ff979296c675f9d2a8"
          }
        }
      ]
    },
    {
      "researchPaperPdfUrl": "https://ik.imagekit.io/kwy9fhvlz/AI_Navigation_Assistant_Roadmap_WKj5xu2ys.pdf",
      "categoryType": "None",
      "stats": "pending",
      "comment": "",
      "_id": {
        "$oid": "68983763771b7c844e1896ab"
      },
      "uniqueId": "d199a0da-bf2f-410d-b12e-badc6319b657",
      "uploadedAt": {
        "$date": "2025-08-10T06:08:35.496Z"
      },
      "acceptedToBeReviwer": [],
      "senderName": []
    }
  ],
  "__v": 6
*}

*/
 



// Todo Right  Api  is to be removed  
// Todo isme na Nodemailer se user ke pass mail bhejni h usme pdf Usrl link is to be include in it 

const IMAGEKIT_PRIVATE_KEY = "private_vnkO3EDEJvdyiW4jTW4i3gBKHWQ=";
const IMAGEKIT_UPLOAD_URL =  "https://upload.imagekit.io/api/v1/files/upload"
// Controller
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
    // const isAuthorExisted = await isAuthor.autg
    if (isAuthor){
      isAuthor.researchPaperUploads.push({
        researchPaperPdfUrl : fileUrl,
        categoryType:category
       })
      // isAuthor.researchPaperUploads.push({researchPaperPdfUrl:fileUrl,categoryType:category})
      const userResearchPaper = await isAuthor.save()
      console.log(userResearchPaper)
    }else {
      // const researchPaperLinkDescription = [].push({researchPaperPdfUrl:fileUrl,categoryType:category})
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
    "userInfo": {
        "firstName": "arnav",
        "email": "arnavgoyal1317@gmail.com",
        "role": "publisher",
        "collegeName": "IIT",
        "researchPapers": [
            {
                "_id": "689831903e0d83a4c784635e",
                "author": "68982c45f433bf668dee2e3c",
                "researchPaperUploads": [
                    {
                        "researchPaperPdfUrl": "https://ik.imagekit.io/kwy9fhvlz/Resume_aOPHiVAC8.pdf",
                        "categoryType": "None",
                        "stats": "accepted",
                        "comment": "Hello sir Your paper is approved to be published ",
                        "_id": "689831903e0d83a4c784635f",
                        "uniqueId": "eaede8fc-f8c7-45a3-9939-898ef4b251a2",
                        "uploadedAt": "2025-08-10T05:43:44.800Z",
                        "acceptedToBeReviwer": [
                            {
                                "reviewerEmail": "xyz@gmail.com",
                                "reviwerApproval": true,
                                "_id": "6898e2b095cd58d6633e8b54"
                            }
                        ],
                        "senderName": [
                            {
                                "reviewerEmail": "",
                                "_id": "6898a16162f449de938080a3"
                            },
                            {
                                "reviewerEmail": "",
                                "_id": "6898c15b6c05bccfb00c50ee"
                            },
                            {
                                "reviewerEmail": "",
                                "_id": "6898c1ff979296c675f9d2a8"
                            }
                        ]
                    },
                    {
                        "researchPaperPdfUrl": "https://ik.imagekit.io/kwy9fhvlz/AI_Navigation_Assistant_Roadmap_WKj5xu2ys.pdf",
                        "categoryType": "None",
                        "stats": "pending",
                        "comment": "",
                        "_id": "68983763771b7c844e1896ab",
                        "uniqueId": "d199a0da-bf2f-410d-b12e-badc6319b657",
                        "uploadedAt": "2025-08-10T06:08:35.496Z",
                        "acceptedToBeReviwer": [],
                        "senderName": []
                    }
                ],
                "__v": 6
            }
        ]
   * }
}
*/
//  * Working perfectly 
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
    ! "usefulPapers": [
        {
            "email": "arnavgoyal1317@gmail.com",
            "role": "publisher",
            "firstName": "arnav",
            "linkOfPdf": "https://ik.imagekit.io/kwy9fhvlz/Resume_aOPHiVAC8.pdf",
            "category": "None",
            "stats": "pending",
            "uniqueId" : "...."
        },
        {
            "email": "arnavgoyal1317@gmail.com",
            "role": "publisher",
            "firstName": "arnav",
            "linkOfPdf": "https://ik.imagekit.io/kwy9fhvlz/AI_Navigation_Assistant_Roadmap_WKj5xu2ys.pdf",
            "category": "None",
            "stats": "pending",
            "uniqueId" : "...."

        },
        {
            "email": "xyz@gmail.com",
            "role": "reviewer",
            "firstName": "xyz",
            "linkOfPdf": "https://ik.imagekit.io/kwy9fhvlz/Fields_of_AI_38Qqe-lqG.pdf",
            "category": "None",
            "stats": "pending",
            "uniqueId" : "...."

        }
   !]
}
*/
export const getAllUserWithResearchPapersPosted = async (req, res) => {
  try {
    const papers = await researchPaper.find()
      .populate("author", "email role firstName"); // only get needed author fields

    const usefulPapers = papers.map((paper) => {
      return paper.researchPaperUploads.map((upload) => ({
        email: paper.author.email,
        role: paper.author.role,
        firstName: paper.author.firstName,
        linkOfPdf: upload.researchPaperPdfUrl,
        category: upload.categoryType,
        stats: upload.stats,
        uniqueId : upload.uniqueId
      }));
    }).flat()

    return res.status(200).json({ usefulPapers });

  } catch (error) {
    console.log("error in getAllUserWithResearchPapersPosted", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// Todo also add total accepted by Reviwers who reviwed by name and accepted  and same for not one ... and also add Reviwers name and so 
// * This is been all aroun when hitted tio unique id for and where the Admin will have right to click on accept or reject 

/*
{
! This is data we will get from frontend it will arranged 
   ? "success": " Get user Pdf Link ",
    "usefulPapers": [
        {
            "researchPaperPdfUrl": "https://ik.imagekit.io/kwy9fhvlz/Resume_aOPHiVAC8.pdf",
            "categoryType": "None",
            "stats": "pending",
            "comment": "",
            "_id": "689831903e0d83a4c784635f",
            "uniqueId": "eaede8fc-f8c7-45a3-9939-898ef4b251a2",
            "uploadedAt": "2025-08-10T05:43:44.800Z",
            "acceptedToBeReviwer": [],
            "senderName": []
        }
    ],
    "reviewrs": [
        {
            "_id": "68982cacf433bf668dee2e42",
            "firstName": "xyz",
            "email": "xyz@gmail.com",
            "collegeName": "IIT"
        }
   ? ]
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
    console.log("reviwers",reviewrs)

  

    const upload = papers.researchPaperUploads.find(u => u.uniqueId === id);
    // if (upload.stats === "accepted") {
    //   return res.status(404).json({ message: "This Research paper has been accepted earlier " });

    // } else if (upload.stats === "rejected") {
    //   return res.status(404).json({ message : "This Research paper has been rejected earlier " });
    // }
    
    
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
    "paper": {
        "_id": "689831903e0d83a4c784635e",
        "author": {
            "_id": "68982c45f433bf668dee2e3c",
            "firstName": "arnav",
            "email": "arnavgoyal1317@gmail.com",
            "title": "CA",
            "Country": "Ind",
            "phoneNumber": "",
            "role": "publisher",
            "collegeName": "IIT",
            "department": "",
            "createdAt": "2025-08-10T05:21:09.063Z",
            "updatedAt": "2025-08-10T05:21:09.063Z",
            "__v": 0
        },
        "researchPaperUploads": [
            {
                "researchPaperPdfUrl": "https://ik.imagekit.io/kwy9fhvlz/Resume_aOPHiVAC8.pdf",
                "categoryType": "None",
                "stats": "accepted",
                "comment": "Hello sir Your paper is approved to be published ",
                "_id": "689831903e0d83a4c784635f",
                "uniqueId": "eaede8fc-f8c7-45a3-9939-898ef4b251a2",
                "uploadedAt": "2025-08-10T05:43:44.800Z",
                "acceptedToBeReviwer": [],
                "senderName": []
            },
            {
                "researchPaperPdfUrl": "https://ik.imagekit.io/kwy9fhvlz/AI_Navigation_Assistant_Roadmap_WKj5xu2ys.pdf",
                "categoryType": "None",
                "stats": "pending",
                "comment": "",
                "_id": "68983763771b7c844e1896ab",
                "uniqueId": "d199a0da-bf2f-410d-b12e-badc6319b657",
                "uploadedAt": "2025-08-10T06:08:35.496Z",
                "acceptedToBeReviwer": [],
                "senderName": []
            }
        ],
        "__v": 1
   ? }
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
* This is means that reviwerEMail is addedd inside senderName by taking reviwert Email and uniqueId as parasms   
*/
// * WOrking perfectly 
export const sendConfirmationToBeRecieverNotifi = async (req, res) => {
  try {
    // * Object Id of reviwer 
    const { id : uniqueId } = req.params
    const { email } = req.body
    const reviewr = await User.findOne({email}).select("-password -securityKey")
    if ( !reviewr) {
      return res.status(404).json({error : " Reviwer Not found "})
    }
    const reviwerEmail = reviewr.email
    // console.log(reviwerEmail)
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
    
    mainPaper[0].senderName.push({ reviewerEmail :reviwerEmail});
    const sendNotification = await paper.save()
    return res.status(200).json({ 
      message: "Notification has been send to be reviwer  " ,
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
   * "success": true,
    "message": "Get all notifications regarding being a reviewer",
    "matchingPapers": [
        {
            "author": {
                "_id": "68982c45f433bf668dee2e3c",
                "firstName": "arnav",
                "email": "arnavgoyal1317@gmail.com",
                "title": "CA",
                "Country": "Ind",
                "phoneNumber": "",
                "role": "publisher",
                "collegeName": "IIT",
                "department": "",
                "createdAt": "2025-08-10T05:21:09.063Z",
                "updatedAt": "2025-08-10T05:21:09.063Z",
                "__v": 0
            },
            "uploads": [
                {
                    "researchPaperPdfUrl": "https://ik.imagekit.io/kwy9fhvlz/Resume_aOPHiVAC8.pdf"
                }
            ]
        }
   * ]
}

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
*{
    "message": "Accepted to be a reviewer!",
*}
* Works fine 
*/
export const AcceptedReviewer = async (req, res) => {
  try {
    const reviewerEmail = req.user.email;
    const { id: uniqueId } = req.params;

    
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

    const alreadyAccepted = upload.acceptedToBeReviwer.some(
      r => r.reviewerEmail === reviewerEmail
    );
    if (alreadyAccepted) {
      return res.status(400).json({ message: "Reviewer already accepted" });
    }

    upload.acceptedToBeReviwer.push({
      reviewerEmail,
    });

    upload.senderName = upload.senderName.filter(
      sender => sender.reviewerEmail !== reviewerEmail
    );

    await paper.save();

    return res.status(200).json({
      message: "Accepted to be a reviewer!"
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

    const reviewerObj = uploadEntry.acceptedToBeReviwer.find(
      r => r.reviewerEmail === reviewerEmail
    );

    if (!reviewerObj) {
      return res.status(404).json({ message: "Reviewer not found in accepted list" });
    }

    reviewerObj.reviwerApproval = result;

    await paper.save();

    res.status(200).json({ message: "Reviewer approval updated successfully" });

  } catch (error) {
    console.log("Error in acceptResearchPaperByReviewer:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}










