const express = require("express");
const registerUser = require("../Controllers/RegisterController");

const router = express.Router();

router.post("/", registerUser);
module.exports = router;
