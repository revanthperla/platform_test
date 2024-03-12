// UserList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Roleassign.css'; // Import the CSS file

const UserList = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Fetch users from Django backend
    axios.get('http://127.0.0.1:8000/userlist/')
      .then(response => {
        setFilteredUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
    
    // Fetch roles from Django backend
    axios.get('http://127.0.0.1:8000/roles/')
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        console.error('Error fetching roles:', error);
      });
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);
    // Filter users based on search value
    // This logic can be adjusted based on your backend API
    const filtered = filteredUsers.filter(user =>
      user.fullName.toLowerCase().includes(searchValue) ||
      user.phoneNumber.includes(searchValue)
    );
    setFilteredUsers(filtered);
  };

  const handleRoleChange = (userId, roleId) => {
    // Update user's role in the frontend
    const updatedUsers = filteredUsers.map(user =>
      user.id === userId ? { ...user, selectedRole: roleId } : user
    );
    setFilteredUsers(updatedUsers);

    // Update user's role in the backend
    axios.patch(`http://127.0.0.1:8000/userlist/${userId}/`, { role: roleId })
      .then(response => {
        console.log('Role updated successfully in the backend:', response.data);
      })
      .catch(error => {
        console.error('Error updating role in the backend:', error);
      });
  };

  return (
    <div>
      <h2>User List</h2>
      <input
        type="text"
        placeholder="Search by name or phone number"
        value={searchText}
        onChange={handleSearch}
        className='search'
      />
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Choose Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.fullName}</td>
              <td>{user.emailID}</td>
              <td>{user.phoneNumber}</td>
              <td>
                <select value={user.selectedRole} onChange={(e) => handleRoleChange(user.id, e.target.value)}>
                  <option value="">Choose Role</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.role}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
