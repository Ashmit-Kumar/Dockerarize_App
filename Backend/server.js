// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv=require('dotenv')
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// User schema and model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    photo: String,
});

const User = mongoose.model('User', userSchema);

// Visitor count schema and model
const visitorCountSchema = new mongoose.Schema({
    count: { type: Number, default: 1 }
});

const VisitorCount = mongoose.model('VisitorCount', visitorCountSchema);

// Initialize visitor count in the database if it doesn't exist
async function initializeVisitorCount() {
    const existingCount = await VisitorCount.findOne();
    if (!existingCount) {
        const initialCount = new VisitorCount({ count: 1 });
        await initialCount.save();
        console.log('Initial visitor count set to 1');
    } else {
        console.log('Visitor count already initialized:', existingCount.count);
    }
}

// Initialize the visitor count
initializeVisitorCount();

// Endpoint to submit user data
app.post('/api/users', async (req, res) => {
    const { name, email, photo } = req.body;

    if (name && email) {
        const newUser = new User({ name, email, photo });
        await newUser.save();

        // Update visitor count
        try {
            let visitorCountDoc = await VisitorCount.findOne();
            if (!visitorCountDoc) {
                // Create a new visitor count document if it doesn't exist
                visitorCountDoc = new VisitorCount({ count: 1 });
            } else {
                // Increment the count
                visitorCountDoc.count += 1; 
            }
            await visitorCountDoc.save(); // Save the updated document
            console.log('Visitor count updated to:', visitorCountDoc.count);
            res.status(201).json({ message: 'User added successfully', visitorCount: visitorCountDoc.count });
        } catch (error) {
            console.error('Error updating visitor count:', error);
            res.status(500).json({ message: 'Error updating visitor count' });
        }
    } else {
        res.status(400).json({ message: 'Name and email are required' });
    }
});

// Endpoint to get the user list and visitor count
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        const visitorCountDoc = await VisitorCount.findOne();
        const visitorCount = visitorCountDoc ? visitorCountDoc.count : 0; // Default to 0 if null
        res.status(200).json({ users, visitorCount });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
