import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const MultiplayerLobby = () => {
    const [rooms, setRooms] = useState([]);
    const [newRoomName, setNewRoomName] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Initialize socket connection
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);

        // Listen for room updates
        newSocket.on('roomList', (updatedRooms) => {
            setRooms(updatedRooms);
        });

        // Clean up on unmount
        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleCreateRoom = () => {
        if (newRoomName.trim() && socket) {
            socket.emit('createRoom', { name: newRoomName.trim() });
            setNewRoomName('');
        }
    };

    const handleJoinRoom = (roomId) => {
        if (socket) {
            socket.emit('joinRoom', { roomId });
            // In a real implementation, we would navigate to the game room
            console.log(`Joining room ${roomId}`);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Multiplayer Lobby</h1>
            
            <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Create New Room</h2>
                <div className="flex">
                    <input
                        type="text"
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                        placeholder="Enter room name"
                        className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none"
                    />
                    <button
                        onClick={handleCreateRoom}
                        className="bg-blue-500 text-white px-6 py-2 rounded-r-lg hover:bg-blue-600 transition"
                    >
                        Create
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <h2 className="text-xl font-bold p-6 border-b">Available Rooms</h2>
                {rooms.length > 0 ? (
                    <ul>
                        {rooms.map(room => (
                            <li key={room.id} className="p-4 border-b flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium">{room.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {room.players.length} player{room.players.length !== 1 ? 's' : ''}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleJoinRoom(room.id)}
                                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
                                >
                                    Join
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="p-6 text-gray-500">No rooms available. Create one to start playing!</p>
                )}
            </div>
        </div>
    );
};

export default MultiplayerLobby;