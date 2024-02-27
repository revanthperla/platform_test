import React from 'react';

function CandidateDetails({ jobId, candidateId }) {
    // Fetch candidate details based on jobId and candidateId from the backend or use dummy data
    const dummyCandidates = {
        1: [
            { id: 1, candidateName: 'John Doe', position: 'Software Engineer', location: 'New York' },
            { id: 2, candidateName: 'Jane Smith', position: 'Web Developer', location: 'Los Angeles' }
        ],
        2: [
            { id: 3, candidateName: 'Michael Johnson', position: 'Data Scientist', location: 'Chicago' },
            { id: 4, candidateName: 'Emily Davis', position: 'UI/UX Designer', location: 'San Francisco' }
        ]
    };
    const selectedCandidate = dummyCandidates[jobId].find(candidate => candidate.id === candidateId);

    return (
        <div>
            <h2>Candidate Details</h2>
            {selectedCandidate && (
                <div>
                    <p>Candidate Name: {selectedCandidate.candidateName}</p>
                    <p>Position Applied for: {selectedCandidate.position}</p>
                    <p>Current Location: {selectedCandidate.location}</p>
                    {/* Additional candidate details */}
                </div>
            )}
        </div>
    );
}

export default CandidateDetails;
