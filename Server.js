const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Router/authRouter");
const PaymentRouter = require("./Router/paymentRouter");
const RegisterRouter = require("./Router/registerRouter");
const cookieParser = require("cookie-parser");

// load env variable
require("dotenv").config();

// intialize express
const app = express();

// add middleware
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration for production and development
const allowedOrigins = [
  "http://localhost:3000", // local dev
  "http://localhost:3001", // local dev alternative
  "https://localhost:3000", // local dev with SSL
  "https://krashakinnovativesolution.com", // production domain
  "http://krashakinnovativesolution.com", // production domain (http)
  "https://www.krashakinnovativesolution.com", // production domain with www
  "http://www.krashakinnovativesolution.com", // production domain with www (http)
  process.env.FRONTEND_URL || "https://krashakinnovativesolution.com", // production URL from env
];

// Allow all origins for production (temporary fix for CORS issues)
app.use(
  cors({
    origin: true, // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use("/auth", AuthRouter);
app.use("/payment", PaymentRouter);
app.use("/register", RegisterRouter);

// Connect to MongoDb
const DB_URL = process.env.MONGODB_URI;

if (!DB_URL) {
  console.error('MONGODB_URI is not set in environment variables.');
} else {
  // Use recommended options and provide better logging for deployment
  mongoose.set('strictQuery', false);
  mongoose
    .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Successfully connected to MongoDB');
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB:', err && err.message ? err.message : err);
      // Exit process so deployment platform (Railway) registers a failed start
      process.exit(1);
    });
  
  // keep the existing connection listeners for extra runtime visibility
  const connect = mongoose.connection;
  connect.on('error', (err) => {
    console.error('MongoDB connection error:', err && err.message ? err.message : err);
  });
}

// for test the server
app.get("/", (req, res) => {
  res.send("Hello From Server");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on ${PORT}`);
});
