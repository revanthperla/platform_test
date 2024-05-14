import React, { useState } from 'react';
import Profile from './Employeeprofile';
import { Link } from 'react-router-dom';
import profileImage from '../images/user.png';
import ClientList from './Clientlist';
import '../css/Bdpdashboard.css'
import JobDescription from './Jobdescriptionform';
import JobListWithAssessment from './Candidateapproval';
import JobAndCandidateList from './Reportgeneration';
import GenerateInvoice from './Generateinvoice';

function ManagerDashboard() {
    const [activeTab, setActiveTab] = useState('Profile');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="employee-dashboard-container"> 
        <div className="navbar">
            <ul>
            <li className={activeTab === 'Clients' ? 'active' : ''} onClick={() => handleTabChange('Clients')}>Clients</li>
            <li className={activeTab === 'Job Descriptions' ? 'active' : ''} onClick={() => handleTabChange('Job Description')}>Job Description</li>
            <li className={activeTab === 'Candidate Approval' ? 'active' : ''} onClick={() => handleTabChange('Candidate Approval')}>Candidate Approval</li>
            <li className={activeTab === 'Report generation' ? 'active' : ''} onClick={() => handleTabChange('Report Generation')}>Report Generation</li>
            <li className={activeTab === 'Invoice Request' ? 'active' : ''} onClick={() => handleTabChange('Invoice Request')}>Invoice Request</li>
            <li className={activeTab === 'Profile' ? 'active' : ''} onClick={() => handleTabChange('Profile')}>
                <Link to="/profile">
                    <img src={profileImage} className='image' alt="Profile" style={{ width: '30px', height: '30px', position: 'relative' }} />
                </Link>
            </li>
            </ul>
        </div>
        <div className="employee-content"> {/* Apply CSS class */}
            {/* Render content based on activeTab */}
            {activeTab === 'Clients' && <ClientList />}
            {activeTab === 'Job Description' && <JobDescription />}
            {activeTab === 'Candidate Approval' && <JobListWithAssessment />}
            {activeTab === 'Profile' && <Profile />}
            {activeTab === 'Report Generation' && <JobAndCandidateList />}
            {activeTab === 'Invoice Request' && <GenerateInvoice />}
        </div>
        </div>
    );
}
  
  export default ManagerDashboard;