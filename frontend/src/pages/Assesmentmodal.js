import React, { useState } from 'react';
import axios from 'axios';

function AssesmentModal({ onClose }) {
    const initialFormData = {
        candidateName: '',
        position: '',
        location: '',
        currentEmployer: '',
        totalExperience: '',
        ctc: '',
        ectc: '',
        noticePeriod: '',
        relocate: '',
        comments: '',
        remarks: '',
    };

    const [formData, setFormData] = useState({ ...initialFormData});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        axios.post('http://43.204.201.158:8000/api/submit_assessment/', formData)
        .then(response => {
            console.log('Data sent successfully:', response.data);
            // Reset the form after successful submission
            window.alert('Submitted successfully!');
            setFormData({ ...formData, /* reset fields */ });
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });
        onClose();
    };

    return (
        <div className="modal">
        <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h2>Assessment Information</h2>
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
                <label>Assesment Comments(HRInputs):</label>
                <input type="text" name="comments" value={formData.comments} onChange={handleChange} />
                <label>Remarks:</label>
                <input type="text" name="remarks" value={formData.remarks} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
    );
}

export default AssesmentModal;