import React, { useState, useEffect } from 'react';

function GenerateInvoice() {
    const [clients, setClients] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await fetch('http://43.204.201.158:8000/api/clientlist/');
            const data = await response.json();
            setClients(data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    const fetchJobs = async (clientId) => {
        try {
            const response = await fetch(`http://43.204.201.158:8000/api/clientlist/${clientId}/jobs/`);
            const data = await response.json();
            setJobs(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const fetchCandidates = async (jobId) => {
        try {
            const response = await fetch(`http://43.204.201.158:8000/api/assessments/${jobId}/`);
            const data = await response.json();
            setCandidates(data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    };

    const handleClientClick = async (clientId) => {
        setSelectedClient(clientId);
        setSelectedJob(null);
        await fetchJobs(clientId);
    };

    const handleJobClick = async (jobId) => {
        setSelectedJob(jobId);
        await fetchCandidates(jobId);
    };

    return (
        <div>
            <h2>Clients</h2>
            <ul>
                {clients.map(client => (
                    <li key={client.id} onClick={() => handleClientClick(client.id)}>
                        {client.entityName}
                    </li>
                ))}
            </ul>
            {selectedClient && (
                <>
                    <h2>Jobs</h2>
                    <ul>
                        {jobs.map(job => (
                            <li key={job.id} onClick={() => handleJobClick(job.id)}>
                                {job.titleDesignation}
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {selectedJob && (
                <>
                    <h2>Candidates</h2>
                    <ul>
                        {candidates.map(candidate => (
                            <li key={candidate.id}>
                                {candidate.candidateName}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default GenerateInvoice;
