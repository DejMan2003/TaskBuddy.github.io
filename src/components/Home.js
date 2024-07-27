import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';
import Login from './Login';
import CreateHouse from './CreateHouse';
import JoinHouse from './JoinHouse';

const Home = () => {
  const [user, setUser] = useState(null);
  const [house, setHouse] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (house) {
      // Fetch tasks from the server
      axios.get(`/api/tasks/${house.id}`)
        .then(response => {
          setTasks(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('There was an error fetching the tasks!', error);
          setLoading(false);
        });
    }
  }, [house]);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  if (!house) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
        <header className="w-full bg-blue-600 text-white py-4 shadow-md">
          <h1 className="text-3xl font-bold text-center">Roommate Task Manager</h1>
        </header>

        <main className="w-full max-w-4xl p-4">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Welcome, {user.name}!</h2>
            <div className="flex space-x-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => setHouse('create')}
              >
                Create a House
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                onClick={() => setHouse('join')}
              >
                Join a House
              </button>
            </div>
          </div>
        </main>

        <footer className="w-full bg-blue-600 text-white py-2 text-center mt-8">
          <p className="text-sm">© 2024 Roommate Task Manager. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  if (house === 'create') {
    return <CreateHouse setHouse={setHouse} />;
  }

  if (house === 'join') {
    return <JoinHouse setHouse={setHouse} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <header className="w-full bg-blue-600 text-white py-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">Roommate Task Manager</h1>
      </header>

      <main className="w-full max-w-4xl p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Your Tasks</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Add Task
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tasks.length > 0 ? (
              tasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <div className="text-center w-full col-span-2">
                <p className="text-gray-600">No tasks assigned yet. Please check back later.</p>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="w-full bg-blue-600 text-white py-2 text-center mt-8">
        <p className="text-sm">© 2024 Roommate Task Manager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
