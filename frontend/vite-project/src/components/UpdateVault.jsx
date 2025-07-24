import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateVault = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const vault = state?.entry;

  const [category, setCategory] = useState('');
  const [siteName, setSiteName] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');

  // Prefill form fields
  useEffect(() => {
    if (vault) {
      setCategory(vault.category || '');
      setSiteName(vault.siteName || '');
      setSiteUrl(vault.siteURL || '');
      setPassword(vault.password || '');
      setNotes(vault.notes || '');
    }
  }, [vault]);

  // Handle update
  const updateDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/vault/${vault._id}`,
        {
          category,
          siteName,
          siteUrl,
          password,
          notes,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Updated entry:", response.data);
      navigate('/'); // redirect to main vault page if needed
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <form
        onSubmit={updateDetails}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Update Vault Entry</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            placeholder="Enter the Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Site URL</label>
          <input
            type="text"
            placeholder="Enter the Site URL"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Site Name</label>
          <input
            type="text"
            placeholder="Enter the Site Name"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="text"
            placeholder="Enter the Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Notes</label>
          <input
            type="text"
            placeholder="Enter the Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Update Vault
        </button>
      </form>
    </div>
  );
};

export default UpdateVault;
