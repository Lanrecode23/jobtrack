import React, { useEffect, useState } from 'react';
import { useJobStore } from '../Store/useJobStore';
import { useNavigate } from 'react-router-dom';
import EditJobModal from './EditJobModal';
import Swal from 'sweetalert2';
import '../styles/TrackingFormList.css';

function TrackingFormList() {
  const [editingJob, setEditingJob] = useState(null);
  const navigate = useNavigate();
  const { fetchJobs, jobs, deleteJob } = useJobStore();

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      Swal.fire({
        title: '<span style="font-size: 1.2rem;">Delete this job?</span>',
        html: '<p style="font-size: 0.9rem;">This action cannot be undone</p>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          deleteJob(jobId);
          Swal.fire(
            '<span style="font-size: 1.2rem;">Deleted!</span>',
            '<span style="font-size: 0.9rem;">Your job has been deleted.</span>',
            'success'
          );
        }
      });
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="container mt-5">
      <hr />
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
        <h4>Centralized Tracking</h4>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/dashboard/tracking')}
        >
          Add Job
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-3">

          {jobs.length === 0 ? (
            <div className="text-center py-4 text-muted">
              No jobs added yet. Click "Add Job" to get started!
            </div>
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="job-card mb-3 p-3 rounded-4 shadow-sm">

                <div className="d-flex align-items-center">

                  {/* Logo Placeholder */}
                  <div className="company-logo me-3">
                    {job.company?.charAt(0)}
                  </div>

                  {/* Job Info */}
                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-1">{job.company}</h6>
                    <div className="text-muted small">{job.position}</div>
                    <div className="text-muted small">
                      Applied {new Date(job.dateApplied).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`badge rounded-pill px-3 py-2 
                      ${job.status === 'Interview' ? 'bg-warning text-dark' :
                        job.status === 'Rejected' ? 'bg-danger' :
                        job.status === 'Offer' ? 'bg-success' :
                        'bg-secondary'}`}
                  >
                    {job.status?.toUpperCase()}
                  </span>

                </div>

                {/* Action Buttons */}
                <div className="mt-3 d-flex justify-content-end">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => setEditingJob(job)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))
          )}

        </div>
      </div>

      <EditJobModal
        editingJob={editingJob}
        setEditingJob={setEditingJob}
      />
    </div>
  );
}

export default TrackingFormList;
