import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

const AdminDashboard = () => {
  //manages list of roommates
  const [roommates, setRoommates] = useState([]);
  //manages input for roommates
  const [newRoommate, setNewRoommate] = useState('');

  //adds roommate onto list
  const addRoommate = () => {
    //clears input fierld afterwards
    setRoommates([...roommates, newRoommate]);
    setNewRoommate('');
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            value={newRoommate}
            onChange={(e) => setNewRoommate(e.target.value)}
            placeholder="Enter roommate name"
          />
        </Form.Group>
        <Button onClick={addRoommate} variant="primary" className="mt-2">
          Add Roommate
        </Button>
      </Form>
      <ListGroup className="mt-3">
        {roommates.map((roommate, index) => (
          <ListGroup.Item key={index}>{roommate}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default AdminDashboard;
