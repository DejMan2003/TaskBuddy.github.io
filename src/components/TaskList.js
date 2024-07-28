import React, { useState } from 'react';
import { ListGroup, Button, Form } from 'react-bootstrap';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    setTasks([...tasks, newTask]);
    setNewTask('');
  };

  return (
    <div>
      <h2>Task List</h2>
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
          />
        </Form.Group>
        <Button onClick={addTask} variant="primary" className="mt-2">
          Add Task
        </Button>
      </Form>
      <ListGroup className="mt-3">
        {tasks.map((task, index) => (
          <ListGroup.Item key={index}>{task}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default TaskList;
