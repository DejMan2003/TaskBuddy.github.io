import React from 'react';
import { Table } from 'react-bootstrap';

const AssignmentTable = ({ assignments }) => {
  return (
    <div>
      <h2>Assignment Table</h2>
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
              <td>{assignment.assignedTo}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AssignmentTable;
