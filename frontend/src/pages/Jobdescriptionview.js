import React , { useState, useEffect } from 'react';
import '../css/Jobdescriptionview.css';
import AssesmentModal from './Assesmentmodal.js';
import { Navigate, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

function JobDescriptionDetails() {

    
    const [showModal, setShowModal] = useState(false);
    // Dummy job description data
    const dummyJobDescription = {
        titleDesignation: 'Software Engineer',
        clientName: 'Acme Corporation',
        accountManager: 'John Doe',
        assignedRecruiters: 'Jane Smith',
        startDate: '2024-02-07',
        closureDate: '2024-03-07',
        jobType: 'Full Time',
        jobStatus: 'In progress',
        workExperience: '3-5 Years',
        industryNature: 'IT Services',
        compensation: '100000',
        location: 'New York, NY',
        eligibilityCriteria: 'Bachelor\'s degree in Computer Science or related field',
        primaryResponsibilities: 'Develop and maintain software applications',
        mandatorySkills: 'JavaScript, React, Node.js',
        desirableSkills: 'Python, MongoDB',
    };

    const handleUploadAssesment = () => {
        // Implement your logic to handle resume upload
        console.log('Upload resume button clicked');
    };

    const handleUploadResume = () => {  
    };

    const handleCloseModal = () => {
        // Close the modal
        setShowModal(false);
    };

    return (
        <div className="container">
            <h1>Job Description Details</h1>
            <div className="job-details">
                <p><span className="static-text">Title/Designation:</span> {dummyJobDescription.titleDesignation}</p>
                <p><span className="static-text">Client Name:</span> {dummyJobDescription.clientName}</p>
                <p><span className="static-text">Account Manager:</span> {dummyJobDescription.accountManager}</p>
                <p><span className="static-text">Assigned Recruiters:</span> {dummyJobDescription.assignedRecruiters}</p>
                <p><span className="static-text">Start Date:</span> {dummyJobDescription.startDate}</p>
                <p><span className="static-text">Closure Date:</span> {dummyJobDescription.closureDate}</p>
                <p><span className="static-text">Job Type:</span> {dummyJobDescription.jobType}</p>
                <p><span className="static-text">Job Status:</span> {dummyJobDescription.jobStatus}</p>
                <p><span className="static-text">Work Experience:</span> {dummyJobDescription.workExperience}</p>
                <p><span className="static-text">Industry Nature:</span> {dummyJobDescription.industryNature}</p>
                <p><span className="static-text">Compensation:</span> {dummyJobDescription.compensation}</p>
                <p><span className="static-text">Location:</span> {dummyJobDescription.location}</p>
                <p><span className="static-text">Eligibility Criteria:</span> {dummyJobDescription.eligibilityCriteria}</p>
                <p><span className="static-text">Primary Responsibilities:</span> {dummyJobDescription.primaryResponsibilities}</p>
                <p><span className="static-text">Mandatory Skills:</span> {dummyJobDescription.mandatorySkills}</p>
                <p><span className="static-text">Desirable Skills:</span> {dummyJobDescription.desirableSkills}</p>
            </div>
            <button onClick={handleUploadResume}>Upload Resume</button>
            {/* Render the modal if showModal is true */}
            {showModal && <AssesmentModal onClose={handleCloseModal} />}
        </div>
    );
}

export default JobDescriptionDetails;