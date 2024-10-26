const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: false }, // Optional field
		email: { type: String, required: true, unique: true }, // Ensure emails are unique
		password: { type: String, required: true },
		terms: { type: Boolean, required: true },
	},
	{
		timestamps: true, // Automatically add createdAt and updatedAt fields
	},
);

// Export the User model
module.exports = mongoose.model('User', userSchema, 'users'); // "users" is the collection name
