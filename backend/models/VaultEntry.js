const mongoose = require('mongoose');
const vaultSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	category: {
		type: String,
		required: true,
		enum: ['Social', 'Banking', 'email', 'other'],
		default: 'other'
	},
	siteName: {
		type: String,
		required: true,
	},
	siteURL: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
	notes: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
}, { timestamps: true, versionKey: false });

const VaultEntry = mongoose.model('VaultEntry', vaultSchema);
module.exports = VaultEntry;