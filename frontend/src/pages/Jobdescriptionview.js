import React , { useState, useEffect } from 'react';
import '../css/Jobdescriptionview.css';
import AssesmentModal from './Assesmentmodal.js';
import { Navigate, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

function JobDescriptionDetails({job}) {

    
    const [showModal, setShowModal] = useState(false);

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
                <p><span className="static-text">Title/Designation:</span> {job.titleDesignation}</p>
                <p><span className="static-text">Client Name:</span> {job.clientName}</p>
                <p><span className="static-text">Account Manager:</span> {job.accountManager}</p>
                <p><span className="static-text">Assigned Recruiters:</span> {job.assignedRecruiters}</p>
                <p><span className="static-text">Start Date:</span> {job.startDate}</p>
                <p><span className="static-text">Closure Date:</span> {job.closureDate}</p>
                <p><span className="static-text">Job Type:</span> {job.jobType}</p>
                <p><span className="static-text">Job Status:</span> {job.jobStatus}</p>
                <p><span className="static-text">Work Experience:</span> {job.workExperience}</p>
                <p><span className="static-text">Industry Nature:</span> {job.industryNature}</p>
                <p><span className="static-text">Compensation:</span> {job.compensation}</p>
                <p><span className="static-text">Location:</span> {job.location}</p>
                <p><span className="static-text">Eligibility Criteria:</span> {job.eligibilityCriteria}</p>
                <p><span className="static-text">Primary Responsibilities:</span> {job.primaryResponsibilities}</p>
                <p><span className="static-text">Mandatory Skills:</span> {job.mandatorySkills}</p>
                <p><span className="static-text">Desirable Skills:</span> {job.desirableSkills}</p>
            </div>
            <button onClick={handleUploadResume}>Upload Resume</button>
            {/* Render the modal if showModal is true */}
            {showModal && <AssesmentModal onClose={handleCloseModal} />}
        </div>
    );
}

export default JobDescriptionDetails;