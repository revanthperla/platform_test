import React , { useState } from 'react';
import '../css/Jobdescriptionview.css';
import AssesmentModal from './Assesmentmodal.js';
import { Navigate, useNavigate } from 'react-router-dom'; 

function JobDescriptionDetails() {

    let navigate = useNavigate();
    const handleBackClick = () => {
        // Navigate back to the assigned jobs page
        navigate('/assigned-jobs');
    };
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

    const keywords = [
        'Candidate name',
        'Position applied for',
        'Current location',
        'Current employer',
        'Total-experience',
        'Total CTC',
        'Expected CTC',
        'Notice period (also if there is an option to buy-out)',
        'Willingness to relocate with FAMILY – at the time of joining itself',
        'Assessment Comments by HRINPUTS',
        'Remarks'
    ];

    const [selectedKeywords, setSelectedKeywords] = useState([]);

    const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
    
    const handleKeywordChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedKeywords([...selectedKeywords, value]);
        } else {
            setSelectedKeywords(selectedKeywords.filter(keyword => keyword !== value));
        }
    };

    const handleUploadResume = () => {
        // Implement your logic to handle resume upload
        console.log('Upload resume button clicked');
        setShowModal(true);
    };

    const handleUploadAssesment = () => {
        // Implement your logic to handle resume upload
        console.log('Upload resume button clicked');
    };

    const handleReport = () => {
        // Implement your logic to handle resume upload
        console.log('Upload resume button clicked');
    };

    const handleClearCheckboxes = () => {
        setSelectedKeywords([]);
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setSelectedCheckboxes(prevState => ({
            ...prevState,
            [name]: checked
        }));
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
            <button onClick={handleBackClick}>Back to Assigned Jobs</button>
            <h2>Select fields to be used for generating report</h2>
            <div>
                {keywords.map(keyword => (
                    <div className="checkbox-wrapper" key={keyword}>
                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                id={keyword}
                                value={keyword}
                                checked={selectedKeywords.includes(keyword)}
                                onChange={handleKeywordChange}
                            />
                        </div>
                        <label htmlFor={keyword}>{keyword}</label>
                    </div>
                ))}
            </div>
            <button onClick={handleClearCheckboxes}>Clear Checkboxes</button>
            <button className="report" onClick={handleReport}>Generate Report</button>
            {/* {reportUrl && <a href={reportUrl} download>Download Report</a>} */}
        </div>
    );
}

export default JobDescriptionDetails;