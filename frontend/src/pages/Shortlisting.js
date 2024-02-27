import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AssessmentForm from './Assessmentview'; // Assuming you have the AssessmentForm component
import '../css/Shortlisting.css';

function JobListWithAssessment() {
    const [jobs] = useState([
        { id: 1, name: 'Job 1' },
        { id: 2, name: 'Job 2' },
        { id: 3, name: 'Job 3' },
        // Add more dummy jobs as needed
    ]);

    const [selectedJobId, setSelectedJobId] = useState(null);
    const [selectedCandidateId, setSelectedCandidateId] = useState(null);

    const handleViewDetails = (jobId) => {
        setSelectedJobId(jobId);
        setSelectedCandidateId(null); // Reset selected candidate when viewing job details
    };

    const handleViewCandidateDetails = (candidateId) => {
        setSelectedCandidateId(candidateId);
    };

    const handleCloseDetails = () => {
        setSelectedJobId(null);
        setSelectedCandidateId(null);
    };

    return (
        <div>
            <h1>List of Jobs</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job) => (
                        <React.Fragment key={job.id}>
                            <tr>
                                <td>{job.name}</td>
                                <td>
                                    <button onClick={() => handleViewDetails(job.id)}>View Details</button>
                                </td>
                            </tr>
                            {selectedJobId === job.id && (
                                <tr>
                                    <td colSpan="2">
                                        {/* Assuming you have a list of candidates for each job */}
                                        <ul>
                                            <li>
                                                Candidate 1
                                                <button onClick={() => handleViewCandidateDetails(1)}>View Resume</button>
                                                <button onClick={() => handleViewCandidateDetails(1)}>View Assessment</button>
                                            </li>
                                            <li>
                                                Candidate 2
                                                <button onClick={() => handleViewCandidateDetails(2)}>View Resume</button>
                                                <button onClick={() => handleViewCandidateDetails(2)}>View Assessment</button>
                                            </li>
                                            {/* Add more candidates as needed */}
                                        </ul>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            {selectedCandidateId && (
                <div>
                    {/* Render AssessmentForm for the selected candidate */}
                    <AssessmentForm jobId={selectedJobId} candidateId={selectedCandidateId} />
                    <button onClick={handleCloseDetails}>Close</button>
                </div>
            )}
        </div>
    );
}

export default JobListWithAssessment;
