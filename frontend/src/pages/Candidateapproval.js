import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AssessmentForm from './Assessmentview'; // Assuming you have the AssessmentForm component
import '../css/Candidateapproval.css';

function JobListWithAssessment() {
    const [jobs, setJobs] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [selectedCandidateId, setSelectedCandidateId] = useState(null);

    useEffect(() => {
        fetchJobs();
      }, []);
    
      const fetchJobs = async () => {
        try {
            const response = await fetch('http://43.204.201.158:8000/api/clientlist/');
            const data = await response.json();
            console.log(data);
            setJobs(data); // Set clients to the entire array
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    }

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
                                        {/* Display list of candidates from the assessments of the selected job */}
                                        <ul>
                                            {job.assessments.map(candidate => (
                                                <li key={candidate.id}>
                                                    {candidate.candidateName}
                                                    <button onClick={() => handleViewCandidateDetails(candidate.id)}>View Resume</button>
                                                    <button onClick={() => handleViewCandidateDetails(candidate.id)}>View Assessment</button>
                                                </li>
                                            ))}
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
