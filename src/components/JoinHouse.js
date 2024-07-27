import React, { useState } from 'react';

const JoinHouse = ({ setHouse }) => {
  const [houseCode, setHouseCode] = useState('');

  const handleJoin = () => {
    // Handle house joining logic
    setHouse({ id: houseCode, name: 'Joined House' });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Join a House</h2>
        <input
          type="text"
          placeholder="House Code"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={houseCode}
          onChange={(e) => setHouseCode(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
          onClick={handleJoin}
        >
          Join House
        </button>
        <button
          className="mt-4 text-gray-600 underline"
          onClick={() => setHouse(null)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default JoinHouse;
