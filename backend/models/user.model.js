import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 6
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: [
            "admin",
            "reciever",
            "publisher"
        ],
        default: "publisher",
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    collegeName: {
        type: String,
        required: true,
        default: "",
    },
    
    securityKey: {
        type: String,
        default: "",
        require: true,
        minlength: 6,

    }


}, { timestamps: true });

const User = mongoose.model("User", userSchema);



export default User;