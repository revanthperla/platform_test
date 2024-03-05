import React, { useState, useEffect } from 'react';
import '../css/JobDescriptionform.css';

function JobDescription() {
    const [userData, setUserData] = useState({
        titleDesignation: '',
        clientName: '',
        accountManager: '',
        assignedRecruiters : '',
        startDate : '',
        closureDate : '',
        jobType : '',
        jobStatus : '',
        workExperience : '',
        industryNature : '',
        compensation: '',
        location : '',
        eligibilityCriteria : '',
        primaryResponsibilities : '',
        mandatorySkills : '',
        desirableSkills : '',
    });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUserData({ ...userData, [name]: value });
    };
  
    const jobTypeOptions = [
      'Full Time',
      'Part Time',
      'Offroll',
    ];

    const workExperienceOptions = [
        '0-1 Years',
        '1-3 Years',
        '3-5 Years',
        '5-8 Years',
        '8+ Years',
      ];

      const [clientOptions, setClientOptions] = useState([]);

      // Fetch clients from Django backend
      useEffect(() => {
          fetchClients();
      }, []);
  
      const fetchClients = async () => {
          try {
              const response = await fetch('/api/clients');
              const data = await response.json();
              setClientOptions(data.clients);
          } catch (error) {
              console.error('Error fetching clients:', error);
          }
      };

    const [recruiterOptions, setRecruiterOptions] = useState([]);
      useEffect(() => {
        fetchRecruiters();
    }, []);

    const fetchRecruiters = async () => {
        try {
            const response = await fetch('/api/recruiters'); // Update the API endpoint
            const data = await response.json();
            setRecruiterOptions(data.recruiters); // Assuming the response contains a 'recruiters' key with the list of recruiter users
        } catch (error) {
            console.error('Error fetching recruiters:', error);
        }
    };

    const [AmOptions, setAmOptions] = useState([]);
      useEffect(() => {
        fetchAm();
    }, []);

    const fetchAm = async () => {
        try {
            const response = await fetch('/api/am'); // Update the API endpoint
            const data = await response.json();
            setRecruiterOptions(data.accountManager); // Assuming the response contains a 'recruiters' key with the list of recruiter users
        } catch (error) {
            console.error('Error fetching Account Managers:', error);
        }
    };


    const jobStatusOptions = [
        'In progress',
        'On hold',
        'Filled',
        'Cancelled',
        'Declined',
        'Inactive',
    ];
  
    const industryOptions = [
      'Communcations',
      'Consulting',
      'Education',
      'Financial services',
      'Healthcare',
      'IT Services',
      'Manufacturing',
      'Pharma',
      'Real estate',
      'Technology',
      'Data Center',
      'Semiconductor',
      'Insurance',
    ];
    
    const handleSubmit = (event) => {
      event.preventDefault();
      // Here you can implement storing the userData, e.g., sending it to a backend server
      console.log('User Data:', userData);
      // Reset the form after submission
      setUserData({
        titleDesignation: '',
        clientName: '',
        accountManager: '',
        assignedRecruiters : '',
        startDate : '',
        closureDate : '',
        jobType : '',
        jobStatus : '',
        workExperience : '',
        industryNature : '',
        compensation: '',
        location : '',
        eligibilityCriteria : '',
        primaryResponsibilities : '',
        mandatorySkills : '',
        desirableSkills : '',
      });
    };
  
    return (
      <div>
        <h1>Job Description Form</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Position Title/Designation:
            <input
              type="text"
              name="titleDesignation"
              value={userData.titleDesignation}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Client Name:
            <select
              name="clientName"
              value={userData.clientName}
              onChange={handleInputChange}
              >
                <option value="">Select</option>
                {clientOptions.map((client) => (
                  <option key={client.id} value={client.entityName}>
                    {client.entityName}
                  </option>
                  ))}
              </select>
          </label>
          <br />
          <label>
            Account Manager:
            <select
              name="accountManager"
              value={userData.accountManager}
              onChange={handleInputChange}
              >
                <option value="">Select</option>
                {AmOptions.map((accountManager) => (
                  <option key={accountManager.id} value={accountManager.fullName}>
                    {accountManager.fullName}
                  </option>
                  ))}
              </select>
          </label>
          <br />
          <label>
            Assigned Recruiter:
            <select
              name="assignedRecruiters"
              value={userData.assignedRecruiters}
              onChange={handleInputChange}
              >
                <option value="">Select</option>
                {recruiterOptions.map((recruiter) => (
                  <option key={recruiter.id} value={recruiter.fullName}>
                    {recruiter.fullName}
                  </option>
                  ))}
              </select>
          </label>
          <br />
          <label>
            Start Date:
            <input
              type="text"
              name="startDate"
              value={userData.startDate}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Expected Date of closure:
            <input
              type="text"
              name="closureDate"
              value={userData.closureDate}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Job Type:
            <select
              type="text"
              name="jobType"
              value={userData.jobType}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              {jobTypeOptions.map((jobType) => (
                <option key={jobType} value={jobType}>
                  {jobType}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Job Opening Status:
            <select
              type="text"
              name="jobStatus"
              value={userData.jobStatus}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              {jobStatusOptions.map((jobStatus) => (
                <option key={jobStatus} value={jobStatus}>
                  {jobStatus}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Work Experience:
            <select
              type="number"
              name="workExperience"
              value={userData.workExperience}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              {workExperienceOptions.map((workExperience) => (
                <option key={workExperience} value={workExperience}>
                  {workExperience}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Nature of Industry
            <select
              name="industryNature"
              value={userData.industryNature}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              {industryOptions.map((industryNature) => (
                <option key={industryNature} value={industryNature}>
                  {industryNature}
                </option>
              ))}
              <option value="other">Other</option>
            </select>
          </label>
          {userData.industryNature === 'other' && (
            <input
              type="text"
              name="industryNature"
              value={userData.industryNature}
              onChange={handleInputChange}
            />
          )}
          <br />
          <label>
            Compensation:
            <input
              type="number"
              name="compensation"
              value={userData.compensation}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={userData.location}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Eligibility Criteria:
            <input
              type="text"
              name="eligibilityCriteria"
              value={userData.eligibilityCriteria}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Primary Responsibilities:
            <input
              type="text"
              strng="strng"
              name="primaryyResponsibilities"
              value={userData.companyGST}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Mandatory Skills:
            <input
              type="text"
              strng="strng"
              name="mandatorySkills"
              value={userData.mandatorySkills}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Desirable Skills:
            <input
              type="text"
              strng="strng"
              name="desirableSkills"
              value={userData.desirableSkills}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit" class="btn btn-default btn-sm">Submit</button>
        </form>
      </div>
    );
  }
  
  export default JobDescription;