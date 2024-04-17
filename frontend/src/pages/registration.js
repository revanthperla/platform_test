
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [latestUserData, setUserData] = useState(null);

  useEffect(() => {
    const fetchLatestObject = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/latest-object/');
        console.log(response)
        setUserData(response.data.user_data);
        console.log(response.data.user_data)
      } catch (error) {
        console.error('Error fetching latest object:', error);
      }
    };

    fetchLatestObject();
  }, []);

  
  const handleRegister = () => {
    console.log(username, password)
    axios.post('http://127.0.0.1:8000/api/register/', {
      'username': username,
      'password': password,
      'user_data': latestUserData
      })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
    navigate('/');
  };

  return (
    <div>
      <h2>Registration</h2>
      <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegistrationPage;