const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
	name: String,
	path: String,
	category: String,
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

const Image = mongoose.model('Image', imageSchema, 'images');
module.exports = Image;
