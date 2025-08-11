export const  reviewerProtectRoute = async (req , res , next) =>{
    const user = req.user 
    if ( user.role !=="reviewer"){
        return res.status(400).json({error: " You are not authorised as an reviewer "})
    }
    next ()
}