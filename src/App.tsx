import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import Users from './components/Users';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';

function App() {
  return (
    <div className="app">
      <Link to="/">Home</Link>
      <Link role='users-list-navigator' to="/users">Users</Link>

      <Routes>
        <Route path="/" element={ <Users /> } />
        <Route path="/users" element={ <UserList /> } />
        <Route path="/users/:id" element={ <UserDetail /> } />
      </Routes>
    </div>
  );
}

export default App;
