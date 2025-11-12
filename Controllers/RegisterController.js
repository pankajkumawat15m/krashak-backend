const registerModel = require("../Models/Register.js");
const transporter = require("../Config/Nodemailer");
const {
  SOIL_TESTING_REGISTRATION_TEMPLATE,
} = require("../Config/EmailTemplate");
const registerUser = async (req, res) => {
  try {
    const user = new registerModel(req.body);
    await user.save();

    res.status(201).json({ message: "Registration Succesfull!" });
  } catch (error) {
    console.error("Error saving registration:", error);
    res.status(500).json({ message: "Failed to register user." });
  }
};

module.exports = registerUser;
