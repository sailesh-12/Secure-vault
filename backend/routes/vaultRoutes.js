const express= require('express');
const router = express.Router();
const { addVaultEntry,getVaultEntries,updateVaultEntry,deleteVaultEntry} = require('../controllers/vaultController');
const {verifyToken} = require('../middleware/verifyToken');



router.post('/', verifyToken, addVaultEntry);
router.get('/', verifyToken, getVaultEntries);
router.put('/:id', verifyToken, updateVaultEntry);
router.delete('/:id', verifyToken, deleteVaultEntry);

module.exports = router;
