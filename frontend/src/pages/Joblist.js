import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobDescriptionDetails from './Jobdescriptionview';

function JobList() {
    const [jobs] = useState([
        { id: 1, name: 'Job 1' },
        { id: 2, name: 'Job 2' },
        { id: 3, name: 'Job 3' },
        // Add more dummy clients as needed
      ]);
    
      const [selectedJobId, setSelectedJobId] = useState(null);
    
      const handleViewDetails = (JobId) => {
        setSelectedJobId(JobId);
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
              {jobs.map(Job => (
                <tr key={Job.id}>
                  <td>{Job.name}</td>
                  <td>
                    <button onClick={() => handleViewDetails(Job.id)}>View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
            {selectedJobId && (
            <div>
                <JobDescriptionDetails JobId={selectedJobId} />
                <button onClick={handleCloseDetails}>Close</button>
            </div>
      )}
    </div>
      );
    }    

export default JobList;
