import React from 'react';
import { Link } from 'react-router-dom';

const SDGZones = () => {
    const sdgs = [
        { number: 1, title: 'No Poverty', color: 'bg-red-500' },
        { number: 2, title: 'Zero Hunger', color: 'bg-orange-500' },
        { number: 3, title: 'Good Health', color: 'bg-green-500' },
        { number: 4, title: 'Quality Education', color: 'bg-red-600' },
        { number: 5, title: 'Gender Equality', color: 'bg-yellow-500' },
        { number: 6, title: 'Clean Water', color: 'bg-blue-500' },
        { number: 7, title: 'Affordable Energy', color: 'bg-yellow-600' },
        { number: 8, title: 'Decent Work', color: 'bg-red-700' },
        { number: 9, title: 'Industry Innovation', color: 'bg-orange-600' },
        { number: 10, title: 'Reduced Inequalities', color: 'bg-pink-500' },
        { number: 11, title: 'Sustainable Cities', color: 'bg-yellow-700' },
        { number: 12, title: 'Responsible Consumption', color: 'bg-brown-500' },
        { number: 13, title: 'Climate Action', color: 'bg-green-600' },
        { number: 14, title: 'Life Below Water', color: 'bg-blue-600' },
        { number: 15, title: 'Life On Land', color: 'bg-green-700' },
        { number: 16, title: 'Peace and Justice', color: 'bg-blue-700' },
        { number: 17, title: 'Partnerships', color: 'bg-indigo-500' }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Sustainable Development Goals</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sdgs.map(sdg => (
                    <Link 
                        to={`/quiz/${sdg.number}`}
                        key={sdg.number}
                        className={`${sdg.color} rounded-lg p-6 text-white shadow-md hover:shadow-lg transition`}
                    >
                        <h2 className="text-xl font-bold">{sdg.number}. {sdg.title}</h2>
                        <p className="mt-2 text-sm opacity-90">Take quiz about this goal</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SDGZones;