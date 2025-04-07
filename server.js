const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socket = require('./socket');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/eduquest', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
        socket(server);
    })
    .catch(err => console.error(err));