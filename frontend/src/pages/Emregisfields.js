import React, { useState, useEffect } from 'react';
import axios from 'axios';

const fieldMappings = {
  fullName: 'Full Name',
  gender: 'Gender',
  aadhaarNumber: 'Aadhaar Number',
  dateofBirth: 'Date of Birth',
  maritalStatus: 'Marital Status',
  emergencyContactName: 'Emergency Contact Name',
  address: 'Address',
  phoneNumber: 'Phone Number',
  emailID: 'Email ID',
  emergencyContactNumber: 'Emergency Contact Number',
  jobTitle: 'Job Title',
  departmentName: 'Department Name',
  joiningDate: 'Joining Date',
  employmentType: 'Employment Type',
  education: 'Education',
  workExperience: 'Work Experience',
  relevantSkills: 'Relevant Skills',
  pfUAN: 'PF UAN',
  esiNO: 'ESI Number',
  documentAcknowledged: 'Document Acknowledged',
};

const hardcodedFields = Object.keys(fieldMappings);

function Emregisfields() {
  const [fieldSettings, setFieldSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch field settings from backend API
    axios.get('/api/field-settings')
      .then(response => {
        setFieldSettings(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching field settings:', error);
        setLoading(false);
      });
  }, []);

  const handleCheckboxChange = (fieldName) => {
    setFieldSettings(prevSettings => ({
      ...prevSettings,
      [fieldName]: !prevSettings[fieldName]
    }));
  };

  const handleSubmit = () => {
    // Send updated field settings to backend
    axios.post('http://43.204.201.158:8000/api/update-field-settings', fieldSettings)
      .then(response => {
        console.log('Field settings updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating field settings:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Employee Registration</h1>
      <form onSubmit={handleSubmit}>
        {hardcodedFields.map(fieldName => (
          <div key={fieldName}>
            <label>
              <input
                type="checkbox"
                checked={fieldSettings[fieldName]}
                onChange={() => handleCheckboxChange(fieldName)}
              />
              {fieldMappings[fieldName]}
            </label>
          </div>
        ))}
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
}

export default Emregisfields;
