import mongoose from "mongoose";

// User Schema ...

const userSchema = new mongoose.Schema({
    firstName: {  
        type: String,
        required: true,
        
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    title: { 
        type: String,
        
        required: true
    },
    degree: {
        type: String,
    },
    Country : {
        type : String ,
        required : true,
        
    },

    phoneNumber : {
        type : String ,
        default : "",
    },
    role: {
        type: String,
        enum: [
            "admin",
            "author",
            "reviewer"
        ],
        default: "author",
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    collegeName: {
        type: String,
        required: true,
        
    },
    department : {
        type : String ,
        default : "",
    },
    securityKey: {
        type: String,
        default : "4378438",
        required: true,
        minlength: 6,
    },
     


}, { timestamps: true });

const User = mongoose.model("User", userSchema);



export default User;