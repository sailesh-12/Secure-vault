const User = require('../models/User'); // Assuming you have a User model
const Otp = require('../models/Otp.js'); // Assuming you have an Otp model for
require('dotenv').config(); 
const jwt = require('jsonwebtoken'); // JWT for token generation
module.exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const existing = await Otp.findOne({ email, otp });
	console.log(existing);
    if (!existing) {
      return res.status(401).json({ message: 'Invalid or expired OTP' });
    }


    const user = await User.findOne({ email });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
    });

    res.status(200).json({
      message: 'OTP verified. Login successful.',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token
    });

  } catch (err) {
    res.status(500).json({ message: 'OTP verification error', error: err.message });
  }
};
