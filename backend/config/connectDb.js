const mongoose = require('mongoose');
require('dotenv').config();

const connectDB=async()=>{
	try {
		console.log(process.env.MONGODB_URL);
		await mongoose.connect(process.env.MONGODB_URL);
		console.log('MongoDB connected successfully');
	} catch (error) {
		console.error('MongoDB connection failed:', error.message);
		process.exit(1); // Exit the process with failure
	}
}

module.exports=connectDB;