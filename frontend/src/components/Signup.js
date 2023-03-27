import React, { useState } from "react";
import '../styles/Signup.css'

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://get-involved-on-campus-backend.onrender.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "username": username, "password": password })
      });
      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      setMessage("Signup successful!");
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
    </div>
  );
};

export default Signup;