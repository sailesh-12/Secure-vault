import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const VaultCard = ({ entry }) => {
  const navigate=useNavigate();
  const handleEdit = () => {
    navigate('/updateVault', { state: { entry } });  // pass entire vault as state
  };
  const handleDelete=async()=>{
    try{
      const res=await axios.delete(`${import.meta.env.REACT_APP_API_BASE_URL}/api/vault/${entry._id}`,{
        withCredentials:true
      });
      console.log(res);
      if (res.status===200){
        window.location.reload();
      }

    }catch(err){
      console.log(err);
    }
  }

  return (
    <div>
      <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition duration-300 w-full sm:w-80">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{entry.category}</h3>

        <div className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Sitename:</span> {entry.siteName}
        </div>

        <div className="text-sm text-gray-600 mb-1">
          <span className="font-medium">SiteUrl:</span> {entry.siteUrl}
        </div>

        <div className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Password:</span> {entry.password}
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <span className="font-medium">notes:</span> {entry.notes}
        </div>

        <div className="text-xs text-gray-400 mt-2">
          Created at: {new Date(entry.createdAt).toLocaleDateString()}
        </div>
        <button onClick={handleEdit} className='text-xl mt-2 hover:cursor-pointer text-black'>Edit</button>
        <br />
        <button onClick={handleDelete} className='text-xl mt-2 hover:cursor-pointer text-black'>Delete</button>
      </div>
    </div>


  );
};

export default VaultCard;
