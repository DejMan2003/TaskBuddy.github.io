// src/components/Task.js
import React from "react";

const Task = ({ task, onEdit, onDelete }) => {
  return (
    <div className="task">
      <p>{task.text}</p>
      <div className="task-buttons">
        <button className="edit-button" onClick={() => onEdit(task)}></button>
        <button
          className="delete-button"
          onClick={() => onDelete(task.id)}
        ></button>
      </div>
    </div>
  );
};

export default Task;
