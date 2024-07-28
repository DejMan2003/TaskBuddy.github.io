import React, { useState } from 'react';
import { Container, Button, Form, ListGroup, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Component for adding roommates
const AddRoommate = ({ addRoommate }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addRoommate(name);
    setName('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Roommate Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter roommate name"
        />
      </Form.Group>
      <Button type="submit" variant="primary" className="mt-2">
        Add Roommate
      </Button>
    </Form>
  );
};

// Component for adding tasks
const AddTask = ({ addTask }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Task</Form.Label>
        <Form.Control
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
        />
      </Form.Group>
      <Button type="submit" variant="primary" className="mt-2">
        Add Task
      </Button>
    </Form>
  );
};

// Main App component
function App() {
  const [roommates, setRoommates] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const addRoommate = (name) => {
    setRoommates([...roommates, name]);
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const assignTasks = () => {
    const newAssignments = tasks.map((task, index) => ({
      task,
      roommate: roommates[index % roommates.length],
    }));
    setAssignments(newAssignments);
  };

  return (
    <Container>
      <h1>Welcome to Task Buddy </h1>

      <h2>Add Roommate</h2>
      <AddRoommate addRoommate={addRoommate} />

      <h2>Roommates</h2>
      <ListGroup>
        {roommates.map((name, index) => (
          <ListGroup.Item key={index}>{name}</ListGroup.Item>
        ))}
      </ListGroup>

      <h2>Add Task</h2>
      <AddTask addTask={addTask} />

      <h2>Tasks</h2>
      <ListGroup>
        {tasks.map((task, index) => (
          <ListGroup.Item key={index}>{task}</ListGroup.Item>
        ))}
      </ListGroup>

      <Button onClick={assignTasks} variant="success" className="mt-4">
        Assign Tasks
      </Button>

      <h2>Assignments</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Task</th>
            <th>Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={index}>
              <td>{assignment.task}</td>
              <td>{assignment.roommate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default App;
