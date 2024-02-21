import React, { useState, useEffect } from 'react';
import axios from 'axios';

const fieldMappings = {
  entityName: 'Entity Name',
  organizationStatus: 'Organization Status',
  estYear: 'Establishment Year',
  proprieterName: 'Proprietor Name',
  officeAddress: 'Office Address',
  branchAddress: 'Branch Address',
  companyPerson: 'Company Person',
  companyDesignation: 'Company Designation',
  compnayNumber: 'Company Number',
  companyFax: 'Company Fax',
  companyEmail: 'Company Email',
  industryNature: 'Industry Nature',
  companyCIN: 'Company CIN',
  companyPAN: 'Company PAN',
  companyGST: 'Company GST',
  bdpName: 'BDP Name',
  bdpmName: 'BDP Manager Name',
  accountManager: 'Account Manager',
  billingCity: 'Billing City',
  billingCountry: 'Billing Country',
};

const hardcodedFields = Object.keys(fieldMappings);

function Clregisfields() {
  const [fieldSettings, setFieldSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch field settings from backend API
    axios.get('/api/client-registration-field-settings')
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
    axios.post('/api/update-client-registration-field-settings', fieldSettings)
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
      <h1>Client Registration Page</h1>
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

export default Clregisfields;
