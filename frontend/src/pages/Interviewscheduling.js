import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/Interviewscheduling.css';

function InterviewScheduling() {
  const [date, setDate] = useState(new Date());
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');

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
    setDate(date);
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

  const handleCandidateChange = event => {
    setSelectedCandidate(event.target.value);
  };

  return (
    <div className="InterviewScheduling">
      <header className="InterviewScheduling-header">
        <h1>Interview Scheduling</h1>
      </header>
      <div className="calendar-container">
        <Calendar
          onChange={onChange}
          value={date}
          tileClassName={tileClassName}
        />
      </div>
      <div className="appointment-form">
        <h2>Add Appointment</h2>
        <form>
          <label>Date:</label>
          <input type="text" value={date.toDateString()} disabled />
          <label>Time:</label>
          <input type="time" />
          <label>Candidate:</label>
          <select value={selectedCandidate} onChange={handleCandidateChange}>
            <option value="">Select a candidate</option>
            {candidates.map(candidate => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.candidateName}
              </option>
            ))}
          </select>
          <label>Appointment Description:</label>
          <textarea></textarea>
          <button type="submit">Add Appointment</button>
        </form>
      </div>
    </div>
  );
}

export default InterviewScheduling;
