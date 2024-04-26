import React, { useState } from 'react';
import '../css/Assessmentview.css'; // Update the path to your CSS file

function AssessmentForm({ candidate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [editedCandidate, setEditedCandidate] = useState({});

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
            const updateData = { rejection_reason: reason };
            fetch(`http://43.204.201.158:8000/api/update_assessment_rejection/${candidate.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to reject assessment');
                }
                return response.json();
            })
            .then(data => {
                console.log('Assessment rejected with reason:', data);
            })
            .catch(error => {
                console.error('Error rejecting assessment:', error);
            });
        }
    };

    const handleEdit = () => {
        // Initialize editedCandidate state with current candidate data
        setEditedCandidate(candidate);
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update the state with the new value for the specific field
        setEditedCandidate(prevCandidate => ({
            ...prevCandidate,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://43.204.201.158:8000/api/update_assessment/${candidate.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedCandidate),
            });
            if (response.ok) {
                window.alert('Assessment updated successfully, please refresh the page to see the changes.');
                console.log('Field updated successfully');
            } else {
                // Handle error
                console.error('Error updating field');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="assessment-form-container">
            <h2>Assessment Information</h2>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                <label>Candidate Name:</label>
                <input type="text" name="candidateName" value={editedCandidate.candidateName || ''} onChange={handleChange} />
                <label>Position Applied for:</label>
                <input type="text" name="position" value={editedCandidate.position || ''} onChange={handleChange} />
                <label>Current Location:</label>
                <input type="text" name="location" value={editedCandidate.location || ''} onChange={handleChange} />
                <label>Current Employer:</label>
                <input type="text" name="currentEmployer" value={editedCandidate.currentEmployer || ''} onChange={handleChange} />
                <label>Total Experience:</label>
                <input type="text" name="totalExperience" value={editedCandidate.totalExperience || ''} onChange={handleChange} />
                <label>CTC:</label>
                <input type="text" name="ctc" value={editedCandidate.ctc || ''} onChange={handleChange} />
                <label>Expected CTC:</label>
                <input type="text" name="ectc" value={editedCandidate.ectc || ''} onChange={handleChange} />
                <label>Notice Period:</label>
                <input type="text" name="noticePeriod" value={editedCandidate.noticePeriod || ''} onChange={handleChange} />
                <label>Willingness to Relocate:</label>
                <input type="text" name="relocate" value={editedCandidate.relocate || ''} onChange={handleChange} />
                <label>Assessment Comments(HR Inputs):</label>
                <input type="text" name="comments" value={editedCandidate.comments || ''} onChange={handleChange} />
                <label>Remarks:</label>
                <input type="text" name="remarks" value={editedCandidate.remarks || ''} onChange={handleChange} />
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
