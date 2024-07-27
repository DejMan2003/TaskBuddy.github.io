import React from 'react';

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h3>
      <p className="text-gray-600 mb-4">{task.description}</p>
      <p className="text-gray-600 mb-4"><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
      <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
        Mark as Complete
      </button>
    </div>
  );
};

export default TaskCard;
