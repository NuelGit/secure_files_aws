const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { promisify } = require('util');
const { authenticateToken } = require('./authMiddleware'); // Custom authentication middleware

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB User model
const User = mongoose.model('User', {
  username: String,
  password: String,
});

// MongoDB Profile model
const Profile = mongoose.model('Profile', {
  userId: String,
  fullName: String,
  email: String,
  // other profile fields
});

// MongoDB File model (for storing file metadata)
const File = mongoose.model('File', {
  userId: String,
  filename: String,
  originalFilename: String,
  filePath: String,
  fileSize: Number,
  // other file metadata fields
});

// MongoDB CMK model (Customer Managed Keys)
const CMK = mongoose.model('CMK', {
  userId: String,
  cmk: String, // The actual Customer Managed Key (RSA public key or similar)
  // other CMK metadata fields
});

// MongoDB connection setup
mongoose.connect('mongodb://localhost/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Multer storage setup for file upload
const storage = multer.diskStorage({
  destination: './uploads', // Specify the upload directory
  filename: (req, file, callback) => {
    // Generate a unique filename using a hash
    const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(8).toString('hex');
    callback(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// User registration route
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken.' });
    }

    // Hash the user's password before storing it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save the user in the database
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Return a success response
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
});

// User login route
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Generate a JWT token upon successful login
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '1h', // Token expiration time (adjust as needed)
    });

    // Return the token as part of the response
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An error occurred during login.' });
  }
});

// User profile routes
app.get('/api/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user's profile by userId
    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found.' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Error while fetching profile:', error);
    res.status(500).json({ error: 'An error occurred while fetching the profile.' });
  }
});

app.put('/api/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { fullName, email } = req.body;

    // Find and update the user's profile by userId
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId },
      { fullName, email },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: 'Profile not found.' });
    }

    res.json(updatedProfile);
  } catch (error) {
    console.error('Error while updating profile:', error);
    res.status(500).json({ error: 'An error occurred while updating the profile.' });
  }
});

// File upload route
app.post('/api/upload', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const { userId } = req.user;
    const { filename, originalname, path: filePath, size } = req.file;

    // Store file metadata in the database
    const newFile = new File({ userId, filename, originalFilename: originalname, filePath, fileSize: size });
    await newFile.save();

    res.status(201).json({ message: 'File uploaded successfully.' });
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ error: 'An error occurred during file upload.' });
  }
});

// Protected route example
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route.' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});