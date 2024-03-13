
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    axios.post('/api/register/', { username, password, email })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
    navigate('/');
  };

  return (
    <div>
      <h2>Registration</h2>
      <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegistrationPage;