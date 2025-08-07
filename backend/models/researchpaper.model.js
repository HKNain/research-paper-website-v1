import mongoose from "mongoose"

const researchSchema = new mongoose.Schema ({
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    } ,
    researchPaperUploads:{
        type : String,
        default : [],
    } , 
    status : {
        type : String ,
        enum : ["accepted","rejected","pending"],
        default: "pending"
    }
})

const researchPaper = mongoose.model("researchPaper", researchSchema);

export default researchPaper;