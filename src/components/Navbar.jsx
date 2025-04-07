import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl">EduQuest</h1>
                <div>
                    <Link to="/" className="text-white px-4">Home</Link>
                    <Link to="/login" className="text-white px-4">Login</Link>
                    <Link to="/signup" className="text-white px-4">Signup</Link>
                    <Link to="/sdgs" className="text-white px-4">SDGs</Link>
                    <Link to="/leaderboard" className="text-white px-4">Leaderboard</Link>
                    <Link to="/daily-challenge" className="text-white px-4">Daily Challenge</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;