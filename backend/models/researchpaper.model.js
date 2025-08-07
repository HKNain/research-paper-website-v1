import mongoose from "mongoose"

const researchSchema = new mongoose.Schema ({
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const researchPaper = mongoose.model("researchPaper", researchSchema);

export default researchPaper;