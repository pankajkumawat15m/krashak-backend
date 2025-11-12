const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../Models/User");
const transporter = require("../Config/Nodemailer");
const {
  PASSWORD_RESET_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} = require("../Config/EmailTemplate");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // find user already exist
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exist with this email. ",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    // incrypt the password
    userModel.password = await bcrypt.hash(password, 12);
    await userModel.save();

    // jwt token
    const jwtToken = jwt.sign(
      {
        _id: userModel._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Sendeing Welcome Email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: userModel.email,
      subject: "Welcome to Krashak Innovative Solution ",
      html: WELCOME_EMAIL_TEMPLATE.replace("{{user}}", userModel.name),
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

    res.status(201).json({
      message: "Signup Successfully",
      success: true,
      user: {
        name: userModel.name,
        email: userModel.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(409).json({
        message: "Invalid details",
        success: false,
      });
    }
    // password validation
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        message: "Invalid Details",
        success: false,
      });
    }
    // jwt token
    const jwtToken = jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Successfully",
      success: true,
      jwtToken,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Logout Successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

// Send Password Reset Otp
const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(403).json({
      message: "Email is Required",
      success: false,
    });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "User not found",
        success: false,
      });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    // set the expired time for otp
    user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000;
    await user.save();

    // Send the email for otp
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset Otp",
      html: PASSWORD_RESET_TEMPLATE.replace("{{OTP}}", otp).replace(
        "{{email}}",
        user.email
      ),
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: " OTP Sent to your Email",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

// Reset user password
const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(403).json({
      message: "Email, Otp and newPassword are required",
      success: false,
    });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "User Nnot found",
        success: false,
      });
    } else if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.status(403).json({
        message: "Invalid Otp",
        success: false,
      });
    } else if (user.resetOtpExpireAt < Date.now()) {
      return res.status(403).json({
        message: " Otp Expired",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();

    res.status(201).json({
      message: " Password has been reset successfully  ",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
  logOut,
  sendResetOtp,
  resetPassword,
};
