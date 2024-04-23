import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AssesmentModal({ onClose }) {
    const initialFormData = {
        job_description: '',
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

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
        const response = await fetch('http://43.204.201.158:8000/api/joblist/');
        const data = await response.json();
        console.log(data);
        setJobs(data);
        } catch (error) {
        console.error('Error fetching jobs:', error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
            const response = await axios.post('http://43.204.201.158:8000/api/submit_assessment/', formData);
            
            console.log('Form submitted successfully:', response.data);
            // You can add any additional logic here after the form is successfully submitted
            window.alert('Submitted successfully!');
          } catch (error) {
            console.error('Error submitting form:', error);
            // Handle any errors here
          }
      
          // Reset the form after submission
          setFormData({
            job_description: '',
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
          });
    };

    return (
        <div className="modal">
        <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h2>Assessment Information</h2>
            <form onSubmit={handleSubmit}>
            <label>
            Job:
            <select
              name="job_description"
              value={formData.job_description}
              onChange={handleChange}
              >
                <option value="">Select</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.titleDesignation}>
                    {job.titleDesignation}
                  </option>
                  ))}
              </select>
          </label>
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