import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
	const location = useLocation();
	const { message } = location.state || {};
	const [email, setEmail] = useState('');
	const [otp, setOtp] = useState('');
	const navigate = useNavigate();
	const [output, setOutput] = useState('');
	const [error, setError] = useState('');

	const handleVerification = async (e) => {
		e.preventDefault(); // Prevent default form submission
		setError('');
		setOutput('');

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_BASE_URL}/api/auth/verify-otp`,
				{ email, otp },
				{ withCredentials: true }
			);

			console.log(response);
			setOutput(response.data.message);
			// Navigate after a short delay to allow the user to see the success message
			setTimeout(() => {
				navigate('/', { state: "Login successful" });
			}, 1500);

		} catch (err) {
			console.error(err);
			// Set a more user-friendly error message
			const errorMessage = err.response?.data?.message || "Verification failed. Please try again.";
			setError(errorMessage);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-900">
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
				<div className="text-center">
					<h2 className="text-3xl font-extrabold text-gray-900">
						Verify Your Account
					</h2>
					<p className="mt-2 text-sm text-gray-600">
						Enter the OTP sent to your email address.
					</p>
				</div>

				{/* Display initial message from previous page (e.g., "OTP sent successfully") */}
				{message && <p className="text-sm text-center text-green-600">{message}</p>}

				<form className="space-y-6" onSubmit={handleVerification}>
					{/* Email Input */}
					<div>
						<label htmlFor="email" className="text-sm font-medium text-gray-700 sr-only">
							Email
						</label>
						<input
							id="email"
							type="email"
							placeholder='Enter your email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>

					{/* OTP Input */}
					<div>
						<label htmlFor="otp" className="text-sm font-medium text-gray-700 sr-only">
							OTP
						</label>
						<input
							id="otp"
							type="text"
							placeholder='Enter the OTP'
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
							required
							className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>

					{/* Submit Button */}
					<div>
						<button
							type="submit"
							className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Verify & Proceed
						</button>
					</div>
				</form>
				
				{/* Output Messages */}
				<div className="text-center">
					{output && <h2 className="text-lg font-medium text-green-600">{output}</h2>}
					{error && <h2 className="text-lg font-medium text-red-600">{error}</h2>}
				</div>
			</div>
		</div>
	);
};

export default VerifyOtp;