import researchPaper from "../models/researchpaper.model.js";
import User from "../models/user.model.js";
import multer from "multer"

const userProfile = async (req , res )=>{
  try {
    // User from protected route 
    const getUserFromProtectedRoute = req.user ;
    if ( !getUserFromProtectedRoute ){
        return res.status(400).json({error: "If having account Please Login else Signin"}) 

    }
    const userId = getUserFromProtectedRoute.id ;
    const user = await User.findById(userId).select("-password")
    if (!user){
        return res.status(400).json({error: "If having account Please Login else Signin"}) 
    }
    const researchPaperPost = await researchPaper(userId).populate("author")
    
    const userDetails = {
        firstName : user.firstName,
        lastName : user.lastName,
        email : user.email,
        collegeName : user.collegeName ,
        researchPapers : researchPaperPost , 
        status : researchPaperPost.status

    }
    return res.status(200).json({
        suceess:"Authorised to get Profile",
        userDetails
    })

  } catch (error){

  } 
} 

