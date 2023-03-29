import React, { useState } from "react";
import '../styles/Signup.css'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "username": username, "password": password })
      });
      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      console.log(data)
      if (data.message === 'User already exists'){
        setMessage("Username has been taken, try again :)");
      }
      else{
        setMessage("Signup successful! Taking you to the login page...");
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.message);
    }
  };
  

  return (
    <div className="signup-container">
      <h1>SIGN UP</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" className="signup-button">Sign up</button>
      </form>
      {message && <p>{message}</p>}

      <div className='already-have-account'>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;