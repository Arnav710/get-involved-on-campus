import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import SearchBar from './components/SearchBar';
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    const isAuthenticated = localStorage.getItem('accessToken') !== null;
    setAuthenticated(isAuthenticated);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {authenticated ? (
            <Route path="/search" element={<SearchBar />} />
          ) : (
            <Route path="/login" element={<Login />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
