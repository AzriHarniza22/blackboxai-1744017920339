import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                // In a real implementation, we would call the API
                // const response = await fetch('/api/leaderboard');
                // const data = await response.json();
                // setLeaderboard(data);
                
                // Mock data for now
                const mockData = [
                    { rank: 1, username: 'QuizMaster', score: 1250, badges: 5 },
                    { rank: 2, username: 'TriviaKing', score: 1100, badges: 4 },
                    { rank: 3, username: 'SDGChampion', score: 950, badges: 3 },
                    { rank: 4, username: 'EduExplorer', score: 800, badges: 2 },
                    { rank: 5, username: 'NewPlayer', score: 500, badges: 1 }
                ];
                setLeaderboard(mockData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) {
        return <div className="text-center py-8">Loading leaderboard...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Leaderboard</h1>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Badges</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {leaderboard.map((entry) => (
                            <tr key={entry.rank} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                                        ${entry.rank === 1 ? 'bg-yellow-100 text-yellow-800' : 
                                          entry.rank === 2 ? 'bg-gray-100 text-gray-800' : 
                                          entry.rank === 3 ? 'bg-orange-100 text-orange-800' : 
                                          'bg-blue-100 text-blue-800'}`}>
                                        #{entry.rank}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {entry.username}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {entry.score}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {entry.badges}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;