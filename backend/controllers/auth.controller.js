import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import transporter from "../utils/nodemailer.js";

export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      role,
      email,
      password,
      collegeName,
      title,
      degree,
      country,
      phoneNumber,
      department,
      // securityKey,
    } = req.body;
    console.log(req.body)

    const requiredTitle= [
            "Mr.",
            "Mrs.",
            "Miss",
            "Ms.",      
            "Dr.",      
            "Prof.",    
            "Engr.",     
        ]

    const requiredtitle = [
      "B.Sc", // Bachelor of Science
      "B.A", // Bachelor of Arts
      "B.E", // Bachelor of Engineering
      "B.Tech", // Bachelor of Technology
      "M.Sc", // Master of Science
      "M.A", // Master of Arts
      "M.E", // Master of Engineering
      "M.Tech", // Master of Technology
      "M.Phil", // Master of Philosophy
      "Ph.D", // Doctor of Philosophy
      "D.Sc", // Doctor of Science
      "LL.B", // Bachelor of Law
      "LL.M", // Master of Law
      "MBA", // Master of Business Administration
      "BBA", // Bachelor of Business Administration
      "B.Ed", // Bachelor of Education
      "M.Ed", // Master of Education
      "MBBS", // Bachelor of Medicine
      "MD", // Doctor of Medicine
      "BDS", // Dental Surgery
      "DVM", // Doctor of Veterinary Medicine
      "CA", // Chartered Accountant
      "CS", // Company Secretary
      "CFA", // Chartered Financial Analyst
      "Diploma", // For diploma holders
      "Other", // Fallback option
    ];
    // User details coming from form ...
    if (
      !firstName ||
      !email ||
      !password ||
      password.length < 6 ||
      !requiredTitle.includes(title) || // <-- use requiredTitle for title
      !country ||
      !collegeName
    ) {
      console.log(firstName, email, password, title, country, collegeName);
      return res
        .status(400)
        .json({ error: "Please enter input values correctly" });
    }
    // console.log(firstName , email , password , title , country , collegeName, role , securityKey)

    const user = await User.findOne({ email });

    if (user) {
      // Check for user
      return res.status(400).json({ error: "email already exists" });
    }
    if ( role === "author"){
      req.body.securityKey= "42315678";
    }

    if (role === "admin") {
      // check for Admin
      if (req.body.securityKey !== process.env.ADMIN_SECURITY_KEY) {
        return res.status(400).json({ error: "Security Key not matched" });
      }
    }
    if (role === "reviewer") {
      if (req.body.securityKey !== process.env.REVIEWER_SECURITY_KEY) {
        return res.status(400).json({ error: "Security Key not matched" });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log ("security", securityKey)
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      collegeName,
      securityKey: req.body.securityKey,
      title,
      degree,
      country,
      phoneNumber,
      department,
    });
    console.log(newUser)

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();

      try {
        console.log("trying sendin mail")
        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: email , 
          subject: 'SignUp Successful',
          text: "Congratulations for signing in!"
        }
        console.log(mailOptions);
        console.log("Sendin mail")

        await transporter.sendMail(mailOptions);
        console.log("mail sent")
      } catch (error) {
        console.log(error);
      }

      

      res.status(201).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        college: newUser.collegeName,
      });
    } else {
      res.status(400).json({ error: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in SignUp Controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role, securityKey } = req.body;

    // step 1: check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // step 2: check password
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // step 3: check role authorization
    if ((role === "admin" && securityKey !== process.env.ADMIN_SECURITY_KEY) ||
        (role === "reviewer" && securityKey !== process.env.REVIEWER_SECURITY_KEY)) {
      return res.status(400).json({ error: "Security Key not matched" });
    }

    // step 4: check if user's role matches
    if (user.role !== role) {
      return res.status(400).json({ error: `You are not authorised as ${role}` });
    }

    // step 5: generate token and set cookie
    const token = generateTokenAndSetCookie(user._id, res);

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email , 
      subject: 'LogIn Successful',
      text: "Congratulations for logging in!\nYour account has been Logged In.\n Start uploading research"
    }

    await transporter.sendMail(mailOptions);

    // send user info + token to frontend
    res.status(200).json({
      _id: user._id,
      email: user.email,
      token,
      user: {
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        collegeName: user.collegeName,
        country: user.country,
      },
    });

  } catch (error) {
    console.log("Error in Login Controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    console.log("Error in Logout Controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getMe:", error);
    res.status(500).json({ message: "Server error" });
  }
};