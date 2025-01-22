const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Get all comments
router.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find().sort({ date: -1 });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new comment
router.post('/comments', async (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        rating: req.body.rating
    });

    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router; 