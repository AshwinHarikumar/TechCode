const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const documentRoutes = require('./routes/documents');

// Firebase Admin SDK initialization
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// MongoDB connection
mongoose.connect('mongodb+srv://techcodehub2024:1234@cluster0.8mc5s56.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

const app = express(); // Initialize the Express application
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Define your MongoDB schema
const userSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true }, // Make name a required field
  email: { type: String, required: true, unique: true },
  password: { type: String },
  avatar: { type: String },
  loginTime: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false }
});
const User = mongoose.model('User', userSchema);

// Endpoint to handle email and password login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token for session management
    const token = jwt.sign({ uid: user.uid, email: user.email, isAdmin: user.isAdmin }, 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMjM4ODU0NSwiaWF0IjoxNzIyMzg4NTQ1fQ.Cpp8nfxTCXklTasIwjFrRwW78lBvn37OO2Pnv7zyDGA', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Endpoint to handle Google Sign-In
app.post('/login/google', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    const email = decodedToken.email;
    const avatar = decodedToken.picture; // Avatar URL from Google
    const name = decodedToken.name; // Ensure name is captured from token

    // Check if the email is the admin email
    const isAdmin = email === 'techcodehub.2024@gmail.com';

    // Save or update login data to MongoDB
    const user = await User.findOneAndUpdate(
      { uid },
      { uid, email, name, avatar, isAdmin }, // Include name
      { upsert: true, new: true }
    );

    const jwtToken = jwt.sign({ uid: user.uid, email: user.email, isAdmin: user.isAdmin }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login data saved successfully', token: jwtToken, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error });
  }
});

// Endpoint to handle password reset
app.post('/resetPassword', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email required' });
  }

  try {
    await admin.auth().sendPasswordResetEmail(email);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending password reset email', error });
  }
});

// Endpoint to create a new user (for testing or sign-up)
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password required' });
  }

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const isAdmin = email === 'techcodehub.2024@gmail.com'; // Assign admin status based on email
    const user = new User({ name, email, password: hashedPassword, isAdmin });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Document routes
app.use('/api/documents', documentRoutes);

// Route to get all users (change the endpoint to match React component expectations)
app.get('/admin/users', async (req, res) => {
  try {
    const users = await User.find({}, 'uid name email avatar loginTime'); // Retrieve uid, name, email, avatar, and loginTime
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// Route to get a specific user
app.get('/admin/users/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await User.findOne({ uid }, 'name email avatar loginTime'); // Retrieve name, email, avatar, and loginTime
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

// Route to delete a user (this route is admin-only)
app.delete('/admin/users/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    await User.findOneAndDelete({ uid });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
