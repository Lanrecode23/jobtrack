import React, { useState } from 'react'
import { useJobStore } from '../Store/useJobStore';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function TrackingForm() {
  const [dateApplied, setDateApplied] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();
  // Import addJob from the useJobStore
  const { addJob } = useJobStore()

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Add job
    await addJob({
      company,
      position,
      status,
      notes,
      dateApplied: dateApplied ? new Date(dateApplied).toISOString() : null
    });

    // Show success alert
    Swal.fire({
      icon: 'success',
      title: '<span style="font-size: 1.0rem;">Job added successfully!</span>',
      showConfirmButton: true,
      timer: 1500,
    });

    // Clear the form fields
    setCompany('');
    setPosition('');
    setStatus('');
    setNotes('');
    setDateApplied('');

    //navigate to dashboard
    Navigate('/dashboard');
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="container bg-light ">
          <h4 className="fw-bold text-center mt-5 mb-5 text-secondary">Add a Job</h4>
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
            <label htmlFor="status" className="form-label">Status:</label>
            <select
              className="form-select"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select status</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="dateApplied" className="form-label">Date Applied:</label>
            <input
              type="date"
              className="form-control"
              id="dateApplied"
              placeholder="Enter date applied"
              value={dateApplied}
              required
              onChange={(e) => setDateApplied(e.target.value)}

            />
          </div>

          <div className="mb-3">
            <label htmlFor="notes" className="form-label">Notes (optional):</label>
            <textarea
              className="form-control"
              id="notes"
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <div className="d-grid gap-2 col-6 mx-auto">
              <button
                className="btn btn-primary signUp"
                type="submit"
              >
                {loading ? "Adding job..." : "Add Job"}
              </button>
            </div>
          </div>
        </div>




      </form>
    </div>
  )
}

export default TrackingForm
