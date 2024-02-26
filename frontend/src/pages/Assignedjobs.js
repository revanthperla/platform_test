import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'; 
import JobDescriptionDetails from './Jobdescriptionview'; // Import the page to display job details

function AssignedJobs() {
    // Dummy data for clients and jobs
    const dummyJobs = [
        { id: 1, clientId: 1, clientName: 'Client 1', title: 'Job 1', description: 'Description of Job 1' },
        { id: 2, clientId: 1, clientName: 'Client 1', title: 'Job 2', description: 'Description of Job 2' },
        // Add more dummy job data as needed
    ];

    const [selectedJob, setSelectedJob] = useState(null);
    let navigate = useNavigate(); // Get history object for navigation

    const handleJobClick = (job) => {
      // Construct the URL for the job description page
      const jobDescriptionUrl = `/job-description/${job.id}`;
      // Open the job description page in a new tab
      window.open(jobDescriptionUrl, '_blank');
  };

    return (
        <div>
            <h2>Assigned Jobs</h2>
            <table>
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Client Name</th>
                    </tr>
                </thead>
                <tbody>
                    {dummyJobs.map(job => (
                        <tr key={job.id} onClick={() => handleJobClick(job)}>
                            <td>{job.title}</td>
                            <td>{job.clientName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedJob && <JobDescriptionDetails jobId={selectedJob.id} />} {/* Render job description page */}
        </div>
    );
}

export default AssignedJobs;
