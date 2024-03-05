import React, { useState } from 'react';

function GenerateInvoice() {
    const [requests, setRequests] = useState([
        { id: 1, jobTitle: 'Software Engineer', candidateName: 'John Doe', details: 'Invoice needed urgently.' },
        { id: 2, jobTitle: 'Data Analyst', candidateName: 'Jane Smith', details: 'Please generate invoice for this candidate.' },
        { id: 3, jobTitle: 'Project Manager', candidateName: 'Alice Johnson', details: 'Invoice required for this candidate.' },
    ]);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const handleRequestClick = (requestId) => {
        // Find the selected request
        const request = requests.find(request => request.id === requestId);
        setSelectedRequest(request);
    };

    return (
        <div className="invoice-requests">
            <h2>Invoice Generation Requests</h2>
            <ul>
                {requests.map(request => (
                    <li key={request.id} onClick={() => handleRequestClick(request.id)}>
                        {request.jobTitle} - {request.candidateName}
                    </li>
                ))}
            </ul>
            {selectedRequest && (
                <div className="request-details">
                    <h3>Details</h3>
                    <p><strong>Job Title:</strong> {selectedRequest.jobTitle}</p>
                    <p><strong>Candidate Name:</strong> {selectedRequest.candidateName}</p>
                    <p><strong>Details:</strong> {selectedRequest.details}</p>
                    {/* Add more details as needed */}
                </div>
            )}
        </div>
    );
}

export default GenerateInvoice;
