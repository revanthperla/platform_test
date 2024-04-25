import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/Interviewscheduling.css';

function InterviewScheduling() {
  const [formData, setFormData] = useState({
    date: new Date(),
    time: '',
    candidate: '',
    description: ''
  });
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await fetch('http://43.204.201.158:8000/api/assessments/');
      const data = await response.json();
      console.log(data);
      // Filter candidates with is_active set to false and rejection_reason null
      const filteredCandidates = data.filter(candidate => candidate.is_active && candidate.rejection_reason === '');
      setCandidates(filteredCandidates);
    } catch (error) {
      console.error('Error fetching Candidates:', error);
    }
  };

  const onChange = date => {
    setFormData(prevData => ({
      ...prevData,
      date: date
    }));
  };

  const tileClassName = ({ date }) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const selectedMonth = date.getMonth();
    const selectedYear = date.getFullYear();

    if (selectedMonth === currentMonth && selectedYear === currentYear) {
      return 'custom-current-month';
    } else {
      return 'custom-other-month';
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      // Dummy endpoint, replace with your actual endpoint
      const response = await fetch('http://43.204.201.158:8000/api/submit_appointment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log('Appointment created:', data);
      // Reset form fields after successful submission
      setFormData({
        date: new Date(),
        time: '',
        candidate: '',
        description: ''
      });
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <div className="InterviewScheduling">
      <header className="InterviewScheduling-header">
        <h1>Interview Scheduling</h1>
      </header>
      <div className="calendar-container">
        <Calendar
          onChange={onChange}
          value={formData.date}
          tileClassName={tileClassName}
        />
      </div>
      <div className="appointment-form">
        <h2>Add Appointment</h2>
        <form onSubmit={handleSubmit}>
          <label>Date:</label>
          <input type="text" value={formData.date.toDateString()} disabled />
          <label>Time:</label>
          <input type="time" name="time" value={formData.time} onChange={handleChange} />
          <label>Candidate:</label>
          <select name="candidate" value={formData.candidate} onChange={handleChange}>
            <option value="">Select a candidate</option>
            {candidates.map(candidate => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.candidateName}
              </option>
            ))}
          </select>
          <label>Appointment Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
          <button type="submit">Add Appointment</button>
        </form>
      </div>
    </div>
  );
}

export default InterviewScheduling;
