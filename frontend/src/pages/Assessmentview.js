import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making API requests
import '../css/Assessmentview.css'; // Update the path to your CSS file

function AssessmentForm({ candidate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [candidate, setCandidate] = useState(candidate);

    const handleApprove = async () => {
        try {
            const response = await fetch(`http://43.204.201.158:8000/api/update_assessment_status/${candidate.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                window.alert('Approved Candidate');
                console.log('Field updated successfully');
            } else {
                // Handle error
                console.error('Error updating field');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleReject = () => {
        const reason = prompt('Enter rejection reason:');
        if (reason) {
            const updateData = { is_active: false, rejection_reason: reason };
            axios.patch(`http://43.204.201.158:8000/api/assessments/${candidate.id}/`, updateData)
                .then(response => {
                    console.log('Assessment rejected:', response.data);
                })
                .catch(error => {
                    console.error('Error rejecting assessment:', error);
                });
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://43.204.201.158:8000/api/update_assessment/${candidate.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(candidate),
            });
            if (response.ok) {
                // Handle success
                console.log('Field updated successfully');
            } else {
                // Handle error
                console.error('Error updating field');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Create a new candidate object with updated value
        const updatedCandidate = { ...candidate, [name]: value };
        // Update the state with the new candidate object
        setCandidate(updatedCandidate);
    };

    return (
        <div className="assessment-form-container">
            <h2>Assessment Information</h2>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                <label>Candidate Name:</label>
                <input type="text" name="candidateName" value={candidate.candidateName} onChange={handleChange} />
                <label>Position Applied for:</label>
                <input type="text" name="position" value={candidate.position} onChange={handleChange} />
                <label>Current Location:</label>
                <input type="text" name="location" value={candidate.location} onChange={handleChange} />
                <label>Current Employer:</label>
                <input type="text" name="currentEmployer" value={candidate.currentEmployer} onChange={handleChange} />
                <label>Total Experience:</label>
                <input type="text" name="totalExperience" value={candidate.totalExperience} onChange={handleChange} />
                <label>CTC:</label>
                <input type="text" name="ctc" value={candidate.ctc} onChange={handleChange} />
                <label>Expected CTC:</label>
                <input type="text" name="ectc" value={candidate.ectc} onChange={handleChange} />
                <label>Notice Period:</label>
                <input type="text" name="noticePeriod" value={candidate.noticePeriod} onChange={handleChange} />
                <label>Willingness:</label>
                <input type="text" name="relocate" value={candidate.relocate} onChange={handleChange} />
                <label>Assessment Comments(HR Inputs):</label>
                <input type="text" name="comments" value={candidate.comments} onChange={handleChange} />
                <label>Remarks:</label>
                <input type="text" name="remarks" value={candidate.remarks} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
            ) : (
                <div>
                    <p>Candidate Name: {candidate.candidateName}</p>
                    <p>Position Applied for: {candidate.position}</p>
                    <p>Current Location: {candidate.location}</p>
                    <p>Current Employer: {candidate.currentEmployer}</p>
                    <p>Total Experience: {candidate.totalExperience}</p>
                    <p>CTC: {candidate.ctc}</p>
                    <p>Expected CTC: {candidate.ectc}</p>
                    <p>Notice Period: {candidate.noticePeriod}</p>
                    <p>Willingness to Relocate: {candidate.relocate}</p>
                    <p>Assesment Comments(HRInputs): {candidate.comments}</p>
                    <p>Remarks: {candidate.remarks}</p>
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
