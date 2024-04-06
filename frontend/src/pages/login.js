import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';
import axios from 'axios';

function Login() {
  const initalFormData={
    username: '',
    password: '',
  };
  const [formData, setFormData] = useState({...initalFormData});
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const responseData = await response.json(); // Parse JSON response
        if (responseData.Role) {
            // Login successful, navigate to appropriate dashboard
            switch (responseData.Role) {
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
                    console.error('Invalid role:', responseData.Role);
            }
        } else {
            console.error('Role not found in response');
        }
    } else {
        console.error('Login failed');
    }
}


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
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
