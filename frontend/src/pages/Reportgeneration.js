// JobAndCandidateList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Reportgeneration.css';


function JobAndCandidateList() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [showCandidates, setShowCandidates] = useState(false); // State variable for showing/hiding candidates
    const [selectedKeywords, setSelectedKeywords] = useState([]);
  
    useEffect(() => {
      fetchJobs();
    }, []);
  
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://43.204.201.158:8000/api/joblist/');
        const data = await response.json();
        console.log(data);
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
   
    const handleJobClick = (jobId) => {
      setSelectedJob(jobId);

      useEffect(() => {
        fetchCandidates();
      }, []);
    
      const fetchCandidates = async () => {
        try {
          const response = await fetch('http://43.204.201.158:8000/api/assessments/');
          const data = await response.json();
          console.log(data);
          // Filter candidates with is_active set to false and rejection_reason null
          const filteredCandidates = data.filter(candidate => !candidate.is_active && candidate.rejection_reason === '');
          setCandidates(filteredCandidates);
        } catch (error) {
          console.error('Error fetching Candidates:', error);
        }
      };
      setShowCandidates(true); // Show candidates when a job is clicked
    };
  
    // Function to handle close button click
    const handleCloseButtonClick = () => {
      setShowCandidates(false); // Hide candidates when close button is clicked
    };
  
    // Function to handle candidate selection
    const handleCandidateSelection = (candidateId) => {
      // Implement your logic to handle candidate selection
    };
  
    const keywords = [
      'Candidate name',
      'Position applied for',
      'Current location',
      'Current employer',
      'Total-experience',
      'Total CTC',
      'Expected CTC',
      'Notice period (also if there is an option to buy-out)',
      'Willingness to relocate with FAMILY – at the time of joining itself',
      'Assessment Comments by HRINPUTS',
      'Remarks'
    ];
  
    const handleKeywordChange = (e) => {
      const { value, checked } = e.target;
      if (checked) {
        setSelectedKeywords([...selectedKeywords, value]);
      } else {
        setSelectedKeywords(selectedKeywords.filter(keyword => keyword !== value));
      }
    };
  
    const handleClearCheckboxes = () => {
      setSelectedKeywords([]);
    };
  
    const handleReport = () => {
      // Implement your logic to handle report generation
    };
  
    return (
      <div className="container">
        <h2>Jobs</h2>
        {/* Display list of jobs */}
        <ul className="job-table">
          {jobs.map((job) => (
            <li key={job.id} onClick={() => handleJobClick(job.id)}>
              {job.title}
            </li>
          ))}
        </ul>
  
        {/* Display selected job's candidates */}
        {selectedJob && showCandidates && (
          <div className="candidate-list">
            <button className="close-button" onClick={handleCloseButtonClick}>Close</button> {/* Close button */}
            <h2>Candidates for Selected Job</h2>
            <ul>
              {candidates.map((candidate) => (
                <li key={candidate.id}>
                  <input
                    type="checkbox"
                    onChange={() => handleCandidateSelection(candidate.id)}
                  />
                  {candidate.name}
                </li>
              ))}
            </ul>
  
            {/* Select fields for generating report */}
            <h2>Select fields to be used for generating report</h2>
            <div>
              {keywords.map(keyword => (
                <div className="checkbox-wrapper" key={keyword}>
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      id={keyword}
                      value={keyword}
                      checked={selectedKeywords.includes(keyword)}
                      onChange={handleKeywordChange}
                    />
                  </div>
                  <label htmlFor={keyword}>{keyword}</label>
                </div>
              ))}
            </div>
            <button onClick={handleClearCheckboxes}>Clear Checkboxes</button>
            <button className="report" onClick={handleReport}>Generate Report</button>
          </div>
        )}
      </div>
    );
  }
  
  export default JobAndCandidateList;