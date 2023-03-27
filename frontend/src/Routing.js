import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from './App';
import Signup from './components/Signup';
import Login from './components/Login';

const Routing = () => (
  <Routes>
    <Route exact path="/" component={<App />} />
    <Route exact path="/signup" component={<Signup />} />
    <Route exact path="/login" component={<Login />} />
  </Routes>
);

export default Routing;
