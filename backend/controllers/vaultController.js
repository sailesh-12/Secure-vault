const VaultEntry = require('../models/VaultEntry.js');
const encryptPassword = require('../utils/encrypt.js');
const {decryptPassword} = require('../utils/decrypt.js'); // Assuming you have a decrypt function
const addVaultEntry = async (req, res) => {
  try {
    const { category, siteName, siteURL, password, notes } = req.body.formData;
    console.log(req.body);

    if (!category || !siteName  || !password || !siteURL || !notes) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    // 🔒 Encrypt password
    const encryptedPassword = encryptPassword(password);

    // 💾 Save to DB
    const newEntry = new VaultEntry({
      user: req.user.id, // from JWT
      category,
      siteName,
      siteURL,
      password: encryptedPassword,
      notes,
    });

    await newEntry.save();

    res.status(201).json({ message: 'Vault entry added successfully', entryId: newEntry._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding vault entry', error: err.message });
  }
};


const getVaultEntries=async(req,res)=>{
  try{
    const userId = req.user.id; // from JWT
    const entries = await VaultEntry.find({ user: userId }).sort({ createdAt: 1 });

    if (!entries || entries.length === 0) {
      return res.status(404).json({ message: 'No vault entries found' });
    }
    // Decrypt passwords before sending
    const decryptedEntries = entries.map(entry => ({
      ...entry.toObject(),
      password: decryptPassword(entry.password)
    }));
    res.status(200).json(decryptedEntries);
  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Error fetching vault entries', error: err.message });
  }
};

const updateVaultEntry=async(req,res)=>{
  try{
    const {category, siteName, siteUrl, password, notes} = req.body;
    
    const entryId = req.params.id; // Get entry ID from request parameters
    const userId = req.user.id; // from JWT
    //you can only update your own entries
    console.log(entryId);
    
    const entry = await VaultEntry.findById(entryId);
    console.log(entry);
    
    if (!entry || entry.user.toString() !== userId) {
      return res.status(404).json({ message: 'Vault entry not found or unauthorized' });
    }
    if (!category || !siteName || !password || !siteUrl || !notes) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    // Update the entry in the database
    const updatedEntry = await VaultEntry.findByIdAndUpdate(entryId, {
      category,
      siteName,
      siteUrl,
      password: encryptPassword(password),
      notes
    }, { new: true });

    if (!updatedEntry) {
      return res.status(404).json({ message: 'Vault entry not found' });
    }

    res.status(200).json({ message: 'Vault entry updated successfully', entry: updatedEntry });
  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Error updating vault entry', error: err.message });
  }
}

const deleteVaultEntry=async(req,res)=>{
  try{
    const entryId = req.params.id; // Get entry ID from request parameters
    console.log(entryId);
    
    const userId = req.user.id; // from JWT
    if (!entryId) {
      return res.status(400).json({ message: 'Entry ID is required' });
    }

    const entry=await VaultEntry.findById(entryId);
    if (!entry || entry.user.toString() !== userId) {
      return res.status(404).json({ message: 'Vault entry not found or unauthorized' });  
    }
    // Delete the entry from the database
    const deletedEntry =await VaultEntry.findByIdAndDelete(entryId);
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Vault entry not found' });
    }

    res.status(200).json({ message: 'Vault entry deleted successfully', deletedEntry });

  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Error deleting vault entry', error: err.message });
  }
}


module.exports={
  addVaultEntry,
  getVaultEntries,
  updateVaultEntry,
  deleteVaultEntry
};
