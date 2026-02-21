import React, { useEffect, useState } from 'react';
import { useReminderStore } from '../Store/useReminderStore';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/TrackingFormList.css';

function RemindersFormList() {
  const navigate = useNavigate();
  const { fetchReminders, Reminders, deleteReminder } = useReminderStore();

  useEffect(() => {
    fetchReminders();
  }, []);

  const handleDelete = async (reminderId) => {
    try {
      Swal.fire({
        title: '<span style="font-size: 1.0rem;">Delete this reminder?</span>',
        html: '<p style="font-size: 0.9rem;">This action cannot be undone</p>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          deleteReminder(reminderId);
          Swal.fire({
                icon: 'success',
                title: '<span style="font-size: 1.2rem;">Deleted!</span>',
                html: '<p style="font-size: 0.9rem;">Reminder deleted successfully</p>',
                showConfirmButton: true,
                timer: 1500,
              });
        }
      });
    } catch (error) {
      console.error('Error deleting Reminder:', error);
    }
  };

  return (
    <div className="container mt-5">
      <hr />
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
      <h4 className="fw-semibold mb-3">Interview Reminders</h4>
        <button
          className="btn btn-primary "
          onClick={() => navigate('/dashboard/reminders')}
        >
          Add Reminder
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-3">

          {Reminders.length === 0 ? (
            <div className="text-center py-4 text-muted">
              No reminders added yet. Click "Add Reminder" to get started!      
            </div>
          ) : (
            Reminders.map((Reminder) => (
              <div key={Reminder.id} className="job-card mb-3 p-3 rounded-4 shadow-sm">

                <div className="d-flex align-items-center">

                  {/* Logo Placeholder */}
                  <div className="company-logo me-3 text-uppercase">
                    {Reminder.company?.charAt(0)}
                  </div>

                  {/* Job Info */}
                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-1 text-uppercase">{Reminder.company}</h6>
                    <div className="text-muted small text-uppercase">{Reminder.position}</div>
                    <div className=" small fw-bold text-capitalize text-secondary">Mode of interview: {Reminder.mode}</div>
                    <div className="text-muted small">
                    Interview Date: {new Date(Reminder.interviewDate).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`badge rounded-pill px-3 py-2 
                      ${Reminder.status === 'Progress' ? 'bg-secondary text-light' :
                        Reminder.status === 'Done' ? 'bg-success' :
                        'bg-secondary'}`}
                  >
                    {Reminder.status?.toUpperCase()}
                  </span>

                </div>

                {/* Action Buttons */}
                <div className="mt-3 d-flex justify-content-end">
                  {/* <button
                    className="btn btn-sm btn-outline-primary me-2"
                    
                  >
                    Edit
                  </button> */}
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(Reminder.id)}
                  >
                    Delete Reminder      
                  </button>
                </div>

              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}

export default RemindersFormList;
