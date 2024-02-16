import React, { useState } from 'react';
import Profile from './Employeeprofile';
import AssignedJobs from './Assignedjobs';
import InterviewScheduling from './Interviewscheduling';
import '../css/Employeedashboard.css'; // Import CSS file
import { Link } from 'react-router-dom';
import profileImage from '../images/user.png';

function Dashboard() {
    const [activeTab, setActiveTab] = useState('Profile');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="employee-dashboard-container"> 
        <div className="navbar">
            <ul>
            <li className={activeTab === 'Assigned Jobs' ? 'active' : ''} onClick={() => handleTabChange('Assigned Jobs')}>Assigned Jobs</li>
            <li className={activeTab === 'Interview Scheduling' ? 'active' : ''} onClick={() => handleTabChange('Interview Scheduling')}>Interview Scheduling</li>
            <li className={activeTab === 'Profile' ? 'active' : ''} onClick={() => handleTabChange('Profile')}>
                <Link to="/profile">
                    <img src={profileImage}  className='image' alt="Profile" style={{ width: '30px', height: '30px', position: 'relative' }} />
                </Link>
            </li>
            </ul>
        </div>
        <div className="employee-content"> {/* Apply CSS class */}
            {/* Render content based on activeTab */}
            {activeTab === 'Profile' && <Profile />}
            {activeTab === 'Assigned Jobs' && <AssignedJobs />}
            {activeTab === 'Interview Scheduling' && <InterviewScheduling />}
        </div>
        </div>
    );
}
  
  export default Dashboard;