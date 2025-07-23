const nodemailer = require('nodemailer');
const Otp = require('../models/Otp'); // Assuming you have an Otp model for OTP management
require('dotenv').config(); // Ensure dotenv is configured to load environment variables

const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Secure Vault" <${process.env.EMAIL_USERNAME}>`,
    to: email,
    subject: "Your OTP for Secure Vault Login",
    text: `Your one-time password (OTP) is: ${otp}. It will expire in 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOtpEmail;