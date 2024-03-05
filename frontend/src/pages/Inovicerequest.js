// JobAndCandidateSelection.js

import React, { useState } from 'react';

function JobAndCandidateSelection() {
    const dummyJobs = [
        { id: 1, titleDesignation: 'Job 1' },
        { id: 2, titleDesignation: 'Job 2' },
        { id: 3, titleDesignation: 'Job 3' },
    ];

    const dummyCandidates = [
        { id: 1, candidateName: 'Candidate A' },
        { id: 2, candidateName: 'Candidate B' },
        { id: 3, candidateName: 'Candidate C' },
    ];

    const [jobs, setJobs] = useState(dummyJobs);
    const [selectedJob, setSelectedJob] = useState(null);
    const [candidates, setCandidates] = useState([]);

    const handleJobSelection = (jobId) => {
        setSelectedJob(jobId);
        // For testing purposes, set candidates to dummy data
        setCandidates(dummyCandidates);
    };

    const handleSendInvoice = () => {
        if (selectedJob) {
            // Find the selected job from dummyJobs
            const job = jobs.find(job => job.id === selectedJob);
    
            // Find the selected candidate
            const selectedCandidate = candidates.find(candidate => candidate.selected);
    
            if (selectedCandidate) {
                // Simulate API call to backend for invoice generation
                fetch('your/invoice/generation/endpoint', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        jobId: selectedJob,
                        jobTitle: job.titleDesignation,
                        candidateId: selectedCandidate.id,
                        candidateName: selectedCandidate.candidateName,
                        accountManager: job.accountManager,
                    }),
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Invoice generation request sent successfully.');
                        // Reset selected job and candidates
                        setSelectedJob(null);
                        setCandidates([]);
                    } else {
                        console.error('Failed to send invoice generation request.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            } else {
                alert('Please select a candidate before sending for invoice generation.');
            }
        } else {
            alert('Please select a job before sending for invoice generation.');
        }
    };
    
    return (
        <div>
            <h2>Jobs</h2>
            <ul>
                {jobs.map((job) => (
                    <li key={job.id} onClick={() => handleJobSelection(job.id)}>
                        {job.titleDesignation}
                    </li>
                ))}
            </ul>
            {selectedJob && (
                <>
                    <h2>Candidates for Selected Job</h2>
                    <ul>
                        {candidates.map((candidate) => (
                            <li key={candidate.id}>
                                <input
                                    type="radio"
                                    id={candidate.id}
                                    name="candidate"
                                    checked={candidate.selected}
                                    onChange={() => {
                                        // For testing purposes, update selected candidate in state
                                        setCandidates(candidates.map(c => ({ ...c, selected: c.id === candidate.id })));
                                    }}
                                />
                                <label htmlFor={candidate.id}>{candidate.candidateName}</label>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleSendInvoice}>Send for Invoice Generation</button>
                </>
            )}
        </div>
    );
}

export default JobAndCandidateSelection;
