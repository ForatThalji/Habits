const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const habitRoutes = require('./routes/habitRoutes');
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection failed:', err));

// Use routes
app.use('/habit', habitRoutes);

// Define the port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
