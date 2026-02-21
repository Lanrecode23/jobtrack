import React, { useState } from 'react'
import { useReminderStore } from '../Store/useReminderStore';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Reminders() {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [mode, setMode] = useState('');
  const [loading, setLoading] = useState(false);
  const [interviewNotes, setInterviewNotes] = useState('');

  const navigate = useNavigate();
  const { addReminder } = useReminderStore();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addReminder({
        company,
        position,
        interviewDate,
        mode,
        interviewNotes,
      });

      // Clear the form fields
      setCompany('');
      setPosition('');
      setInterviewDate('');
      setMode('');
      setInterviewNotes('');

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: '<span style="font-size: 1.0rem;">Interview reminder added successfully!</span>',
        showConfirmButton: true,
        timer: 1500,
      });     
      setLoading(false);
    } catch (error) {
      console.error('Error adding interview reminder:', error);
      setLoading(false);
    }

    navigate('/dashboard');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="container bg-light ">
          <h4 className="fw-bold text-center mt-5 mb-5 text-secondary">Add Interview Reminder</h4>
          <div className="row">
            <div className="mb-3">
              <label htmlFor="company" className="form-label">Company:</label>
              <input
                type="text"
                className="form-control"
                id="company"
                placeholder="Enter company name"
                value={company}
                required
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="position" className="form-label">Position:</label>
            <input
              type="text"
              className="form-control"
              id="position"
              placeholder="Enter position"
              value={position}
              required
              onChange={(e) => setPosition(e.target.value)}

            />
          </div>

          <div className="mb-3">
            <label htmlFor="interviewDate" className="form-label">Interview Date:</label>
            <input
              type="date"
              className="form-control"
              id="interviewDate"
              placeholder="Enter interview date"
              value={interviewDate}
              required
              onChange={(e) => setInterviewDate(e.target.value)}

            />
          </div>

          <div className="mb-3">
            <label htmlFor="mode" className="form-label">Mode:</label>
            <textarea
              className="form-control"
              id="mode"
              rows="3"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="interviewNotes" className="form-label">Interview Notes (optional):</label>
            <textarea
              className="form-control"
              id="interviewNotes"
              rows="3"
              value={interviewNotes}
              onChange={(e) => setInterviewNotes(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <div className="d-grid gap-2 col-6 mx-auto">
              <button
                className="btn btn-primary signUp"
                type="submit"
              >
                Add Interview Reminder
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Reminders
