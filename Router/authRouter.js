const {
  loginValidation,
  signupValidation,
} = require("../Middleware/AuthValidation");
const {
  login,
  signup,
  logOut,
  sendResetOtp,
  resetPassword,
} = require("../Controllers/AuthControllers");

const { verify } = require("../Config/Nodemailer");
const router = require("express").Router();

// first all request is validate then control goes to next step
router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);
router.post("/logout", logOut);
router.post("/send-reset-otp", sendResetOtp);
router.post("/reset-password", resetPassword);
module.exports = router;
