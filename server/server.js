const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const commentRoutes = require('./routes/comments');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api', commentRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/kwau_village', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 