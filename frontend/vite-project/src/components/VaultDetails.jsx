import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios'
import VaultCard from './VaultCard.jsx';
import dotenv from 'dotenv';

dotenv.config();

const VaultDetails = () => {
	const [vaultEntries,setVaultEntries]=useState('');
	const [loading,setLoading]=useState(false);
	const [error,setError]=useState();
	useEffect(()=>{
		const fetchDetails=async(e)=>{
			setLoading(true);
			try{
				const response=await axios.get(`${import.meta.env.REACT_APP_API_BASE_URL}/api/vault`,{
					withCredentials: true
				});
				console.log(response.data);
				setVaultEntries(response.data);
			}catch(err){
				setError(true);
				console.error("Error Occured !!!!");
			}
			finally{
				setLoading(false);
			}
		}
		fetchDetails();
	},[])
  return (
	<div className='flex flex-wrap justify-start gap-6 mt-10'>
		{
			vaultEntries.length>0 && vaultEntries.map((vault)=>(
				<VaultCard entry={vault} key={vault._id}/>
			))
		}
	</div>
  )
}

export default VaultDetails
