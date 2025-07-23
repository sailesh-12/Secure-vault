const crypto = require('crypto');
require('dotenv').config();

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 32 bytes
const IV_SECRET = process.env.IV_SECRET; // Must be 16 bytes

const decryptPassword = (encryptedText) => {
	const iv=Buffer.from(IV_SECRET, 'utf-8');
	const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
	let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
	decrypted += decipher.final('utf-8');
	return decrypted;
}

module.exports = { decryptPassword };