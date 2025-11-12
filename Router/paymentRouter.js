const router = require("express").Router();
const crypto = require("crypto");
const Payment = require("../Models/Payment.js");
const Razorpay = require("razorpay");
require("dotenv").config();
const registerModel = require("../Models/Register.js");
const transporter = require("../Config/Nodemailer");
const {
  SOIL_TESTING_REGISTRATION_TEMPLATE,
} = require("../Config/EmailTemplate");

// Step 1  Api creation for order id generate
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Route 1 : Create Order Api using post method http://localhost:4000/payment/order
router.post("/order", (req, res) => {
  const { amount, email } = req.body;

  try {
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
      notes: { email },
    };
    razorpay.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        res.json(500).json({ message: "Something Went Wrong!" });
      }
      console.log(order);
      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.log(error);
  }
});

// Route 2: Create verify Api using Post Method  http://localhost:4000/payment/verify
router.post("/verify", async (req, res) => {
  console.log(req.body);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email } =
    req.body;

  try {
    // Create Sign
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    // Create Expected Sign
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    console.log(razorpay_signature === expectedSign);

    // create isAuthentic

    const isAuthentic = expectedSign === razorpay_signature;

    if (isAuthentic) {
      const payment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        email,
      });
      await payment.save();

      const user = await registerModel.findOne({ email });

      if (user) {
        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: user.email,
          subject:
            "Krashak Soil Testing Device Registration & Payment Confirmation",
          html: SOIL_TESTING_REGISTRATION_TEMPLATE.replace(
            "{{user}}",
            user.fname
          ),
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to", user.email);
      }

      // send message
      res.status(201).json({ message: "Payment Succesfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
