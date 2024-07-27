// src/components/TaskList.js
import React from "react";
import Task from "./task";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <Task key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;
