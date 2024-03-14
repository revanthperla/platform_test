import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate;
  const user = {
    username: 'exampleUser',
    password: 'examplePassword',
    role: 'admin' // Mock user role
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here (e.g., authentication with backend)
    console.log('Username:', username);
    console.log('Password:', password);

    switch (user.role) {
      case 'Business Development Partner':
        navigate('/bdpdashboard'); // Redirect to the admin page
        break;
      case 'Recruiter':
        navigate('/employeedashboard'); // Redirect to the employee page
        break;
      case 'Manager':
        navigate('/managerdashboard'); // Redirect to the manager page
        break;
      case 'Business Development Partner Manager':
        navigate('/bdpmdashboard'); // Redirect to the manager page
        break;
      case 'Account Manager':
        navigate('/amanagerdashboard'); // Redirect to the manager page
        break;
      default:
        console.error('Invalid role:', user.role);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <div className="register-link">
        <span>Don't have an account? </span>
        <Link to="/employeeregistration">Register</Link> 
      </div>
    </div>
  );
}

export default Login;
