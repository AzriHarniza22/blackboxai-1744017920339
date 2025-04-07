import React, { useState, useEffect } from 'react';

const DailyChallenge = () => {
    const [challenge, setChallenge] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                // In a real implementation, we would call the API
                // const response = await fetch('/api/challenge/daily');
                // const data = await response.json();
                // setChallenge(data);
                
                // Mock data for now
                const mockChallenge = {
                    question: 'What is the main goal of SDG 4?',
                    options: ['Quality Education', 'No Poverty', 'Gender Equality', 'Clean Water'],
                    correctAnswer: 'Quality Education',
                    explanation: 'SDG 4 aims to ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.'
                };
                setChallenge(mockChallenge);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching daily challenge:', error);
                setLoading(false);
            }
        };

        fetchChallenge();
    }, []);

    const handleSubmit = (selectedOption) => {
        if (selectedOption === challenge.correctAnswer) {
            alert('Correct! ' + challenge.explanation);
        } else {
            alert('Incorrect! ' + challenge.explanation);
        }
    };

    if (loading) {
        return <div className="text-center py-8">Loading daily challenge...</div>;
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Daily Challenge</h2>
            <p className="mb-4">{challenge.question}</p>
            <div className="space-y-3">
                {challenge.options.map((option, index) => (
                    <button
                        key={index}
                        className="w-full text-left p-3 rounded-lg border hover:bg-gray-50"
                        onClick={() => handleSubmit(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DailyChallenge;