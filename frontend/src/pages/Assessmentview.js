import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making API requests
import '../css/Assessmentview.css'; // Update the path to your CSS file

function AssessmentForm({ jobId, candidateId }) {
    const dummyAssessmentData = {
        1: {
            candidateName: 'John Doe',
            position: 'Software Engineer',
            location: 'New York',
            currentEmployer: 'ABC Company',
            totalExperience: '5 years',
            ctc: '100,000',
            ectc: '120,000',
            noticePeriod: '30 days',
            relocate: 'Yes',
            comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        2: {
            candidateName: 'Jane Smith',
            position: 'Data Analyst',
            location: 'San Francisco',
            currentEmployer: 'XYZ Corporation',
            totalExperience: '3 years',
            ctc: '90,000',
            ectc: '110,000',
            noticePeriod: '45 days',
            relocate: 'No',
            comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        // Add more dummy data as needed for other candidates
    };

    const initialFormData = dummyAssessmentData[candidateId];
    const [formData, setFormData] = useState(initialFormData);
    const [isEditing, setIsEditing] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');

    const handleApprove = () => {
        // Send a request to update the backend with the approval status
        axios.patch(`http://127.0.0.1:8000/api/assessments/${candidateId}/`, { is_active: true })
            .then(response => {
                console.log('Assessment approved:', response.data);
                // Optionally, you can update the UI to reflect the approval status
            })
            .catch(error => {
                console.error('Error approving assessment:', error);
            });
    };

    const handleReject = () => {
        // Prompt the user to enter a rejection reason
        const reason = prompt('Enter rejection reason:');
        if (reason) {
            // Send a request to update the backend with the rejection reason and status
            axios.patch(`/api/assessments/${candidateId}/`, { is_active: false, rejection_reason: reason })
                .then(response => {
                    console.log('Assessment rejected:', response.data);
                    // Optionally, you can update the UI to reflect the rejection status
                })
                .catch(error => {
                    console.error('Error rejecting assessment:', error);
                });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    return (
        <div className="assessment-form-container">
            <h2>Assessment Information</h2>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <label>Candidate Name:</label>
                    <input type="text" name="candidateName" value={formData.candidateName} onChange={handleChange} />
                    <label>Position Applied for:</label>
                    <input type="text" name="position" value={formData.position} onChange={handleChange} />
                    <label>Current Location:</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} />
                    <label>Current Employer:</label>
                    <input type="text" name="currentEmployer" value={formData.currentEmployer} onChange={handleChange} />
                    <label>Total Experience:</label>
                    <input type="text" name="totalExperience" value={formData.totalExperience} onChange={handleChange} />
                    <label>CTC:</label>
                    <input type="text" name="ctc" value={formData.ctc} onChange={handleChange} />
                    <label>Expected CTC:</label>
                    <input type="text" name="ectc" value={formData.ectc} onChange={handleChange} />
                    <label>Notice Period:</label>
                    <input type="text" name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} />
                    <label>Willingness to Relocate:</label>
                    <input type="text" name="relocate" value={formData.relocate} onChange={handleChange} />
                    <label>Assessment Comments:</label>
                    <input type="text" name="comments" value={formData.comments} onChange={handleChange} />
                    <label>Remarks:</label>
                    <input type="text" name="remarks" value={formData.remarks} onChange={handleChange} />
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <div>
                    <p>Candidate Name: {formData.candidateName}</p>
                    <p>Position Applied for: {formData.position}</p>
                    <p>Current Location: {formData.location}</p>
                    <p>Current Employer: {formData.currentEmployer}</p>
                    <p>Total Experience: {formData.totalExperience}</p>
                    <p>CTC: {formData.ctc}</p>
                    <p>Expected CTC: {formData.ectc}</p>
                    <p>Notice Period: {formData.noticePeriod}</p>
                    <p>Willingness to Relocate: {formData.relocate}</p>
                    <p>Assessment Comments: {formData.comments}</p>
                    <p>Remarks: {formData.remarks}</p>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleApprove}>Approve</button>
                    <button onClick={handleReject}>Reject</button>
                    {/* Text input for rejection reason */}
                    {rejectionReason && (
                        <div>
                            <label>Rejection Reason:</label>
                            <input type="text" value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AssessmentForm;
