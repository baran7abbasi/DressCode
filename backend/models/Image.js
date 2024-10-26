const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
	category: { type: String, required: true },
	imagePath: { type: String, required: true }, // This can store the URL or path to the image
	createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.model('Image', ImageSchema, 'images');
module.exports = Image;
