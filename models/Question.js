const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    sdgNumber: { 
        type: Number, 
        required: true,
        min: 1,
        max: 17 
    },
    question: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 500
    },
    options: {
        type: [String],
        required: true,
        validate: {
            validator: function(v) {
                return v.length >= 2 && v.length <= 4;
            },
            message: 'Questions must have between 2-4 options'
        }
    },
    correctAnswer: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return this.options.includes(v);
            },
            message: 'Correct answer must be one of the provided options'
        }
    },
    difficulty: { 
        type: String, 
        required: true,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
    },
    explanation: {
        type: String,
        maxlength: 1000
    },
    language: {
        type: String,
        enum: ['en', 'id'],
        default: 'en'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster querying by SDG number and difficulty
questionSchema.index({ sdgNumber: 1, difficulty: 1 });

module.exports = mongoose.model('Question', questionSchema);