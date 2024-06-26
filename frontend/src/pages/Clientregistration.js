import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Clientregistration.css';

function ClientRegistration() {
  const [userData, setUserData] = useState({
    entityName: '',
    organizationStatus: '',
    estYear: '',
    proprieterName : '',
    officeAddress : '',
    branchAddress : '',
    companyPerson : '',
    companyDesignation : '',
    compnayNumber : '',
    companyFax : '',
    companyEmail : '',
    industryNature : '',
    companyCIN : '',
    companyPAN : '',
    companyGST : '',
    bdpName : '',
    bdpmName : '',
    accountManager : '',
    billingCity : '',
    billingCountry : '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const statusOptions = [
    'Proprietorship',
    'Private Limited',
    'Public Limited',
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

  const [bdpOptions, setbdpOptions] = useState([]);
      useEffect(() => {
        fetchbdp();
    }, []);

    const fetchbdp = async () => {
        try {
            const response = await fetch('http://43.204.201.158:8000/api/bdp'); // Update the API endpoint
            const data = await response.json();
            setbdpOptions(data.bdp); // Assuming the response contains a 'recruiters' key with the list of recruiter users
        } catch (error) {
            console.error('Error fetching bdp:', error);
        }
    };

    const [bdpmOptions, setbdpmOptions] = useState([]);
      useEffect(() => {
        fetchbdpm();
    }, []);

    const fetchbdpm = async () => {
        try {
            const response = await fetch('http://43.204.201.158:8000/api/bdpm'); // Update the API endpoint
            const data = await response.json();
            setbdpmOptions(data.bdpm); // Assuming the response contains a 'recruiters' key with the list of recruiter users
        } catch (error) {
            console.error('Error fetching bdpm:', error);
        }
    };  

    const [AmOptions, setAmOptions] = useState([]);
      useEffect(() => {
        fetchAm();
    }, []);

    const fetchAm = async () => {
        try {
            const response = await fetch('http://43.204.201.158:8000/api/amanager'); // Update the API endpoint
            const data = await response.json();
            setAmOptions(data.accountManagers); // Assuming the response contains a 'recruiters' key with the list of recruiter users
        } catch (error) {
            console.error('Error fetching Account Managers:', error);
        }
    };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://43.204.201.158:8000/clientregistration/', userData);
      
      console.log('Form submitted successfully:', response.data);
      // You can add any additional logic here after the form is successfully submitted
      window.alert('Submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle any errors here
    }

    // Reset the form after submission
    setUserData({
      entityName: '',
      organizationStatus: '',
      estYear: '',
      proprieterName: '',
      officeAddress: '',
      branchAddress: '',
      companyPerson: '',
      companyDesignation: '',
      companyNumber: '',
      companyFax: '',
      companyEmail: '',
      industryNature: '',
      companyCIN: '',
      companyPAN: '',
      companyGST: '',
      bdpName: '',
      bdpmName: '',
      accountManager: '',
      billingCity: '',
      billingCountry: '',
    });
  };

  return (
    <div>
      <h1>Client Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name of the Entity:
          <input
            type="text"
            name="entityName"
            value={userData.entityName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Status of Organization (Proprietorship/Pvt./Public Ltd.):
          <select
            name="organizationStatus"
            value={userData.organizationStatus}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            {statusOptions.map((organizationStatus) => (
              <option key={organizationStatus} value={organizationStatus}>
                {organizationStatus}
              </option>
            ))}
            <option value="other">Other</option>
          </select>
        </label>
        {userData.organizationStatus === 'other' && (
          <input
            type="text"
            name="organizationStatus"
            value={userData.organizationStatus}
            onChange={handleInputChange}
          />
        )}
        <br />
        <label>
          Year of Establishment:
          <input
            type="tel"
            name="estYear"
            value={userData.estYear}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Name of Proprietor/Director/MD:
          <input
            type="text"
            name="proprieterName"
            value={userData.proprieterName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Registered Office Address:
          <input
            type="text"
            name="officeAddress"
            value={userData.officeAddress}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Address of the branch:
          <input
            type="text"
            name="branchAddress"
            value={userData.branchAddress}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Contact Person:
          <input
            type="text"
            name="companyPerson"
            value={userData.companyPerson}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Designation:
          <input
            type="text"
            name="companyDesignation"
            value={userData.companyDesignation}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="text"
            name="companyNumber"
            value={userData.companyNumber}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Fax Number:
          <input
            type="number"
            name="companyFax"
            value={userData.companyFax}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email ID:
          <input
            type="email"
            name="companyEmail"
            value={userData.companyEmail}
            onChange={handleInputChange}
          />
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
          Certification of Incorporation Number:
          <input
            type="text"
            name="companyCIN"
            value={userData.companyCIN}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Pan Number:
          <input
            type="text"
            name="companyPAN"
            value={userData.companyPAN}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          GST Number:
          <input
            type="text"
            name="companyGST"
            value={userData.companyGST}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Business Development Partner Name
          <select
              name="bdpName"
              value={userData.bdpName}
              onChange={handleInputChange}
              >
                <option value="">Select</option>
                {bdpOptions.map((bdpName) => (
                  <option key={bdpName.id} value={bdpName.fullName}>
                    {bdpName.fullName}
                  </option>
                  ))}
              </select>
        </label>
        <br />
        <label>
          Business Development Partner Manager Name:
          <select
              name="bdpmName"
              value={userData.bdpmName}
              onChange={handleInputChange}
              >
                <option value="">Select</option>
                {bdpmOptions.map((bdpmName) => (
                  <option key={bdpmName.id} value={bdpmName.fullName}>
                    {bdpmName.fullName}
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
          Billing City:
          <input
            type="text"
            name="billingCity"
            value={userData.billingCity}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Billing Country:
          <input
            type="text"
            name="billingCountry"
            value={userData.billingCountry}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit" class="btn btn-default btn-sm">Submit</button>
      </form>
    </div>
  );
}

export default ClientRegistration;