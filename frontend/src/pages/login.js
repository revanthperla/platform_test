import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate;
  const handleSubmit = async (event) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password
      });
      console.log(response);
      if (response.data.message) {
        // Login successful, navigate to appropriate dashboard
        switch (response.data.role) {
          case 'Business Development Partner':
            navigate('/bdpdashboard');
            break;
          case 'Recruiter':
            navigate('/employeedashboard');
            break;
          case 'Manager':
            navigate('/managerdashboard');
            break;
          case 'Business Development Partner Manager':
            navigate('/bdpmdashboard');
            break;
          case 'Account Manager':
            navigate('/amanagerdashboard');
            break;
          default:
            console.error('Invalid role:', response.data.role);
        }
      } else {
        // Login failed, display error message
        console.error('Login failed:', response.data.error);
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error, e.g., display error message to user
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button onClick={handleSubmit}>Login</button>
      <div className="register-link">
        <span>Don't have an account? </span>
        <Link to="/employeeregistration">Register</Link> 
      </div>
    </div>
  );
}

export default Login;
