const crypto = require('crypto');
require('dotenv').config();

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; 
const IV_SECRET = process.env.IV_SECRET; 

const encryptPassword = (plainText) => {
  const iv = Buffer.from(IV_SECRET, 'utf-8');
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(plainText, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}
module.exports = encryptPassword;