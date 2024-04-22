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

  // ... rest of the code for handleViewCandidateDetails, handleCloseDetails, and return section remains the same

}