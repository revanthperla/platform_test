import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobDescriptionDetails from './Jobdescriptionview';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://43.204.201.158:8000/api/joblist/');
      const data = response.json();
      console.log(data);
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleViewDetails = (jobId) => {
    setSelectedJobId(jobId);
  };

  const handleCloseDetails = () => {
    setSelectedJobId(null);
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
        {jobs && jobs.map(job => (
        <tr key={job.id}>
            <td>{job.entityName}</td> {/* Assuming entityName is the client's name */}
            <td>
                <button onClick={() => handleViewDetails(job.id)}>View Details</button>
            </td>
        </tr>
    ))}
</tbody>
      </table>
      {selectedJobId && (
        <div>
          <JobDescriptionDetails jobId={selectedJobId} />
          <button onClick={handleCloseDetails}>Close</button>
        </div>
      )}
    </div>
  );
}

export default JobList;
