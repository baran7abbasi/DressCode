require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Import bcrypt
const multer = require('multer'); // Import multer

const Image = require('./models/Image'); // Import the Image model

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5001;

const User = require('./models/User');

// Registration endpoint
app.post('/register', async (req, res) => {
	try {
		const { name, email, password, terms } = req.body;

		// Check if the user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		// Hash the password before saving
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
		const newUser = new User({
			name,
			email,
			password: hashedPassword, // Store hashed password
			terms,
		});

		await newUser.save();
		res.status(201).json({
			message: 'User registered successfully!',
			userId: newUser._id, // This should now contain the MongoDB-generated user ID
		});
	} catch (error) {
		console.error('Error registering user:', error);
		res.status(500).json({ error: 'Failed to register user' });
	}
});

// Login endpoint
app.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		// Find the user by email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "You don't have an account" });
		}

		// Compare the provided password with the stored hashed password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid password' });
		}

		console.log('User ID from mongo:', user._id);

		res.status(200).json({
			message: 'Login successful!',
			userId: user._id, // Return user ID upon successful login
		});
	} catch (error) {
		console.error('Error during login:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Set the destination for uploaded files
const upload = multer({ dest: 'uploads/' });

// Upload endpoint
app.post('/upload', upload.array('images'), async (req, res) => {
	console.log('Received upload request');
	console.log('Request Body:', req.body); // Log the entire request body
	console.log('Uploaded Files:', req.files);
	try {
		console.log('trying to upload image');
		const { category, userId } = req.body;
		const files = req.files; // Uploaded files

		// Ensure userId and category are provided
		if (!userId || !category || !files.length) {
			return res
				.status(400)
				.json({ message: 'User ID, category, and images are required.' });
		}

		// Process each uploaded file
		const imagePaths = files.map((file) => {
			return file.path; // Assuming the file is stored locally, adjust if using cloud storage
		});

		// Save image info in the database
		const imageDocuments = imagePaths.map((imagePath) => ({
			userId,
			category,
			imagePath,
		}));

		console.log('category = ' + category);

		await Image.insertMany(imageDocuments); // Save all image records to MongoDB

		res.status(200).json({
			message: 'Upload successful!',
			files: imageDocuments, // Ensure this contains the paths to the images
		});
	} catch (error) {
		console.error('Upload error:', error);
		res.status(500).json({ message: 'Failed to upload images.' });
	}
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
