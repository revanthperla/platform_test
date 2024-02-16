import React, { useState } from 'react';
import '../css/Employeeprofile.css';

function Profile() {
  const [isEditing, setIsEditing] = useState(false); // State to manage editing mode

  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    gender: 'Male',
    aadhaarNumber: '1234 5678 9012',
    dateOfBirth: '1990-01-01',
    maritalStatus: 'Single',
    emergencyContactName: 'Jane Doe',
    address: '123 Main St, City, Country',
    phoneNumber: '+1234567890',
    emailID: 'john.doe@example.com',
    emergencyContactNumber: '+9876543210',
    jobTitle: 'Software Engineer',
    departmentName: 'Engineering',
    joiningDate: '2020-01-01',
    employmentType: 'Full-time',
    education: [
      { degree: 'Bachelors in Computer Science', graduationYear: '2015', grade: 'A' }
    ],
    workExperience: [
      { companyName: 'ABC Inc.', designation: 'Software Developer', duration: '3 years' }
    ],
    relevantSkills: 'JavaScript, React, Node.js',
    pfUAN: '1234567890',
    esiNO: 'ESI1234567890',
  });

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
            <p><span className="static-text">Full Name:</span> {profileData.fullName}</p>
            <p><span className="static-text">Gender:</span> {profileData.gender}</p>
            <p><span className="static-text">Aadhaar Number:</span> {profileData.aadhaarNumber}</p>
            <p><span className="static-text">Date of Birth:</span> {profileData.dateOfBirth}</p>
            <p><span className="static-text">Marital Status:</span> {profileData.maritalStatus}</p>
            <p><span className="static-text">Emergency Contact Name:</span> {profileData.emergencyContactName}</p>
            <p><span className="static-text">Address:</span> {profileData.address}</p>
            <p><span className="static-text">Phone Number:</span> {profileData.phoneNumber}</p>
            <p><span className="static-text">Email ID:</span> {profileData.emailID}</p>
            <p><span className="static-text">Emergency Contact Number:</span> {profileData.emergencyContactNumber}</p>
            <p><span className="static-text">Job Title:</span> {profileData.jobTitle}</p>
            <p><span className="static-text">Department Name:</span> {profileData.departmentName}</p>
            <p><span className="static-text">Joining Date:</span> {profileData.joiningDate}</p>
            <p><span className="static-text">Employment Type:</span> {profileData.employmentType}</p>
            <h3>Education</h3>
            {profileData.education.map((educationItem, index) => (
              <div key={index}>
                <p>Degree: {educationItem.degree}</p>
                <p>Graduation Year: {educationItem.graduationYear}</p>
                <p>Grade: {educationItem.grade}</p>
              </div>
            ))}
            {/* Render work experience details in view mode */}
            <h3>Work Experience</h3>
            {profileData.workExperience.map((experience, index) => (
              <div key={index}>
                <p>Company Name: {experience.companyName}</p>
                <p>Designation: {experience.designation}</p>
                <p>Duration: {experience.duration}</p>
              </div>
            ))}
            <p><span className="static-text">Relevant Skills:</span> {profileData.relevantSkills}</p>
            <p><span className="static-text">PF UAN:</span> {profileData.pfUAN}</p>
            <p><span className="static-text">ESI NO:</span> {profileData.esiNO}</p>
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