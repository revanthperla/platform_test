import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Document, Page } from 'react-pdf';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/Employeeregistration.css'
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';

function EmployeeRegistration() {
  const [userData, setUserData] = useState({
    fullName: '',
    gender: '',
    aadhaarNumber: '',
    dateofBirth: null,
    maritalStatus: '',
    emergencyContactName: '',
    address: '',
    phoneNumber: '',
    emailID: '',
    emergencyContactNumber: '',
    jobTitle: '',
    departmentName: '',
    joiningDate: '',
    employmentType: '',
    education: [],
    workExperience: [],
    relevantSkills: '',
    pfUAN:'',
    esiNO:'',
    documentAcknowledged: false,
    role: '',
  });

  const navigate = useNavigate();

  const [roleOptions, setRoleOptions] = useState([]);

  useEffect(() => {
    // Fetch role options from backend when component mounts
    axios.get('http://127.0.0.1:8000/roles/')
    .then(response => {
      // Check if response data is an array
      if (Array.isArray(response.data)) {
        setRoleOptions(response.data);
        console.log(response.data);
      } else {
        console.error('Invalid response data:', response.data);
      }
    })
    .catch(error => {
      console.error('Error fetching roles:', error);
    });
}, []);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAddEducation = () => {
    setUserData({
      ...userData,
      education: [...userData.education, { degree: '', graduationYear: '', grade: '' }],
    });
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = [...userData.education];
    updatedEducation.splice(index, 1);
    setUserData({ ...userData, education: updatedEducation });
  };

  const handleEducationChange = (index, event) => {
    const { name, value } = event.target;
    const updatedEducation = [...userData.education];
    updatedEducation[index][name] = value;
    setUserData({ ...userData, education: updatedEducation });
  };
  
  const handleAddWorkExperience = () => {
    setUserData({
      ...userData,
      workExperience: [...userData.workExperience, { companyName: '', designation: '', duration: '' }],
    });
  };

  const handleRemoveWorkExperience = (index) => {
    const updatedWorkExperience = [...userData.workExperience];
    updatedWorkExperience.splice(index, 1);
    setUserData({ ...userData, workExperience: updatedWorkExperience });
  };

  const handleWorkExperienceChange = (index, event) => {
    const { name, value } = event.target;
    const updatedWorkExperience = [...userData.workExperience];
    updatedWorkExperience[index][name] = value;
    setUserData({ ...userData, workExperience: updatedWorkExperience });
  };

  const handleDocumentAcknowledgement = () => {
    setUserData({ ...userData, documentAcknowledged: true });
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const genderOptions = [
    'Male',
    'Female',
  ];

  const maritalOptions = [
    'Married',
    'Single',
  ];

  const jobTypeOptions = [
    'Full Time',
    'Part Time',
    'Contract',
  ];
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Make an HTTP POST request using Axios
    axios.post('http://127.0.0.1:8000/submit_user_data/', userData)
      .then(response => {
        console.log('Data sent successfully:', response.data);
        // Reset the form after successful submission
        setUserData({ ...userData, /* reset fields */ });
        navigate('/usernameregistration');
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
  };

  return (
    <div>
      <h1>Employee Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <h2>Personal Information</h2>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={userData.fullName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Gender:
          <select
            name="gender"
            value={userData.gender}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            {genderOptions.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Date of Birth:
          <DatePicker
            selected={userData.dateofBirth}
            onChange={(date) => setUserData({ ...userData, dateofBirth: date })}
            dateFormat="MMMM d, yyyy"
            scrollableYearDropdown
            showMonthDropdown
            showYearDropdown
            yearDropdownItemNumber={60}
          />
        </label>
        <br />
        <label>
          Marital Status:
          <select
            name="maritalStatus"
            value={userData.maritalStatus}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            {maritalOptions.map((maritalStatus) => (
              <option key={maritalStatus} value={maritalStatus}>
                {maritalStatus}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Emergency Contact Name:
          <input
            type="text"
            name="emergencyContactName"
            value={userData.emergencyContactName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <h2>Contact Inofrmation </h2>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="number"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email ID:
          <input
            type="email"
            name="emailID"
            value={userData.companyDesignation}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Emergency Contact Number:
          <input
            type="number"
            name="emergencyContactNumber"
            value={userData.emergencyContactNumber}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <h2>Employment Details</h2>
        <label>
          Job Title:
          <input
            type="text"
            name="jobTitle"
            value={userData.jobTitle}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Department/Team:
          <input
            type="text"
            name="departmentName"
            value={userData.departmentName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Date of Joining:
          <DatePicker
            selected={userData.joiningDate}
            onChange={(date) => setUserData({ ...userData, joiningDate: date })}
            dateFormat="MMMM d, yyyy"
            scrollableYearDropdown
            showMonthDropdown
            showYearDropdown
            yearDropdownItemNumber={60}
          />
        </label>
        <br />
        <label>
          Employment Type:
          <select
            name="employmentType"
            value={userData.employmentType}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            {jobTypeOptions.map((employmentType) => (
              <option key={employmentType} value={employmentType}>
                {employmentType}
              </option>
            ))}
          </select>
        </label>
        <br />
        <h2>Educational Background</h2>
        <div>
        {userData.education.map((educationItem, index) => (
            <div key={index}>
              <label>
                Degree:
                <input
                  type="text"
                  name="degree"
                  value={educationItem.degree}
                  onChange={(event) => handleEducationChange(index, event)}
                />
              </label>
              <label>
                Graduation Year:
                <input
                  type="text"
                  name="graduationYear"
                  value={educationItem.graduationYear}
                  onChange={(event) => handleEducationChange(index, event)}
                />
              </label>
              <label>
                Grade:
                <input
                  type="text"
                  name="grade"
                  value={educationItem.grade}
                  onChange={(event) => handleEducationChange(index, event)}
                />
              </label>
              <button type="button" onClick={() => handleRemoveEducation(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddEducation}>Add Education</button>
        </div>
        <br />
        <h2>Work Experience</h2>
        <div>
        {userData.workExperience.map((experience, index) => (
            <div key={index}>
              <label>
                Company Name:
                <input
                  type="text"
                  name="companyName"
                  value={experience.companyName}
                  onChange={(event) => handleWorkExperienceChange(index, event)}
                />
              </label>
              <label>
                Designation:
                <input
                  type="text"
                  name="designation"
                  value={experience.designation}
                  onChange={(event) => handleWorkExperienceChange(index, event)}
                />
              </label>
              <label>
                Duration:
                <input
                  type="text"
                  name="duration"
                  value={experience.duration}
                  onChange={(event) => handleWorkExperienceChange(index, event)}
                />
              </label>
              <button type="button" onClick={() => handleRemoveWorkExperience(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddWorkExperience}>Add Work Experience</button>
        </div>
        <br />
        <label>
          Relevant Skills and Qualifications:
          <input
            type="text"
            name="relevantSkills"
            value={userData.relevantSkills}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <h2>Social Security Numbers</h2>
        <label>
          PF UAN number:
          <input
            type="number"
            name="pfUAN"
            value={userData.pfUAN}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          ESI Number:
          <input
            type="number"
            name="esiNO"
            value={userData.esiNO}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <h2>Role</h2>
        <label>
          Select Role:
          <select
            name="role"
            value={userData.role}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            {roleOptions.map(role => (
              <option key={role.id} value={role.role}>
                {role.role}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit" class="btn btn-default btn-sm">Submit</button>
      </form>
    </div>
  );
}

export default EmployeeRegistration;
