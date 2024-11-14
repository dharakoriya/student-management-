const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const { getToken } = require("../Middlewares/token");
const jwt = require('jsonwebtoken');
const { encrypt, decrypt } = require("../Middlewares/enc");


const nodemailer = require('nodemailer');

exports.signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      mobile
    } = req.body;
    console.log(req.body);
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({
      email, isDeleted: false
    });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const hashedPassword = await encrypt(password);
    const newUser = new User({
      email,
      password: hashedPassword,
      name: name,
      mobile
    });
    await newUser.save();
    res.status(201).json({
      status: "Success",
      message: "User created successfully",
      data: newUser,
    });
  }
  catch (error) {
    console.error("Registration failed:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        type: "Login",
        message: "email and password are required",
      });
    }

    const user = await User.findOne({ email });


    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const decryptedPassword = decrypt(user.password);
    const isPasswordValid = password === decryptedPassword;

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = getToken(user);
    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.loginWithMobile = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res.status(400).json({
        status: "failed",
        type: "Login",
        message: "Mobile number and password are required",
      });
    }

    const user = await User.findOne({ mobile });


    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const decryptedPassword = decrypt(user.password);
    const isPasswordValid = password === decryptedPassword;

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = getToken(user);
    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Endpoint to send OTP to user's email
exports.sendOtpToEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email, isDeleted: false });

    if (!user) {
      return res.status(404).json({ message: "User not registered" });
    }

    // Generate a random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    user.otp = otp;
    await user.save();

    // Send OTP to the user's email
    const mailOptions = {
      from: 'dhara@gmail.com', // Replace with your email address
      to: email,
      subject: 'Your OTP for Login',
      text: `Your OTP for login is ${otp}. It is valid for 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      status: "success",
      message: "OTP sent to email successfully",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

// Endpoint to verify OTP and log in the user
exports.verifyEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email, isDeleted: false });

    if (!user) {
      return res.status(404).json({ message: "User not registered" });
    }

    // Check if the OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Clear the OTP after verification and mark user as verified
    user.otp = null;
    user.isVerified = true;
    await user.save();

    // Generate JWT token for the user
    const token = getToken(user);

    res.status(200).json({
      status: "success",
      message: "OTP verified successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Error verifying OTP" });
  }
};


