import React, { useState } from "react";
import axios from "axios";
import '../styles/Login.css'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

// this is the login page
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // handling the click of the login button
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/login", { 
        "username": username, 
        "password": password 
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      setMessage("Login successful!");
      setTimeout(() => navigate('/search'), 1500);
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" className="login-button">Login</button>
      </form>
      {message && <p>{message}</p>}

      <div className='dont-have-account'>
        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
      </div>
    </div>
  );
};

export default Login;
