const PASSWORD_RESET_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset OTP</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 0 12px rgba(0,0,0,0.1);
      padding: 30px 25px;
    }
    h2 {
      color: #0056b3;
      margin-bottom: 20px;
    }
    p {
      margin: 12px 0;
      font-size: 15px;
    }
    .otp-box {
      font-size: 22px;
      font-weight: bold;
      background-color: #fff4db;
      color: #d35400;
      border: 2px dashed #f7ba49;
      padding: 12px 18px;
      display: inline-block;
      border-radius: 8px;
      margin: 15px 0;
    }
    .note {
      font-size: 0.85em;
      color: #777;
      margin-top: 30px;
    }
    .footer {
      margin-top: 25px;
      font-size: 13px;
      text-align: center;
      color: #aaa;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Reset Your Password</h2>
    <p>Hi there,</p>
    <p>We received a request to reset the password for your account linked with the email: <strong>{{email}}</strong>.</p>
    <p>To continue, please use the following One-Time Password (OTP):</p>
    <div class="otp-box">{{OTP}}</div>
    <p>This OTP is valid for <strong>10 minutes</strong> and can only be used once.</p>
    <p>If you did not request this password reset, please ignore this message or contact our support team for assistance.</p>
    <p>For security reasons, do not share this OTP with anyone.</p>
    <p>Stay secure,<br/>The Krashak Innovative Solution Team</p>
    <p class="note">This is an automated message. Please do not reply to this email.</p>
    <div class="footer">
      &copy; 2025 Krashak Innovative Solution &nbsp;|&nbsp; krashakinnovativesolutions@gmail.com
    </div>
  </div>
</body>
</html>
`;

const WELCOME_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Welcome to Krashak Innovative Solution</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
    background: #f7ba49;
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 26px;
    }
    .body {
      padding: 25px 20px;
      font-size: 16px;
      line-height: 1.6;
    }
    .body ul {
      padding-left: 20px;
    }
    .body a {
      color: #f7ba49;
      text-decoration: none;
    }
    .body a:hover {
      text-decoration: underline;
    }
    .footer {
      background-color: #f1f1f1;
      padding: 15px;
      text-align: center;
      font-size: 13px;  
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Krashak Innovative Solution!</h1>
    </div>
    <div class="body">
      <p>Hi {{user}},</p>
      <p>We're absolutely delighted to welcome you to <strong>Krashak Innovative Solution</strong> – where technology meets agriculture in the most innovative ways!</p>
      <p>Thank you for joining our growing community. We're committed to empowering farmers and transforming the agriculture industry with cutting-edge AI, IoT, and robotics solutions.</p>
      <p>To get started, check out our platforms:</p>
      <ul>
        <li><a href="https://www.linkedin.com/company/krashak-innovative-solutions/" target="_blank">Connect on LinkedIn</a></li>
        <li><a href="https://www.youtube.com/channel/UCTitp5bMsIRAedl1zans2fw" target="_blank">Explore our YouTube Channel</a></li>
      </ul>
      <p>If you ever need assistance, ideas, or just want to say hello — we’re just a message away.</p>
      <p>Welcome aboard, and let's grow together!</p>
      <p>Warm regards, <br/>The Krashak Innovative Solution Team</p>
    </div>
    <div class="footer">
      &copy; 2024 Krashak Innovative Solution • krashakinnovativesolutions@gmail.com
    </div>
  </div>
</body>
</html>
`;
const SOIL_TESTING_REGISTRATION_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Soil Testing Device Registration Confirmation</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background: #f7ba49;
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 26px;
    }
    .body {
      padding: 25px 20px;
      font-size: 16px;
      line-height: 1.6;
    }
    .body ul {
      padding-left: 20px;
    }
    .body a {
      color: #f7ba49;
      text-decoration: none;
    }
    .body a:hover {
      text-decoration: underline;
    }
    .footer {
      background-color: #f1f1f1;
      padding: 15px;
      text-align: center;
      font-size: 13px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Registration & Payment Successful!</h1>
    </div>
    <div class="body">
      <p>Hi</p>
      <p>Thank you for registering for the <strong>Soil Testing Device</strong> at <strong>Krashak Innovative Solution</strong>.</p>
      <p>We're happy to confirm that your registration and payment have been received successfully.</p>
      <p>If you have any questions or want to track the status, feel free to <a href="mailto:krashakinnovativesolutions@gmail.com">contact us</a>.</p>

      <p>Thank you for trusting Krashak – we’re here to make agriculture smarter, together!</p>

      <p>Warm regards,<br/>The Krashak Innovative Solution Team</p>
    </div>
    <div class="footer">
      &copy; 2024 Krashak Innovative Solution • krashakinnovativesolutions@gmail.com
    </div>
  </div>
</body>
</html>`;

module.exports = {
  PASSWORD_RESET_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  SOIL_TESTING_REGISTRATION_TEMPLATE,
};
