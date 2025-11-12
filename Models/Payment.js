const mongoose = require("mongoose");

// Create Schema
const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
  },
});

// attach schema with collection
const PayModel = mongoose.model("krashak-Pay-users", paymentSchema);

module.exports = PayModel;
