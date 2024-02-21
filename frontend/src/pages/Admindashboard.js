import React, { useState } from 'react';
import UserList from './Roleassign';
import '../css/Bdpdashboard.css';
import Emregisfields from './Emregisfields';
import Clregisfields from './Clregisfields';

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('Profile');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="employee-dashboard-container"> 
        <div className="navbar">
            <ul>
            <li className={activeTab === 'Users' ? 'active' : ''} onClick={() => handleTabChange('Users')}>Users</li>
            <li className={activeTab === 'Employee' ? 'active' : ''} onClick={() => handleTabChange('Employee')}>Employee</li>
            <li className={activeTab === 'Client' ? 'active' : ''} onClick={() => handleTabChange('Client')}>Client</li>
            </ul>
        </div>
        <div className="employee-content"> {/* Apply CSS class */}
            {/* Render content based on activeTab */}
            {activeTab === 'Users' && <UserList />}
            {activeTab === 'Employee' && <Emregisfields />}
            {activeTab === 'Client' && <Clregisfields />}
        </div>
        </div>
    );
}
  
  export default AdminDashboard;