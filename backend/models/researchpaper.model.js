import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';




const researchSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  researchPaperUploads: [
    {
      uniqueId: {
        type: String,
        default: () => uuidv4(), // Generates new UUID for each entry
      },
      researchPaperPdfUrl: {
        type: String,
        required: true,
      },
      categoryType: {
        type: String,
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
      acceptedToBeReviewer: [
        {
          reviewerEmail: {
            type: String,
            default: "",
          },
          reviewerApproval: {
            type: String,
            default : 'no response',
            enum: ['accepted','rejected','no response']
        }
        }
      ],
      senderName: [
        {
          reviewerEmail: {
            type: String,
            default: "",
          }
        }
      ],
      comment: {
        type: String,
        default: ''
      },
      
    }
  ]
});

export default mongoose.model("ResearchPaper", researchSchema);
