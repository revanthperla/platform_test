import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/Interviewscheduling.css';

function InterviewScheduling() {
  const [date, setDate] = useState(new Date());

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
          <label>Appointment Description:</label>
          <textarea></textarea>
          <button type="submit">Add Appointment</button>
        </form>
      </div>
    </div>
  );
}

export default InterviewScheduling;
