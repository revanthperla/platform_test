import React, { useState } from 'react';
import Profile from './Employeeprofile';
import ClientRegistration from './Clientregistration';
import ClientDetails from './Clientview';
import ClientApproval from './Clientapproval';
import { Link } from 'react-router-dom';
import profileImage from '../images/user.png';
import '../css/Bdpdashboard.css';
import ClientList from './Clientlist';

function BdpmDashboard() {
    const [activeTab, setActiveTab] = useState('Profile');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="employee-dashboard-container"> 
        <div className="navbar">
            <ul>
            <li className={activeTab === 'Clients' ? 'active' : ''} onClick={() => handleTabChange('Clients')}>Clients</li>
            <li className={activeTab === 'Client Approval' ? 'active' : ''} onClick={() => handleTabChange('Client Approval')}>Client Approval</li>
            <li className={activeTab === 'Profile' ? 'active' : ''} onClick={() => handleTabChange('Profile')}>
                <Link to="/profile">
                    <img src={profileImage} className='image' alt="Profile" style={{ width: '30px', height: '30px', position: 'relative' }} />
                </Link>
            </li>
            </ul>
        </div>
        <div className="employee-content"> {/* Apply CSS class */}
            {/* Render content based on activeTab */}
            {activeTab === 'Profile' && <Profile />}
            {activeTab === 'Clients' && <ClientList />}
            {activeTab === 'Client Approval' && <ClientApproval />}
        </div>
        </div>
    );
}
  
  export default BdpmDashboard;