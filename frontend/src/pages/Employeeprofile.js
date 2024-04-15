import React, { useState, useEffect } from 'react';
import '../css/Employeeprofile.css';
import axios from 'axios';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/get_user_details/', {
      method: 'GET',
      credentials: 'include', // Include credentials (cookies) with the request
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      setProfileData(data);
    })
    .catch(error => {
      console.error('Error fetching user details:', error);
    });
  }, []);
  
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const saveChanges = () => {
    // Save changes logic, e.g., send data to backend
    setIsEditing(false); // Disable editing mode after saving changes
  };

  const handleNestedInputChange = (event) => {
    const { name, value } = event.target;
    const [nestedFieldName, index, nestedField] = name.match(/(\w+)\[(\d+)\]\.(\w+)/).slice(1);
    
    const updatedProfileData = { ...profileData };
    updatedProfileData[nestedFieldName][index][nestedField] = value;
    
    setProfileData(updatedProfileData);
  };
  
  const handleAddEducation = () => {
    setProfileData({
      ...profileData,
      education: [...profileData.education, { degree: '', graduationYear: '', grade: '' }],
    });
  };
  
  const handleAddWorkExperience = () => {
    setProfileData({
      ...profileData,
      workExperience: [...profileData.workExperience, { companyName: '', designation: '', duration: '' }],
    });
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = [...profileData.education];
    updatedEducation.splice(index, 1);
    setProfileData({ ...profileData, education: updatedEducation });
  };
  
  const handleRemoveWorkExperience = (index) => {
    const updatedWorkExperience = [...profileData.workExperience];
    updatedWorkExperience.splice(index, 1);
    setProfileData({ ...profileData, workExperience: updatedWorkExperience });
  };

  return (
    <div>
      <h2>Profile</h2>
      <div>
        {isEditing ? (
          // Render input fields in editing mode
          <>
            <label>Full Name: <input type="text" name="fullName" value={profileData.fullName} onChange={handleInputChange} /></label><br />
            <label>Gender: <input type="text" name="gender" value={profileData.gender} onChange={handleInputChange} /></label><br />
            <label>Aadhaar Number: <input type="text" name="aadhaarNumber" value={profileData.aadhaarNumber} onChange={handleInputChange} /></label><br />
            <label>Date of Birth: <input type="text" name="dateOfBirth" value={profileData.dateOfBirth} onChange={handleInputChange} /></label><br />
            <label>Marital Status: <input type="text" name="maritalStatus" value={profileData.maritalStatus} onChange={handleInputChange} /></label><br />
            <label>Emergency Contact Name: <input type="text" name="emergencyContactName" value={profileData.emergencyContactName} onChange={handleInputChange} /></label><br />
            <label>Address: <input type="text" name="address" value={profileData.address} onChange={handleInputChange} /></label><br />
            <label>Phone Number: <input type="text" name="phoneNumber" value={profileData.phoneNumber} onChange={handleInputChange} /></label><br />
            <label>Email ID: <input type="text" name="emailID" value={profileData.emailID} onChange={handleInputChange} /></label><br />
            <label>Emergency Contact Number: <input type="text" name="emergencyContactNumber" value={profileData.emergencyContactNumber} onChange={handleInputChange} /></label><br />
            <label>Job Title: <input type="text" name="jobTitle" value={profileData.jobTitle} onChange={handleInputChange} /></label><br />
            <label>Department Name: <input type="text" name="departmentName" value={profileData.departmentName} onChange={handleInputChange} /></label><br />
            <label>Joining Date: <input type="text" name="joiningDate" value={profileData.joiningDate} onChange={handleInputChange} /></label><br />
            <label>Employment Type: <input type="text" name="employmentType" value={profileData.employmentType} onChange={handleInputChange} /></label><br />
            <h3>Education</h3>
            {profileData.education.map((educationItem, index) => (
              <div key={index}>
                <label>Degree: <input type="text" name={`education[${index}].degree`} value={educationItem.degree} onChange={handleNestedInputChange} /></label><br />
                <label>Graduation Year: <input type="text" name={`education[${index}].graduationYear`} value={educationItem.graduationYear} onChange={handleNestedInputChange} /></label><br />
                <label>Grade: <input type="text" name={`education[${index}].grade`} value={educationItem.grade} onChange={handleNestedInputChange} /></label><br />
                <button onClick={() => handleRemoveEducation(index)}>Remove</button><br />
              </div>
            ))}
            <button onClick={handleAddEducation}>Add Education</button><br />
            <h3>Work Experience</h3>
            {profileData.workExperience.map((experience, index) => (
              <div key={index}>
                <label>Company Name: <input type="text" name={`workExperience[${index}].companyName`} value={experience.companyName} onChange={handleNestedInputChange} /></label><br />
                <label>Designation: <input type="text" name={`workExperience[${index}].designation`} value={experience.designation} onChange={handleNestedInputChange} /></label><br />
                <label>Duration: <input type="text" name={`workExperience[${index}].duration`} value={experience.duration} onChange={handleNestedInputChange} /></label><br />
                <button onClick={() => handleRemoveWorkExperience(index)}>Remove</button><br />
              </div>
            ))}
            <button onClick={handleAddWorkExperience}>Add Work Experience</button><br />
            <label>Relevant Skills: <input type="text" name="relevantSkills" value={profileData.relevantSkills} onChange={handleInputChange} /></label><br />
            <label>PF UAN: <input type="text" name="pfUAN" value={profileData.pfUAN} onChange={handleInputChange} /></label><br />
            <label>ESI NO: <input type="text" name="esiNO" value={profileData.esiNO} onChange={handleInputChange} /></label><br />
            {/* Add more input fields for other details */}
          </>
        ) : (
          // Render profile details in view mode
          <>
            <p><span className="static-text">Full Name:</span></p>
            <p><span className="static-text">Gender:</span></p>
            <p><span className="static-text">Aadhaar Number:</span></p>
            <p><span className="static-text">Date of Birth:</span></p>
            <p><span className="static-text">Marital Status:</span></p>
            <p><span className="static-text">Emergency Contact Name:</span></p>
            <p><span className="static-text">Address:</span></p>
            <p><span className="static-text">Phone Number:</span></p>
            <p><span className="static-text">Email ID:</span></p>
            <p><span className="static-text">Emergency Contact Number:</span></p>
            <p><span className="static-text">Job Title:</span></p>
            <p><span className="static-text">Department Name:</span> </p>
            <p><span className="static-text">Joining Date:</span> </p>
            <p><span className="static-text">Employment Type:</span> </p>
            <h3>Education</h3>
            
            <h3>Work Experience</h3>
            
            <p><span className="static-text">Relevant Skills:</span></p>
            <p><span className="static-text">PF UAN:</span></p>
            <p><span className="static-text">ESI NO:</span></p>
            {/* Add more profile details */}
          </>
        )}
        <button onClick={toggleEditing}>{isEditing ? 'Cancel' : 'Edit'}</button>
        {isEditing && <button onClick={saveChanges}>Save</button>}
      </div>
    </div>
  );
}

export default Profile;