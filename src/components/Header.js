import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <h1 className="text-3xl font-bold mx-8">TaskMate</h1>
      <ul className='flex gap-5 mx-8'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/admin">Admin Panel</Link></li>
      </ul>
    </header>
  );
}

export default Header;