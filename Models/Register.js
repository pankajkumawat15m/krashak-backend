const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  fathername: String,
  address: String,
  gender: String,
  city: String,
  state: String,
  mobile: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const registerModel = mongoose.model("krashak-register", registerSchema);
module.exports = registerModel;
