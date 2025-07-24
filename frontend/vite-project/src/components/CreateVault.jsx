import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CreateVault = () => {
  const [category, setCategory] = useState('');
  const [siteName, setSiteName] = useState('');
  const [siteURL, setSiteUrl] = useState('');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');
  const navigate=useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();
    const formData = {
      category,
      siteName,
      siteURL,
      password,
      notes,
    };

    console.log('Vault Entry:', formData);
    // You can now send `formData` to your backend here using fetch or Axios
	try{
		const response=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/vault`,{
			formData
		},{
			withCredentials: true
		});
		if(response.status===201){
			navigate('/');
		}
	}catch(err){
		console.log(err)
	}
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Create New Vault Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              placeholder="e.g., Social, Banking"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Site Name</label>
            <input
              type="text"
              placeholder="e.g., Facebook"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Site URL</label>
            <input
              type="url"
              placeholder="e.g., https://facebook.com"
              value={siteURL}
              onChange={(e) => setSiteUrl(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Notes</label>
            <textarea
              placeholder="Any notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Save Vault Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateVault;
