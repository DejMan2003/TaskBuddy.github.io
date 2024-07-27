import React, { useState } from 'react';

const CreateHouse = ({ setHouse }) => {
  const [houseName, setHouseName] = useState('');
  const [numPeople, setNumPeople] = useState(0);
  const [people, setPeople] = useState([]);

  const handleCreate = () => {
    // Handle house creation logic
    const houseData = {
      name: houseName,
      members: people
    };
    
    // Mock API request to create house and send invites
    console.log('Creating house with data:', houseData);
    setHouse({ id: 'new-house-id', name: houseName });
  };

  const handlePeopleChange = (index, field, value) => {
    const updatedPeople = [...people];
    updatedPeople[index] = {
      ...updatedPeople[index],
      [field]: value
    };
    setPeople(updatedPeople);
  };

  const handleNumPeopleChange = (value) => {
    const numberOfPeople = parseInt(value, 10);
    setNumPeople(numberOfPeople);
    const updatedPeople = Array.from({ length: numberOfPeople }, (_, i) => ({
      name: people[i]?.name || '',
      email: people[i]?.email || ''
    }));
    setPeople(updatedPeople);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create a House</h2>
        <input
          type="text"
          placeholder="House Name"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={houseName}
          onChange={(e) => setHouseName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Number of People"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={numPeople}
          onChange={(e) => handleNumPeopleChange(e.target.value)}
        />

        {Array.from({ length: numPeople }).map((_, index) => (
          <div key={index} className="mb-4 flex flex-row gap-3">
            <input
              type="text"
              placeholder={`Name of person ${index + 1}`}
              className="w-full mb-2 p-2 border border-gray-300 rounded"
              value={people[index]?.name || ''}
              onChange={(e) => handlePeopleChange(index, 'name', e.target.value)}
            />
            <input
              type="email"
              placeholder={`Email of person ${index + 1}`}
              className="w-full mb-2 p-2 border border-gray-300 rounded"
              value={people[index]?.email || ''}
              onChange={(e) => handlePeopleChange(index, 'email', e.target.value)}
            />
          </div>
        ))}

        <button
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
          onClick={handleCreate}
        >
          Create House
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

export default CreateHouse;
