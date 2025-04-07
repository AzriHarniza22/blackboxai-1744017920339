const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get questions by SDG number
router.get('/:sdgNumber', async (req, res) => {
    const sdgNumber = req.params.sdgNumber;
    try {
        const questions = await Question.find({ sdgNumber });
        res.json(questions);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Submit answer for a question
router.post('/submit', async (req, res) => {
    const { questionId, userId, answer } = req.body;
    try {
        const question = await Question.findById(questionId);
        if (!question) return res.status(404).send('Question not found');

        const isCorrect = question.correctAnswer === answer;
        // Logic to update user score can be added here

        res.json({ isCorrect });
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;