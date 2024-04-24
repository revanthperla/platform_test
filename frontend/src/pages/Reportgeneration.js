// JobAndCandidateList.js
import React, { useState, useEffect } from 'react';
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
   
    useEffect(() => {
      fetchCandidates();
    }, []);
  
    const fetchCandidates = async (jobId) => {
      try {
        const response = await fetch(`http://43.204.201.158:8000/api/assessments/${jobId}/`);
        const data = await response.json();
        console.log(data);
        setCandidates(data);
      } catch (error) {
        console.error('Error fetching Candidates:', error);
      }
    };
    
    const HandleJobClick = (jobId) => {
      setSelectedJob(jobId);
      fetchCandidates(jobId);
      setShowCandidates(true);
    };
  
    // Function to handle close button click
    const handleCloseButtonClick = () => {
      setShowCandidates(false); // Hide candidates when close button is clicked
    };
  
    const keywords = {
      'Position applied for': 'position',
      'Current location': 'location',
      'Current employer': 'currentEmployer',
      'Total-experience': 'totalExperience',
      'Total CTC': 'ctc',
      'Expected CTC': 'ectc',
      'Notice period': 'noticePeriod',
      'Willingness to relocate': 'relocate',
      'Assessment Comments by HRINPUTS': 'comments',
      'Remarks': 'remarks'
    };

    // Function to map selected keywords to their corresponding field names in the database
    const mapKeywordsToFields = () => {
      return selectedKeywords.map(keyword => keywords[keyword]);
    };
  
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
  
    const handleReport = async () => {
      try {
        if (!selectedJob) {
          console.error('No job selected.');
          return;
        }
    
        const requestData = {
          jobId: selectedJob,
          keywords: mapKeywordsToFields()
        };
    
        const response = await fetch('http://43.204.201.158:8000/api/report/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        });

        const responseData = await response.json(); // Parsing response JSON data
        console.log('Response:', responseData); 
    
        if (response.ok) {
          console.log('Data sent successfully!');
          // Optionally, you can handle success response here
        } else {
          console.error('Failed to send data:', response.statusText);
          // Optionally, you can handle error response here
        }
      } catch (error) {
        console.error('Error sending data:', error);
        // Handle any network or other errors here
      }
    };
  
    return (
      <div className="container">
        <h2>Jobs</h2>
        {/* Display list of jobs */}
        <ul className="job-table">
          {jobs.map((job) => (
            <li key={job.id} onClick={() => HandleJobClick(job.id)}>
              {job.titleDesignation}
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
                {candidate.candidateName}
              </li>
            ))}
          </ul>
          {/* Select fields for generating report */}
          <h2>Select fields to be used for generating report</h2>
          <div>
          {Object.keys(keywords).map(keyword => (
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