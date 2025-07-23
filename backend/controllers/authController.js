const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Uncomment if JWT is used for authentication
require('dotenv').config(); // Ensure dotenv is configured to load environment variables
const Otp = require('../models/Otp.js'); // Assuming you have an Otp model for OTP management
const sendOtpEmail = require('../utils/sendOtp.js'); // Assuming you have a utility function to
module.exports.signup = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		// Validate input
		if (!username || !email || !password) {
			return res.status(400).json({ message: 'All fields are required' });
		}
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		//jwt 


		const newUser = new User({
			username,
			email,
			password: hashedPassword
		});

		await newUser.save();
		res.status(201).json({ message: 'User created successfully', user: { id: newUser._id, username: newUser.username, email: newUser.email, password: hashedPassword } });

	} catch (error) {
		res.status(500).json({ message: 'Error signing up', error: error.message });
	}
};

module.exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: 'Email and password are required' });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'User not found' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}
		const otp = Math.floor(100000 + Math.random() * 900000).toString();

		// Save OTP to DB
		const otpRecord = await Otp.create({ email, otp });
		await otpRecord.save();

		// Send OTP to user's email
		await sendOtpEmail(email, otp);

		// 🔐 Generate new JWT token


		res.status(200).json({
			message: 'OTP sent to your email. Please verify to complete login.',
		});


	} catch (err) {
		res.status(500).json({ message: 'Error logging in', error: err.message });
	}
};

module.exports.logout = (req, res) => {
	// Clear the cookie
	try {
		res.clearCookie('token', {
			 httpOnly: false,
            secure: false,
            sameSite: 'Lax',
		});
		console.log("Cookie deleted");
		
		res.status(200).json({ message: 'Logged out successfully' });
	} catch (err) {
		res.status(500).json({ message: 'Error logging out', error: err.message });
	}
};