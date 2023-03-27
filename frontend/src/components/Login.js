import React, { useState } from "react";
import axios from "axios";
import '../styles/Login.css'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://get-involved-on-campus-backend.onrender.com/api/login", { 
        "username": username, 
        "password": password 
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      setMessage("Login successful!");
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
    </div>
  );
};

export default Login;
