import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SDGZones from './pages/SDGZones';
import QuizPage from './pages/QuizPage';
import MultiplayerLobby from './pages/MultiplayerLobby';
import Leaderboard from './pages/Leaderboard';
import DailyChallenge from './pages/DailyChallenge';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/sdgs" element={<SDGZones />} />
            <Route path="/quiz/:sdgNumber" element={<QuizPage />} />
            <Route path="/multiplayer" element={<MultiplayerLobby />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/daily-challenge" element={<DailyChallenge />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;