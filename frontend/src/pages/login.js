import React, { useState } from 'react';
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
      const response = await axios.post('http://127.0.0.1:8000/api/login/', formData)
      .then(response => {
        console.log('Data sent successfully:', response.data);
        // Reset the form after successful submission
        setFormData({...initalFormData});
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
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
