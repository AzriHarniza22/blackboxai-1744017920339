import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const QuizPage = () => {
    const { sdgNumber } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    // In a real implementation, we would fetch questions from the API
    useEffect(() => {
        // Simulate API call
        const fetchQuestions = async () => {
            try {
                // const response = await fetch(`/api/quiz/sdg/${sdgNumber}`);
                // const data = await response.json();
                // setQuestions(data);
                
                // Mock data for now
                const mockQuestions = [
                    {
                        question: `What is the main focus of SDG ${sdgNumber}?`,
                        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
                        correctAnswer: 'Option 1',
                        explanation: 'This is the correct answer because...'
                    },
                    {
                        question: `Which of these relates to SDG ${sdgNumber}?`,
                        options: ['Choice A', 'Choice B', 'Choice C', 'Choice D'],
                        correctAnswer: 'Choice B',
                        explanation: 'This choice best represents the goal'
                    }
                ];
                setQuestions(mockQuestions);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, [sdgNumber]);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        // Check if answer is correct
        if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
        }

        // Move to next question or end quiz
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
        } else {
            setQuizCompleted(true);
        }
    };

    if (questions.length === 0) {
        return <div className="text-center py-8">Loading questions...</div>;
    }

    if (quizCompleted) {
        return (
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
                <p className="text-lg">Your score: {score}/{questions.length}</p>
                <button 
                    className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </button>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">SDG {sdgNumber} Quiz</h2>
            <p className="text-gray-600 mb-4">Question {currentQuestionIndex + 1} of {questions.length}</p>
            
            <div className="mb-6">
                <p className="text-lg font-medium mb-4">{currentQuestion.question}</p>
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            className={`w-full text-left p-3 rounded-lg border ${selectedOption === option ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-50'}`}
                            onClick={() => handleOptionSelect(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                onClick={handleNextQuestion}
                disabled={!selectedOption}
            >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
        </div>
    );
};

export default QuizPage;