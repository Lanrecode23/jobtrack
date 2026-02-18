import React, { useState } from "react";
import { useJobStore } from "../Store/useJobStore";
import Swal from "sweetalert2";

function EditJobModal({ editingJob, setEditingJob }) {
  const [loading, setLoading] = useState(false);
  const { updateJob } = useJobStore();

  const handleUpdate = async () => {
    
    setLoading(true);

    await updateJob(editingJob.id, {
      company: editingJob.company,
      position: editingJob.position,
      status: editingJob.status,
      notes: editingJob.notes,
    });

    Swal.fire({
      icon: "success",
      html: "<p style='font-size: 0.9rem;'>Job updated successfully</p>",
      showConfirmButton: false,
      timer: 1500,
    });
    alert("no internet")

    setEditingJob(null); // 
    setLoading(false);
  };

  
  if (!editingJob) return null;

  return (
    <>
      <div
        className="modal-backdrop fade show"
        onClick={() => setEditingJob(null)}
      ></div>

      <div className="modal show d-block " tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title text-primary">Edit Job</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setEditingJob(null)}
              ></button>
            </div>

            <div className="modal-body">

              <div className="mb-3">
                <label className="form-label">Company</label>
                <input
                  className="form-control"
                  value={editingJob.company}
                  onChange={(e) =>
                    setEditingJob({
                      ...editingJob,
                      company: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Position</label>
                <input
                  className="form-control"
                  value={editingJob.position}
                  onChange={(e) =>
                    setEditingJob({
                      ...editingJob,
                      position: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={editingJob.status}
                  onChange={(e) =>
                    setEditingJob({
                      ...editingJob,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Offer">Offer</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-control"
                  value={editingJob.notes || ""}
                  onChange={(e) =>
                    setEditingJob({
                      ...editingJob,
                      notes: e.target.value,
                    })
                  }
                />
              </div>

            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setEditingJob(null)}
              >
                Cancel
              </button>

              <button
                className="btn btn-success"
                onClick={handleUpdate}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default EditJobModal;
