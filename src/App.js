// src/App.js
import React, { useState } from "react";
import TaskList from "./component/tasklist";
import "./App.css"; // Import the new CSS file

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const addTask = () => {
    if (taskText.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: taskText,
    };
    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  const editTask = (task) => {
    setEditingTask(task);
    setTaskText(task.text);
  };

  const updateTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id ? { ...task, text: taskText } : task
      )
    );
    setEditingTask(null);
    setTaskText("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app">
      <h1>Task Buddy</h1>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button onClick={editingTask ? updateTask : addTask}>
        {editingTask ? "Update Task" : "Add Task"}
      </button>
      <TaskList tasks={tasks} onEdit={editTask} onDelete={deleteTask} />
    </div>
  );
};

export default App;
