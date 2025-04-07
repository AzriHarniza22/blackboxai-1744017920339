const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 30,
        unique: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: { 
        type: String, 
        required: true,
        minlength: 8
    },
    badges: {
        type: [String],
        default: []
    },
    progress: {
        sdgZonesUnlocked: {
            type: [Number],
            default: [1] // Start with first SDG unlocked
        },
        dailyStreak: {
            type: Number,
            default: 0
        }
    },
    score: { 
        type: Number, 
        default: 0 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add pre-save hook for password hashing
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    // In a real implementation, we would hash the password here
    next();
});

module.exports = mongoose.model('User', userSchema);