const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get global leaderboard
router.get('/global', async (req, res) => {
    try {
        const users = await User.find()
            .sort({ score: -1 })
            .limit(100)
            .select('username score badges');
        res.json(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get leaderboard by SDG (top performers for specific SDG)
router.get('/sdg/:sdgNumber', async (req, res) => {
    const sdgNumber = req.params.sdgNumber;
    try {
        const users = await User.find({
            [`progress.sdgZonesUnlocked`]: sdgNumber
        })
        .sort({ score: -1 })
        .limit(50)
        .select('username score badges');
        res.json(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get friends leaderboard (would require friend system implementation)
router.get('/friends', async (req, res) => {
    try {
        // In a real implementation, this would filter by friends list
        const users = await User.find()
            .sort({ score: -1 })
            .limit(20)
            .select('username score badges');
        res.json(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;