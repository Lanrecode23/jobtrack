import React, { useEffect, useState } from 'react'
import { useJobStore } from '../Store/useJobStore';
import { useNavigate } from 'react-router-dom';
import EditJobModal from './EditJobModal';
import Swal from 'sweetalert2';
import '../styles/TrackingFormList.css'

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
          Swal.fire(
            '<span style="font-size: 1.2rem;">Deleted!</span>',
            '<span style="font-size: 0.9rem;">Your job has been deleted.</span>',
            'success',
          )
          deleteJob(jobId);
        }
      }).catch((error) => {
        console.error('Error deleting job:', error);
      });
    } catch (error) {
      console.error('Error deleting job:', error);
    }

  };


  return (
    <div className="container mt-5 centralized-tracking">
      <hr />
      <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
        <h4 className="">Centralized Tracking</h4>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard/tracking')}>
          Add Job
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Date Applied</th>
                  <th>Notes</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                {jobs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No jobs added yet. Click "Add Job" to get started!
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => (
                    <tr key={job.id}>
                      <td className="fw-semibold text-primary">
                        {job.company}
                      </td>

                      <td>{job.position}</td>

                      <td>
                        <span
                          className={`badge 
                          ${job.status === 'Interview' ? 'bg-warning text-dark' :
                              job.status === 'Rejected' ? 'bg-danger' :
                                job.status === 'Offer' ? 'bg-success' :
                                  'bg-secondary'}`}
                        >
                          {job.status}
                        </span>
                      </td>

                      <td>
                        {new Date(job.dateApplied).toLocaleDateString()}
                      </td>

                      <td>{job.notes || '-'}</td>

                      <td className="text-end">
                        <button className="btn btn-sm btn-primary me-2" onClick={() => setEditingJob(job)}>
                          Edit
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(job.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
            <EditJobModal
              editingJob={editingJob} setEditingJob={setEditingJob} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackingFormList;
