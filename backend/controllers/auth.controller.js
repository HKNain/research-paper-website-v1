import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

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
      Country,
      phoneNumber,
      department,
      securityKey,
    } = req.body;

    const requiredTitle = [
      "Mr.",
      "Mrs.",
      "Miss",
      "Ms.",
      "Mx.",
      "Dr.",
      "Prof.",
      "Engr.",
      "Fr.",
      "Rev.",
    ];

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
      !Country ||
      !collegeName
    ) {
      console.log(firstName, email, password, title, Country, collegeName);
      return res
        .status(400)
        .json({ error: "Please enter input values correctly" });
    }

    const user = await User.findOne({ email });

    if (user) {
      // Check for user
      return res.status(400).json({ error: "email already exists" });
    }

    if (role === "admin") {
      // check for Admin
      if (securityKey !== process.env.ADMIN_SECURITY_KEY) {
        return res.status(400).json({ error: "Security Key not matched" });
      }
    }
    if (role === "reviewer") {
      if (securityKey !== process.env.REVIEWER_SECURITY_KEY) {
        return res.status(400).json({ error: "Security Key not matched" });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      collegeName,
      securityKey,
      title,
      degree,
      Country,
      phoneNumber,
      department,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();

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
    const user = await User.findOne({ email });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    if (role === "admin") {
      if (securityKey !== process.env.ADMIN_SECURITY_KEY) {
        return res.status(400).json({ error: "Security Key not matched" });
      }
    }
    if (role === "reviewer") {
      if (securityKey !== process.env.REVIEWER_SECURITY_KEY) {
        return res.status(400).json({ error: "Security Key not matched" });
      }
    }
    if (user.role !== role) {
      return res
        .status(400)
        .json({ error: `You are not authorised as for this ${role}` });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      email: user.email,
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
