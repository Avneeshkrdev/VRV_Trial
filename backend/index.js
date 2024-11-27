const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const mongoURL = 'your_mongodb_url_here';
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Example API route
app.get('/api/data', (req, res) => {
    res.json({ message: 'This is your data' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});