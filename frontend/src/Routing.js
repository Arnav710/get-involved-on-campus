import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from './App';
import Signup from './components/Signup';
import Login from './components/Login';
import SearchBar from './components/SearchBar';

const Routing = () => (
  <Routes>
    <Route exact path="/" element={<App />} />
    <Route exact path="/signup" element={<Signup />} />
    <Route exact path="/login" element={<Login />} />
    <Route exact path="/search" element={<SearchBar />} />
  </Routes>
);


export default Routing;
