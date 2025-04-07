const { Server } = require('socket.io');
const Room = require('./models/Room');
const Question = require('./models/Question');

const socket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log(`New connection: ${socket.id}`);

        // Join room
        socket.on('join-room', async ({ roomId, userId, username }) => {
            try {
                const room = await Room.findOne({ roomId });
                if (!room) {
                    return socket.emit('error', 'Room not found');
                }
                if (room.isFull()) {
                    return socket.emit('error', 'Room is full');
                }

                socket.join(roomId);
                room.players.push({ userId, username, score: 0 });
                await room.save();

                io.to(roomId).emit('player-joined', { username, players: room.players });
            } catch (err) {
                socket.emit('error', err.message);
            }
        });

        // Start quiz
        socket.on('start-quiz', async ({ roomId }) => {
            try {
                const room = await Room.findOne({ roomId });
                if (!room) {
                    return socket.emit('error', 'Room not found');
                }

                // Get random question
                const question = await Question.aggregate([{ $sample: { size: 1 } }]);
                room.currentQuestion = {
                    questionId: question[0]._id,
                    startTime: new Date()
                };
                room.status = 'in-progress';
                await room.save();

                io.to(roomId).emit('question', {
                    question: question[0],
                    timeLimit: room.currentQuestion.timeLimit
                });
            } catch (err) {
                socket.emit('error', err.message);
            }
        });

        // Submit answer
        socket.on('submit-answer', async ({ roomId, userId, answer }) => {
            try {
                const room = await Room.findOne({ roomId });
                if (!room) {
                    return socket.emit('error', 'Room not found');
                }

                const question = await Question.findById(room.currentQuestion.questionId);
                const isCorrect = question.correctAnswer === answer;

                // Update player score
                const player = room.players.find(p => p.userId.toString() === userId);
                if (player) {
                    player.score += isCorrect ? 10 : 0;
                    await room.save();
                }

                socket.emit('answer-result', { isCorrect });
                io.to(roomId).emit('score-update', room.players);
            } catch (err) {
                socket.emit('error', err.message);
            }
        });

        // Disconnect
        socket.on('disconnect', () => {
            console.log(`Disconnected: ${socket.id}`);
        });
    });

    return io;
};

module.exports = socket;