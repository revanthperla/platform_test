import React, { useState, useEffect} from 'react';
import axios from 'axios'; // Import Axios for making API requests
import '../css/Assessmentview.css'; // Update the path to your CSS file

function AssessmentForm({ jobId, candidateId }) {
    const [formData, setFormData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');

    // Fetch assessment data for the selected candidate
    useEffect(() => {
        axios.get(`http://43.204.201.158:8000/api/assessments/${candidateId}/`)
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                console.error('Error fetching assessment:', error);
            });
    }, [candidateId]);

    const handleApprove = () => {
        // Send a request to update the backend with the approval status
        axios.patch(`http://43.204.201.158:8000/api/assessments/${candidateId}/`, { is_active: true })
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
            axios.patch(`http://43.204.201.158:8000/api/assessments/${candidateId}/`, { is_active: false, rejection_reason: reason })
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
            {formData ? (
                <div>
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            {/* Render form fields for editing */}
                            <label>Candidate Name:</label>
                            <input type="text" name="candidateName" value={formData.candidateName} onChange={handleChange} />
                            <label>Position Applied for:</label>
                            <input type="text" name="position" value={formData.position} onChange={handleChange} />
                            <label>Current Location:</label>
                            <input type="text" name="location" value={formData.location} onChange={handleChange} />
                            {/* Add more form fields as needed */}
                            <button type="submit">Submit</button>
                        </form>
                    ) : (
                        <div>
                            {/* Render details */}
                            <p>Candidate Name: {formData.candidateName}</p>
                            <p>Position Applied for: {formData.position}</p>
                            <p>Current Location: {formData.location}</p>
                            {/* Add more detail fields as needed */}
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
            ) : (
                <p>Loading assessment data...</p>
            )}
        </div>
    );
}

export default AssessmentForm;
