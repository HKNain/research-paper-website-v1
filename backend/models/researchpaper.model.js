import mongoose from "mongoose"
import { v4 as uuidv4 } from 'uuid';

const researchSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  researchPaperUploads: [
    {
      uniqueId: {
        type: String,
        default: uuidv4()
      },

      researchPaperPdfUrl: {
        type: String,
        required: true,
      },

      categoryType: {
        type: String,
        required: true,
        default: "None",
      },
      stats: {
        type: String,
        enum: ['accepted', 'rejected', 'pending'],
        default: 'pending',
      },

      uploadedAt: {
        type: Date,
        default: Date.now,
      },

      reviewerAccepted : [
        {
          reviwerEmail : {
            type : String ,
            default :"",
          }
        }
      ],
      
      senderName : [
        {
          reviwerEmail : {
            type : String ,
          }
        }

      ],
      
      comment: {
        type: String,
        default: ''
      },
      
      
     
    }
  ]

})

const researchPaper = mongoose.model("researchPaper", researchSchema);

export default researchPaper;