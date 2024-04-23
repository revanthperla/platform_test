import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AssessmentForm from './Assessmentview';

function JobListWithAssessment() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCanId, setSelectedCanId] = useState(null);
  
  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await fetch('http://43.204.201.158:8000/api/assessments/');
      const data = await response.json();
      console.log(data);
      // Filter candidates with is_active set to false and rejection_reason null
      const filteredCandidates = data.filter(candidate => !candidate.is_active && candidate.rejection_reason === null);
      setCandidates(filteredCandidates);
    } catch (error) {
      console.error('Error fetching Candidates:', error);
    }
  };

  const handleViewDetails = (canId) => {
    setSelectedCanId(canId);
  };

  const handleCloseDetails = () => {
    setSelectedCanId(null);
  };

  return (
    <div>
      <h1>List of Candidates</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidate => (
            <tr key={candidate.id}>
              <td>{candidate.candidateName}</td> {/* Assuming entityName is the client's name */}
              <td>
                <button onClick={() => handleViewDetails(candidate.id)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCanId && (
        <div>
          <AssessmentForm candidate={candidates.find(candidate => candidate.id === selectedCanId)} />
          <button onClick={handleCloseDetails}>Close</button>
        </div>
      )}
    </div>
  );
}

export default JobListWithAssessment;
