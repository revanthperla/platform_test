import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for consistency
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
      const response = await axios.get('http://43.204.201.158:8000/api/joblist/'); // Assuming this fetches job data
      const data = response.data;
      console.log(data);
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleViewDetails = async (jobId) => {
    setSelectedJobId(jobId);
    setSelectedCandidateId(null);

    try {
      const response = await axios.get(`http://43.204.201.158:8000/api/job_descriptions/${jobId}/assessments/`); // Use axios for consistency
      const candidateData = response.data;
      console.log(candidateData);

      // Update jobs state with fetched candidates for the selected job
      setJobs(jobs.map((job) => (job.id === jobId ? { ...job, assessments: candidateData } : job)));
    } catch (error) {
      console.error('Error fetching assessments:', error);
    }
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
                <td>{job.titleDesignation}</td>
                <td>
                  <button onClick={() => handleViewDetails(job.id)}>View Details</button>
                </td>
              </tr>
              {selectedJobId === job.id && (
                <tr>
                  <td colSpan="2">
                    {/* Display list of candidates from the assessments of the selected job */}
                    <ul>
                      {job.assessments && job.assessments.map((candidate) => (
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
