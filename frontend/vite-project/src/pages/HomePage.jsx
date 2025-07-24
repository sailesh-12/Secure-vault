import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VaultDetails from '../components/VaultDetails.jsx';
import Cookies from 'js-cookie';
const HomePage = () => {
	const navigate=useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Replace 'token' with your actual cookie name if different
    const cookie=Cookies.get('token');
    setIsLoggedIn(cookie!==undefined);
  }, []);

  const handleLogout=async()=>{
		try{
			const response=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/logout`,{},{
        withCredentials: true,
      });
			console.log(response);
			setIsLoggedIn(false);
			navigate('/login');
		}catch(err){
			console.error(err);
		}
	}
  return (
    <div>
      <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-2xl mr-4 font-bold">Secure Vault</div>

          {/* Right side links */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn && (
              <>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                  Signup
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                  Login
                </Link>
              </>
            )}
            {isLoggedIn && (
              <button className='px-4 py-2 rounded hover:bg-gray-700 transition' onClick={handleLogout}>
				Logout
			</button>
            )}
            {/* Profile picture (mock) */}
            <img
              src="https://i.pravatar.cc/42"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="p-4 text-white bg-gray-800 min-h-screen">
        <h1 className="text-3xl font-semibold">Welcome to the Home Page!</h1>
        <div className='flex justify-between items-center top-2.5 mt-10'>
          <Link className='text-2xl text-cyan-50 bg-gray-900 rounded-2xl font-medium p-2' to="/createVault">Add Your Password</Link>
        </div>
        <VaultDetails/>
        
      </div>
    </div>
  );
};

export default HomePage;
