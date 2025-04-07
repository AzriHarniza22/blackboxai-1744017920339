const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomId: { 
        type: String, 
        required: true,
        unique: true,
        index: true
    },
    players: {
        type: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            username: {
                type: String,
                required: true
            },
            score: {
                type: Number,
                default: 0
            }
        }],
        validate: {
            validator: function(v) {
                return v.length >= 2 && v.length <= 5;
            },
            message: 'Rooms must have between 2-5 players'
        }
    },
    currentQuestion: {
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        },
        startTime: Date,
        timeLimit: {
            type: Number,
            default: 30 // seconds
        }
    },
    status: { 
        type: String, 
        enum: ['waiting', 'in-progress', 'completed'],
        default: 'waiting'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // Auto-delete after 24 hours
    }
});

// Index for faster querying by status
roomSchema.index({ status: 1 });

// Add method to check if room is full
roomSchema.methods.isFull = function() {
    return this.players.length >= 5;
};

module.exports = mongoose.model('Room', roomSchema);