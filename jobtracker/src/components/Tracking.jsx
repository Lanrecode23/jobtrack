import React, { useState } from 'react'
import { useJobStore } from '../Store/useJobStore';

function Tracking() {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');

  const{addJobs} = useJobStore()

  const handleSubmit = (e) => {
  e.preventDefault();
  addJobs({company, position, status, notes});
  // Clear the form fields
  setCompany('');
  setPosition('');
  setStatus('');
  setNotes('');
  };


  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="company" className="form-label">Company:</label>
          <input
            type="text"
            className="form-control"
            id="company"
            placeholder="Enter company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="position" className="form-label">Position:</label>
          <input
            type="text"
            className="form-control"
            id="position"
            placeholder="Enter position"
            value={position}
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
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
          </select>
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
              className="btn btn-primary"
              type="button"
              onClick={handleSubmit}
            >
              Add Job
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Tracking
