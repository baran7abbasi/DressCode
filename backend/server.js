require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Import models
const Image = require('./models/Image');
const User = require('./models/User');

const app = express();
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir);
}

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5001;

// Registration endpoint
app.post('/register', async (req, res) => {
	try {
		const { name, email, password, terms } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			name,
			email,
			password: hashedPassword,
			terms,
		});

		await newUser.save();
		res.status(201).json({
			message: 'User registered successfully!',
			userId: newUser._id,
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

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "You don't have an account" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid password' });
		}

		console.log('User ID from mongo:', user._id);

		res.status(200).json({
			message: 'Login successful!',
			userId: user._id,
		});
	} catch (error) {
		console.error('Error during login:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// First, handle the file upload without processing the name
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		// Generate a temporary unique filename
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({ storage });

// Modified upload endpoint to handle the image name properly
app.post('/upload', upload.single('image'), async (req, res) => {
	try {
		const { imageName, category, userId } = req.body;

		if (!imageName || !category || !userId) {
			return res.status(400).json({
				error: 'Missing required fields',
				received: { imageName, category, userId },
			});
		}

		const originalPath = req.file.path;
		const ext = path.extname(req.file.originalname);
		const newPath = path.join(uploadsDir, `${imageName}${ext}`);

		// Rename the file to use the custom name
		fs.renameSync(originalPath, newPath);

		// Create new image document with additional fields
		const newImage = new Image({
			name: imageName,
			path: newPath,
			category: category,
			userId: userId,
		});

		// Save to MongoDB
		await newImage.save();

		res.status(200).json({
			message: 'Image uploaded successfully!',
			imagePath: newPath,
			imageName: imageName,
			category: category,
			userId: userId,
		});
	} catch (error) {
		console.error('Error uploading image:', error);
		res.status(500).json({ error: 'Failed to upload image' });
	}
});

app.get('/clothing', async (req, res) => {
	try {
		const { category, userId } = req.query;

		if (!userId) {
			return res.status(400).json({ error: 'User ID is required' });
		}

		const query = { userId };
		if (category) {
			query.category = category;
		}

		const clothingItems = await Image.find(query);

		const transformedItems = clothingItems.map((item) => ({
			...item.toObject(),
			path: item.path.split('/').pop(),
		}));

		res.json(transformedItems);
	} catch (error) {
		console.error('Error fetching clothing items:', error);
		res.status(500).json({ error: 'Failed to fetch clothing items' });
	}
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
